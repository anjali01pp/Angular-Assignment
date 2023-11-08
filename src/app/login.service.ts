import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError} from 'rxjs';
import { tap,catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service'; 
export interface AuthResponseData {
  kind: string;
  idToken: string;
  token:string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})

export class LoginService {
 
  private token: string | null = null;
  constructor(private http: HttpClient, private router :Router ,private loaderService: LoaderService) { }

    
  signup(email: string, password: string) {
    this.loaderService.show();
    return this.http
      .post(
        'https://zc-angular-api.azurewebsites.net/api/v1/Authorize/Token',
        {"email":email,"password":password}, { responseType: 'text' }
      ).pipe(
        tap((resdata) => {
        
         
          console.log('Response from server:', resdata);
     
         
         this.token =resdata;
      
         this.router.navigate(['/Dashboard']);
          
        }),
        catchError((error) => {
       
          console.error(error);

          return throwError(error);
        })
      );
      
  }
  // public handleAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ){
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
   
    
  //   this.token = token;
   
    
  // }
  getToken(): any {
    return this.token;
  } 
 
}
