import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { AddprojectComponent } from './addproject/addproject.component';
import { AllprojectComponent } from './allproject/allproject.component';
import { SharedModule } from '../shared/shared.module';
import { UpdateprojectComponent } from './updateproject/updateproject.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ],
  declarations: [
    AddprojectComponent,
    AllprojectComponent,
    UpdateprojectComponent
  ]
})
export class ProjectsModule { }
