import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginService} from './Services/login/login.service';
import {EmployeeService} from './Services/employees/employee.service';
import { ToastrModule } from 'ng6-toastr-notifications';
import { HeaderComponent } from './Components/header/header.component';
import { SidenavigationComponent } from './Components/sidenavigation/sidenavigation.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AttendenceModule } from './Components/attendence/attendence.module';
import { SharedModule } from './Components/shared/shared.module';
import { EmployeesModule } from './Components/employees/employees.module';
import { SettingsModule } from './Components/settings/settings.module';
import { ProjectsModule } from './Components/projects/projects.module';
import { SettingsService } from './Services/settings/settings.service';
import { SocketService } from './Services/socket/socket.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './intercepters/token-intercepter';
import { AttendenceService } from './Services/attendence/attendence.service';
import { ReportsModule } from './Components/reports/reports.module';
import { ReportsService } from './Services/report/reports.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidenavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    AttendenceModule,
    SharedModule,
    NgxSpinnerModule,
    EmployeesModule,
    SettingsModule,
    ProjectsModule,
    ReportsModule
  ],
  providers: [
    LoginService,
    SidenavigationComponent,
    EmployeeService,
    SettingsService,
    SocketService,
    ReportsService,
    AttendenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: []

})
export class AppModule { }
