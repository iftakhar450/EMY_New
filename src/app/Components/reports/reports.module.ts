import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { MonthlySalaryReportComponent } from './monthly-salary-report/monthly-salary-report.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ],
  declarations: [
    MonthlySalaryReportComponent
  ]
})
export class ReportsModule { }
