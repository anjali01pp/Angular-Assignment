import { Injectable,OnInit } from '@angular/core';
import { HttpClient ,HttpHeaders } from  '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BasicinformationComponent } from './basicinformation/basicinformation.component';
@Injectable({
  providedIn: 'root'
})
export class DatalayerService  {
  employeeid :any;
  constructor(private loginservice:LoginService,private http:HttpClient,private route:ActivatedRoute) { }
  setEmployeeId(): any {
    this.route.params.subscribe(params => {
      this.employeeid = params['id'];
      console.log(this.employeeid);
    });
  }
  getEmployeeData(): Observable<any>{
    
    // const token = this.loginservice.getToken();
    
    
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    // });
  
       return this.http.get('https://zc-angular-api.azurewebsites.net/api/v1/Employee/GetAllEmployees')
  }
  getEmployeeDatabyId(employeeid:any) : Observable<any>{
    
    
    this.setEmployeeId();
    const encUserID = employeeid;
   
    const url=  `https://zc-angular-api.azurewebsites.net/api/v1/Employee/GetEmployeesDetailsByID?encUserID=${encUserID} `;
  
   return  this.http.get( url);
  }

  DeleteEmployeeid(id:any) : Observable<any>{
 
   const iD = id;
    const url=  `https://zc-angular-api.azurewebsites.net/api/v1/Employee/DeleteEmployeeByID?encEmployeerID=${iD} `;
 
    return this.http.delete(url )
  }
}
