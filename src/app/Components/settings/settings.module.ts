import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorkNaturesComponent } from './work-natures/work-natures.component';
import { DepartmentAndProfessionComponent } from './department-and-profession/department-and-profession.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ],
  declarations: [
    WorkNaturesComponent,
    DepartmentAndProfessionComponent
  ],
  providers: []
})
export class SettingsModule { }
