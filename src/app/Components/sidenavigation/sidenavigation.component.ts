import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.scss']
})
export class SidenavigationComponent implements OnInit {

  constructor(private router: Router) { }
  employeesClass = '';
  projectClass = '';
  attendenceClass = '';
  reportClass = '';
  settingClass = '';
  path: any = '';
  ngOnInit() {
    this.path = localStorage.getItem('cPath') ? localStorage.getItem('cPath') : '';
    this.resetNavigation(this.path);
  }

  changeNavigation(path) {
    localStorage.setItem('cPath', path);
    this.router.navigateByUrl(path);
    this.resetNavigation(path);
    // console.log(this.employeesClass);
  }
  resetNavigation(path) {
    console.log(path);
    this.path = path;
    if (this.path === 'employees') {
      this.employeesClass = 'activeClass';
      this.projectClass = '';
      this.attendenceClass = '';
      this.reportClass = '';
      this.settingClass = '';
    }
    if (this.path === 'projects') {
      this.projectClass = 'activeClass';
      this.employeesClass = '';
      this.attendenceClass = '';
      this.reportClass = '';
      this.settingClass = '';
    }
    if (this.path === 'attendence' || this.path === 'viewAttendence' || this.path === 'viewCards') {
      this.attendenceClass = 'activeClass';
      this.projectClass = '';
      this.employeesClass = '';
      this.reportClass = '';
      this.settingClass = '';
    }
    if (this.path === 'reports'  || this.path === 'month_salary_report') {
      this.reportClass = 'activeClass';
      this.projectClass = '';
      this.employeesClass = '';
      this.attendenceClass = '';
      this.settingClass = '';
    }
    if (this.path === 'settings'  || this.path === 'departmentsandprofession'  || this.path === 'worknatures') {
      this.settingClass = 'activeClass';
      this.reportClass = '';
      this.projectClass = '';
      this.employeesClass = '';
      this.attendenceClass = '';
    }
    // if (path === 'viewCards') {

    // }
  }
}
