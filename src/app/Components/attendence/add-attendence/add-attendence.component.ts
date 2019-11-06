import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ProjectService } from 'src/app/Services/project/project.service';
import { SettingsService } from 'src/app/Services/settings/settings.service';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { environment } from './../../../../environments/environment';
import { EmployeeService } from 'src/app/Services/employees/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { _ } from 'underscore';
import * as moment from 'moment';
import { AttendenceService } from 'src/app/Services/attendence/attendence.service';
@Component({
  selector: 'app-add-attendence',
  templateUrl: './add-attendence.component.html',
  styleUrls: ['./add-attendence.component.scss']
})
export class AddAttendenceComponent implements OnInit {
  projects: any = [];
  typeOfWorks: any = [];
  users: any = [];
  attendenceStatus: any = environment.attenedenceStatus;
  isPresent: any = false;
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    // // barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: frLocale,
    minDate: new Date(Date.now()), // Minimal selectable date
    maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: max-line-length
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown
  };
  constructor(private router: Router, private app: AppComponent, private projectService: ProjectService,
    private settingService: SettingsService, private employeeService: EmployeeService, private attendenceService: AttendenceService) { }
  addAttendence = new FormGroup({
    uid: new FormControl('', Validators.required),
    pid: new FormControl(''),
    wid: new FormControl(''),
    overtime: new FormControl(0),
    status: new FormControl('', Validators.required),
    added_by: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required),
  });
  ngOnInit() {
    this.getProjects();
    this.getUsers();
    this.getTypeOfWorks();
  }
  goToAttendence() {
    this.router.navigate(['/viewAttendence']);
  }
  getProjects() {
    const progs = JSON.parse(localStorage.getItem('projects'));
    if (progs && progs.length > 0) {
      this.projects = progs;
    } else {
      this.projectService.allProjects().subscribe(data => {
        localStorage.setItem('projects', JSON.stringify(data));
        this.projects = data;
      });
    }
  }
  getUsers() {
    const emps = JSON.parse(localStorage.getItem('allemployees'));
    if (emps && emps.length > 0) {
      this.users = emps;
    } else {
      this.employeeService.allEmployee().subscribe(data => {
        localStorage.setItem('allemployees', JSON.stringify(data));
        this.users = data;
      });
    }
    this.users = _.filter(this.users, function (u) {
      if (u.isadmin === 'n') {
        return u;
      }
    });
    // console.log(this.users);
  }
  getTypeOfWorks() {
    const worksna = JSON.parse(localStorage.getItem('worksnatures'));
    if (worksna && worksna.length > 0) {
      this.typeOfWorks = worksna;
    } else {
      this.settingService.allWorknatures().subscribe(data => {
        localStorage.setItem('worksnatures', JSON.stringify(data));
        this.typeOfWorks = data;
      });
    }

    // console.log(this.typeOfWorks);
  }
  employeesChanged(args) {
    if (args.length > 0) {
      // console.log(args[0]);
      this.addAttendence.controls.uid.setValue(args[0].rec_id);
    } else {
      this.addAttendence.controls.uid.reset();
    }
  }
  statusChanged(args) {
    if (args.length > 0) {
      this.addAttendence.controls.status.setValue(args[0].text);
      if (args[0].text === 'Present' || args[0].text === 'Weekend') {
        this.isPresent = true;
      } else {
        this.isPresent = false;
      }
    } else {
      this.addAttendence.controls.status.reset();
      this.isPresent = false;
    }
  }
  projectChanged(args) {
    if (args.length > 0) {
      // console.log(args[0]);
      this.addAttendence.controls.pid.setValue(args[0].rec_id);
    } else {
      this.addAttendence.controls.pid.reset();
    }
  }
  worknatureChanged(args) {
    if (args.length > 0) {
      // console.log(args[0]);
      this.addAttendence.controls.wid.setValue(args[0].rec_id);
    } else {
      this.addAttendence.controls.wid.reset();
    }
  }

  submitAttendence() {
    this.addAttendence.controls.added_by.setValue(localStorage.getItem('id'));
    if (this.weekendVarification()) {
      if (this.addAttendence.valid) {
        // console.log(this.addAttendence.value);
        if (this.addAttendence.controls.status.value === 'Absent' || this.addAttendence.controls.status.value === 'Leave') {
          this.addAttendence.controls.overtime.reset();
          this.addAttendence.controls.wid.reset();
          this.addAttendence.controls.pid.reset();
        }
        this.app.Spinner.show();
        this.attendenceService.addNewAttendence(this.addAttendence.value).subscribe((data: any) => {
          this.app.showSuccess(data.msg);
          this.router.navigate(['/viewAttendence']);
        }, error => {
        });
      } else {
        this.app.showError('Some filed are required with valid data format!');
      }
    }
  }
  weekendVarification(): boolean {
    console.log(moment(this.addAttendence.controls.date.value).day());
    if (moment(this.addAttendence.controls.date.value).day() !== 5 && this.addAttendence.controls.status.value === 'Weekend') {
      this.app.showError('Selected Date is not Weekend');
      return false;
    } else {
      return true;
    }

  }

}
