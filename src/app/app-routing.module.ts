import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './Components/login/login.component';
import {DashboardComponent} from './Components/dashboard/dashboard.component';
// import { EmployeesComponent } from './Components/employees/employees.component';
import { AuthGuardService } from './Services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,  canActivate:  [AuthGuardService]
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
