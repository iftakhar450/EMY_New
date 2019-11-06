import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendenceRoutingModule } from './attendence-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ViewAttendenceComponent } from './view-attendence/view-attendence.component';
import { AddAttendenceComponent } from './add-attendence/add-attendence.component';
import { UpdateattendenceComponent } from './updateattendence/updateattendence.component';
import { CardsComponent } from './cards/cards.component';


@NgModule({
  imports: [
    CommonModule,
    AttendenceRoutingModule,
    SharedModule
  ],
  declarations: [
    ViewAttendenceComponent,
    AddAttendenceComponent,
    UpdateattendenceComponent,
    CardsComponent

  ],
  exports: []
})
export class AttendenceModule { }
