import { Component,Injectable ,OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { HttpClient ,HttpHeaders } from  '@angular/common/http';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormData,Address } from '../formdata';
import { DatalayerService } from '../datalayer.service';

@Component({
  selector: 'app-basicinformation',
  templateUrl: './basicinformation.component.html',
  styleUrls: ['./basicinformation.component.css']
})
export class BasicinformationComponent implements OnInit  {
  currentStep: number = 1;
  form!:FormGroup;
  employeeid:any;
  Employeedata:any;
  profilepic :any;
  showSuccessMessage :any;
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private fb: FormBuilder,private loginservice:LoginService,private http:HttpClient, private datalayer:DatalayerService,private route:ActivatedRoute,private router:Router ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeid  = params['id']; 
      console.log( this.employeeid);
    });
   
    this.creatForm();
    this.fetchemployeedatabyId();
  
   
  }
  
 

 creatForm(){
  const createdDate = new Date().toISOString();
    this.form = this.fb.group(
      {
        id: [0],
        // firstname: [''],
        // lastname: [''],
        name:[''],
       email: ['', [Validators.required, Validators.email]],
        dob: ['', Validators.required],
        position: [''],
        statusId: [0],
        gender: [true],
        mobile: [null, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
        resume: [''],
        profilePic: [''],
        resumeBase64: [''],
        profilePicBase64: [''],
        createdById: [0],
        createdDate: [createdDate],
       
        addresses: this.fb.array([this.addressForm()])
      
      }
    );
  }
  addressForm(){
    const createdDate = new Date().toISOString();
    return this.fb.group(
      {
        addressId: [0],
        employeeId: [0],
        address1: [''],
        address2: [''],
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
        country: [''],
        createdById: [0],
        createdDate: [createdDate]
      }
    )
  }
  addNewAddress(){
    this.addresses.push(this.addressForm());
  }
  
  get addresses(){
    return this.form.get("addresses") as FormArray;
    }

    removeContact(i:Required<number>){
      this.addresses.removeAt(i);
    }
   
  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files?.length) {
  //     const file: File = input.files[0];
  //     this.form.get('profilePic')?.setValue(file.name);
  //   }
  // }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file: File = input.files[0];
      const fileSizeInKB = file.size / 1024;
      const maxSizeInKB = 500;
  
      if (fileSizeInKB <= maxSizeInKB) {
        this.form.get('profilePic')?.setValue(file.name);
       
      } else {
        
        alert('File size exceeds the limit (500 KB)');
        input.value = '';
       
      }
    }
  }
  
  onResumeChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file: File = input.files[0];
      const fileSizeInKB = file.size / 1024;
      const maxSizeInKB = 500;
  
      if (fileSizeInKB <= maxSizeInKB) {
        this.form.get('resume')?.setValue(file.name);
       
      } else {
        alert('File size exceeds the limit (500 KB)');
        input.value = '';
      }
    }
  }
  
  
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
    }
  }

  // nextStep() {
  //   if (this.currentStep < 3) {
     
     
  //     console.log("baltee",this.form.get('gender')?.value)
  //     if (this.form.get('name')?.value =="" || this.form.get('name')?.value =="") {
  //       document.getElementById('nameError')?.classList.add('show-error'); 
   
  //     }
      
  //    if (this.form.get('email')?.value =="" ) {
       
  //       document.getElementById('emailError')?.classList.add('show-error'); 
  //     }
  //      if(this.form.get('email')?.value !=="" && !this.form.get('email')?.valid){
  //       document.getElementById('emailvalid')?.classList.add('show-error'); 
  //     }
  //     if (this.form.get('dob')?.value =="" || !this.form.get('dob')?.valid) {
       
  //       document.getElementById('dobError')?.classList.add('show-error'); 
  //     }
     
  //     if (this.form.get('mobile')?.value =="" ) {
       
  //       document.getElementById('mobileError')?.classList.add('show-error'); 
  //     }
  //      if ( this.form.get('mobile')?.value !=="" && !this.form.get('mobile')?.valid){
  //       document.getElementById('mobilevalid')?.classList.add('show-error'); 
  //     }
  //     if (this.form.get('gender')?.value =="" || this.form.get('gender')?.value ==null ) {
       
  //       document.getElementById('genderError')?.classList.add('show-error'); 
  //       console.log("baltee",this.form.get('gender')?.value)
  //     }
  //      else {
  //       this.currentStep += 1;
  //     }
  //   }
  // }
  nextStep() {
    if (this.currentStep < 3) {
      const nameControl = this.form.get('name');
      const emailControl = this.form.get('email');
      const dobControl = this.form.get('dob');
      const mobileControl = this.form.get('mobile');
      const genderControl = this.form.get('gender');
  
      nameControl?.markAsTouched();
      emailControl?.markAsTouched();
      dobControl?.markAsTouched();
      mobileControl?.markAsTouched();
      genderControl?.markAsTouched();
  
      if (!nameControl?.value || nameControl?.invalid) {
        document.getElementById('nameError')?.classList.add('show-error');
      }
      if(emailControl){
        if (!emailControl?.value ) {
          document.getElementById('emailError')?.classList.add('show-error');
        }
        if( emailControl?.value && emailControl?.invalid){
          document.getElementById('emailvalid')?.classList.add('show-error');
        }
      }
      if (!dobControl?.value || dobControl?.invalid) {
        document.getElementById('dobError')?.classList.add('show-error');
      }
      if(mobileControl){
      if (!mobileControl?.value ) {
        document.getElementById('mobileError')?.classList.add('show-error');
      }
      if( mobileControl?.value && mobileControl?.invalid){
        document.getElementById('mobilevalid')?.classList.add('show-error');
      }
    }
   
      if (
        nameControl?.valid &&
        emailControl?.valid &&
        dobControl?.valid &&
        mobileControl?.valid 
      ){
        this.currentStep += 1;
      }
    }
  }
  
  removeError(controlName: string) {
    this.form.get(controlName)?.markAsTouched();
   
    if (this.form.get(controlName)?.value && this.form.get(controlName)?.valid) {
      document.getElementById(`${controlName}valid`)?.classList.remove('show-error');
    }
     if (this.form.get(controlName)?.value){
      document.getElementById(`${controlName}Error`)?.classList.remove('show-error');
    }
   
  }
  
