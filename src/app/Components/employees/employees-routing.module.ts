import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { AuthGuardService } from 'src/app/Services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'employees', component: AllEmployeesComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'addnewemployee', component: AddNewEmployeeComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'updateemployee', component: UpdateEmployeeComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
