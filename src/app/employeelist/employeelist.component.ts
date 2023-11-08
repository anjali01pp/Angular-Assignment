import { Component,Injectable,OnInit ,Input, Output } from '@angular/core';
import { DatalayerService } from '../datalayer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { outputAst } from '@angular/compiler';
import { LoaderService } from '../loader.service';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
  Employees: any[] =[];
  employeetodelete:any;
  confirmationDialogVisible = false;
  confirmationMessage = '';
  showSuccessMessage:any;
  successMessage:any;
  baseImagePath: string = 'assets/images/'; 
  fullpath:any;
  searchText: string = '';
  selectedName: string = '';
 
  @Input() employeeid: any;
 @Output() employeeCount:any;
 @Output() employeeCountMen:any;
 @Output() employeeCountfemale:any;
  constructor(private datalayer:DatalayerService ,private router:Router,private loader :LoaderService
  
  ) { }

  ngOnInit() {
 
   this.fetchemployeedata();
  }
 
    
  
  fetchemployeedata(){
  this.datalayer.getEmployeeData().subscribe(
    (data: any[]) => {
      this.Employees=this.Employees.concat(data);
      this.employeeCount = this.Employees.length;
      this.employeeCountMen  = this.Employees.filter(employee => employee.gender === true).length;
      this.employeeCountfemale  = this.Employees.filter(employee => employee.gender === false).length;
    
      console.log(this.Employees)
      console.log( this.fullpath)
    },
    (error: any) => {
     
      console.error('Error fetching employee data:', error);
    }
  );
  }
  confirmdeletion(id: any) {
    this.datalayer.DeleteEmployeeid(id).subscribe(
      (data) => {
        // this.Employees = [];
        // this.fetchemployeedata();
      },
      (error: any) => {
       
        console.error('Error fetching employee data:', error);
      }
    );
  }
  
  Editemployee(id:any){
    this.router.navigate(['/Basic_information', id]);
  }
  showDeleteConfirmation(id: any) {
    this.employeetodelete = id;
    this.confirmationMessage = `Are you sure you want to delete ?`;
    this.confirmationDialogVisible = true;
  }

  handleDeleteConfirmation(confirmed: boolean) {
    if (confirmed) {
      
      this.confirmdeletion(this.employeetodelete); 
      this.confirmationDialogVisible = false;
      this.successMessage = 'Successfully deleted the data!';
     
      this.showSuccessMessage = true;
      this.loader.show();
       setTimeout(() => {
        this.loader.hide();
      this.showSuccessMessage = false;
      this.Employees = [];
      this.fetchemployeedata();
    }, 3000);
   
    }
    else {
      this.confirmationDialogVisible = false; 
    } 
  }
 
 
}

