import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAttendenceComponent } from './view-attendence/view-attendence.component';
import { AddAttendenceComponent } from './add-attendence/add-attendence.component';
import { UpdateattendenceComponent } from './updateattendence/updateattendence.component';
import { CardsComponent } from './cards/cards.component';
import { AuthGuardService } from 'src/app/Services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'viewCards', component: CardsComponent, canActivate:  [AuthGuardService]
  },
  {
    path: 'viewAttendence', component: ViewAttendenceComponent, canActivate:  [AuthGuardService]
  },
  {
    path: 'addAttendence', component: AddAttendenceComponent, canActivate:  [AuthGuardService]
  },
  {
    path: 'updateAttendence', component: UpdateattendenceComponent, canActivate:  [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendenceRoutingModule { }
