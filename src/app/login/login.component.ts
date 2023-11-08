import { Component ,Injectable} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { LoaderService } from '../loader.service';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  showSuccessMessage :any;
  successMessage: string = '';
  errorMessage: string = '';
  loading:any;
  constructor(private fb: FormBuilder, private login:LoginService,private loader :LoaderService) {
   
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
   
    if (this.loginForm.valid) {
      this.loader.show();
      this.login.signup(this.loginForm.value.email, this.loginForm.value.password).subscribe(res =>{

  
  
        this.loader.hide();
        },
        (error) => {
          this.loader.hide();
          console.log(error);
    
        }
      );
    }
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
