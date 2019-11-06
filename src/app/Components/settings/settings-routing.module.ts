import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkNaturesComponent } from './work-natures/work-natures.component';
import { DepartmentAndProfessionComponent } from './department-and-profession/department-and-profession.component';
import { AuthGuardService } from 'src/app/Services/auth/auth-guard.service';
const routes: Routes = [
  {
    path: 'worknatures', component: WorkNaturesComponent,  canActivate: [AuthGuardService]
   },
   {
     path: 'departmentsandprofession' , component: DepartmentAndProfessionComponent,  canActivate: [AuthGuardService]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