deleteProfilePic() {
  this.form.get('profilePic')?.setValue(''); 
}

deleteResume() {
  this.form.get('resume')?.setValue(''); 
}
  onSubmit() {
    if (this.form.valid) {
      const token = this.loginservice.getToken();
        
      
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      const id = this.employeeid;
      if ( id== null || id =="" || id == 0){
    
      // const firstName = this.form.get('firstname')?.value;
      // const lastName = this.form.get('lastname')?.value;
   
      // if (firstName !== "" || lastName !== "") {
      //   const fullName = `${firstName} ${lastName}`;
  
       
      //   this.form.get('name')?.setValue(fullName);
      //   delete this.form.value.firstname;
      //   delete this.form.value.lastname;
      // }
      const formData:FormData = this.form.value;
        console.log(formData); 
 
       
          this.http.post('https://zc-angular-api.azurewebsites.net/api/v1/Employee/CreateEmployee', formData, { headers, responseType: 'text' }).subscribe(
            (data) => {
              console.log( "jhjhj",data);
              console.log(data.toString());
              if (data) {
                this.successMessage = 'Successfully Submitted the data!';
                this.errorMessage = '';
                this.showSuccessMessage = true;
    
                setTimeout(() => {
                  this.showSuccessMessage = false;
                }, 3000);
    
                this.form.reset();
                setTimeout(() => {
                  this.router.navigate(['/Employee_list']);
                }, 3500);
                console.log(data);
              } else {
                this.errorMessage = 'Failed to submit the data.';
                this.showSuccessMessage = false;
              }
            },
            (error) => {
              this.errorMessage = 'An error occurred while submitting the data.';
              this.showSuccessMessage = false;
              console.error(error);
            }
          );
        }
        else {
          this.form.patchValue({
            id: id, 
          });
          const formData = this.form.value;
          this.http.put('https://zc-angular-api.azurewebsites.net/api/v1/Employee/UpdateEmployee', formData, {  headers, responseType: 'text' }).subscribe(
            (response) => {
              if (response) {
                this.successMessage = 'Successfully Updated the data!';
                this.errorMessage = '';
                this.showSuccessMessage = true;
    
                setTimeout(() => {
                  this.showSuccessMessage = false;
                }, 3000);
    
                this.form.reset();
              
                setTimeout(() => {
                  this.router.navigate(['/Employee_list']);
                }, 3500);
                console.log(response);
              } else {
                this.errorMessage = 'Failed to submit the data.';
                this.showSuccessMessage = false;
              }
            },
            (error) => {
            
              console.error(error);
            }
          );
        }
      } 
    }
  
 
    fetchemployeedatabyId() {
      const id = this.employeeid;
      this.datalayer.getEmployeeDatabyId(id).subscribe(
        (data: any) => {
          this.Employeedata = data;
          
          if (this.form) {
            const datetime = this.Employeedata.dob;
            const dateofbirth =datetime.split('T')[0]
            this.form.patchValue({
              name: this.Employeedata.name,
              dob: dateofbirth,
              position: this.Employeedata.position,
              email: this.Employeedata.email,
              mobile: this.Employeedata.mobile,
              gender: this.Employeedata.gender,
             
              profilePic: this.Employeedata.profilePic ||'',
              resume: this.Employeedata.resume ||''
            });
            // if (this.Employeedata.addresses.length > 0) {
            //   const firstAddress = this.Employeedata.addresses[0]; 
            //   this.form.get('addresses')?.patchValue([
            //     {
            //       address1: firstAddress.address1,
            //       address2: firstAddress.address2,
            //       country: firstAddress.country,
            //       city: firstAddress.city,
            //       state: firstAddress.state,
            //       zip: firstAddress.zip
            //     }
            //   ]);
            // }
            if (this.Employeedata.addresses.length > 0) {
              const addressControls = this.form.get('addresses') as FormArray;
              addressControls.clear(); 
    
              this.Employeedata.addresses.forEach((address: any) => {
                addressControls.push(this.createAddressGroup(address));
              });
            }
          
          }
          console.log(data);
          console.log(this.form);
        },
       
        
        (error: any) => {
          console.log(error);
        }
      );
    }
    createAddressGroup(addressData: any): FormGroup {
      return this.fb.group({
        addressId: [addressData.addressId],
        employeeId: [addressData.employeeId],
        address1: [addressData.address1],
        address2: [addressData.address2],
        street: [addressData.street],
        city: [addressData.city],
        state: [addressData.state],
        zip: [addressData.zip],
        country: [addressData.country],
        createdById: [addressData.createdById],
        createdDate: [addressData.createdDate]
      });
    }  
      
}
