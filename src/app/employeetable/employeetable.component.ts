import { Component , Input,OnInit,ChangeDetectorRef } from '@angular/core';
import { DatalayerService } from '../datalayer.service';
import { Router } from '@angular/router';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
@Component({
  selector: 'app-employeetable',
  templateUrl: './employeetable.component.html',
  styleUrls: ['./employeetable.component.css']
})
export class EmployeetableComponent implements OnInit   {
  // displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  // dataSource: UserData[] = [
  //   {id: '1', name: 'John Doe', progress: '25%', color: 'red'},
  //   {id: '2', name: 'Jane Smith', progress: '50%', color: 'blue'},
  //   {id: '3', name: 'Alice Johnson', progress: '75%', color: 'green'},
  // ];
employeeCount!:number;
employeeCountMen!:number ;
employeeCountfemale!:number ;
// lineChartOptions:any;
// columnChartOptions:any;
// pieChartOptions:any;
columnChartOptions: any = {};
lineChartOptions: any = {};
pieChartOptions: any = {};
Employees: any[] =[];
 constructor(private datalayer:DatalayerService ,private router:Router,
  private cdr: ChangeDetectorRef
  
  ) {
    
   }

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
        this.columnChartOptions = {
   
          animationEnabled: true,
          title: {
        
          },
          data: [
          {
             
              type: 'column',
              dataPoints: [
              { label: 'Men', y: this.employeeCountMen },
              { label: 'Women', y: this.employeeCountfemale },
              { label: 'Others', y: 2 },
              { label: 'Total', y: this.employeeCount },
             
              ],
          },
          ],
      };
      
      this.pieChartOptions = {
          animationEnabled: true,
          title: {
        
          },
          theme: 'light2', 
          data: [
          {
              type: 'pie',
              dataPoints: [
              { label: 'Men', y: this.employeeCountMen },
              { label: 'Female', y: this.employeeCountfemale },
              { label: 'Others', y: 2 },
              { label: 'Total', y: this.employeeCount },
            
              ],
          },
          ],
      };
      
      this.lineChartOptions = {
          animationEnabled: true,
          title: {
         
          },
          theme: 'light2', 
          data: [
          {
              type: 'line',
              dataPoints: [
              { label: 'Men', y: this.employeeCountMen },
              { label: 'Female', y: this.employeeCountfemale },
              { label: 'Others', y: 2 },
              { label: 'Total', y: this.employeeCount },
             
              ],
          },
          ],
      };
      this.cdr.detectChanges();
      },
      (error: any) => {
       
        console.error('Error fetching employee data:', error);
      }
    );
    }
  updateChartOptions() {
  }
// columnChartOptions = {
   
//   animationEnabled: true,
//   title: {

//   },
//   data: [
//   {
     
//       type: 'column',
//       dataPoints: [
//       { label: 'Men', y: this.employeeCountMen },
//       { label: 'Women', y: this.employeeCountfemale },
//       { label: 'Others', y: 2 },
//       { label: 'Total', y: this.employeeCount },
     
//       ],
//   },
//   ],
// };

// pieChartOptions = {
//   animationEnabled: true,
//   title: {

//   },
//   theme: 'light2', 
//   data: [
//   {
//       type: 'pie',
//       dataPoints: [
//       { label: 'Men', y: 25 },
//       { label: 'Female', y: 5 },
//       { label: 'Others', y: 2 },
//       { label: 'Total', y: 32 },
    
//       ],
//   },
//   ],
// };

// lineChartOptions = {
//   animationEnabled: true,
//   title: {
 
//   },
//   theme: 'light2', 
//   data: [
//   {
//       type: 'line',
//       dataPoints: [
//       { label: 'Men', y: 25 },
//       { label: 'Female', y: 5 },
//       { label: 'Others', y: 2 },
//       { label: 'Total', y: 32 },
     
//       ],
//   },
//   ],
// };

}
