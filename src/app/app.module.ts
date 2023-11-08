import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { TokeninterceptorInterceptor } from './tokeninterceptor.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { BasicinformationComponent } from './basicinformation/basicinformation.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { HeaderComponent } from './header/header.component';
import { DeleteconfirmationComponent } from './deleteconfirmation/deleteconfirmation.component';
import { EmployeetableComponent } from './employeetable/employeetable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FilterPipe } from './filter.pipe';
import { LoaderComponent } from './loader/loader.component';
import { authGuard } from './auth.guard';
import { ChangeDirective } from './change.directive';
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Employee_list', component: EmployeelistComponent,canActivate: [authGuard] },
  { path: 'Basic_information', component: BasicinformationComponent,canActivate: [authGuard] },
  { path: 'Basic_information/:id', component: BasicinformationComponent,canActivate: [authGuard] },
  { path: 'Dashboard', component: EmployeetableComponent,canActivate: [authGuard] }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BasicinformationComponent,
    EmployeelistComponent,
    HeaderComponent,
    DeleteconfirmationComponent,
    EmployeetableComponent,
    FilterPipe,
    LoaderComponent,
    ChangeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatTabsModule,
    CanvasJSAngularChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokeninterceptorInterceptor,
    multi: true,
  },],
  
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
