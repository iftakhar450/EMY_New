import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthlySalaryReportComponent } from './monthly-salary-report/monthly-salary-report.component';
import { AuthGuardService } from 'src/app/Services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'month_salary_report', component: MonthlySalaryReportComponent,  canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
