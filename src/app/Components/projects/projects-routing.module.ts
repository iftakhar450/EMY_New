import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllprojectComponent } from './allproject/allproject.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { UpdateprojectComponent } from './updateproject/updateproject.component';
import { AuthGuardService } from 'src/app/Services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'projects', component: AllprojectComponent,  canActivate: [AuthGuardService]
  },
  {
    path: 'addnewprojects', component: AddprojectComponent,  canActivate: [AuthGuardService]
  },
  {
    path: 'updateproject', component: UpdateprojectComponent,  canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
