import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';
import { SharedModule } from '../shared/shared.module';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';


@NgModule({
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
  ],
  declarations: [
    AllEmployeesComponent,
    AddNewEmployeeComponent,
    UpdateEmployeeComponent

  ]
})
export class EmployeesModule { }
