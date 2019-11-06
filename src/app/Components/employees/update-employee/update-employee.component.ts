import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employees/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/Services/settings/settings.service';
import { ProjectService } from 'src/app/Services/project/project.service';
import { _ } from 'underscore';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  updateEmployee = new FormGroup({
    rec_id: new FormControl(),
    isadmin: new FormControl('n', Validators.required),
    isBounsHourApplying: new FormControl('n', Validators.required),
    isative: new FormControl('y', Validators.required),
    eid: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[0-9]+$')
    ])),
    fullname: new FormControl('', Validators.required),
    othername: new FormControl(''),
    mobileno: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[0-9]+$')
    ])),
    homemobile: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[0-9]+$')
    ])),
    department: new FormControl('', Validators.required),
    profession: new FormControl('', Validators.required),
    bsalary: new FormControl(Validators.compose([
      Validators.pattern('^[0-9]+$')
    ])),
    hourrate: new FormControl(Validators.compose([
      Validators.pattern('^[0-9]+$')
    ])),
    allowanceOne: new FormControl(Validators.compose([
      Validators.pattern('^[0-9]+$')
    ])),
    allowanceTwo: new FormControl(Validators.compose([
      Validators.pattern('^[0-9]+$')
    ])),
    supervisor: new FormControl(''),
    projects: new FormControl(''),
  });

  seleectedEmployee: any;
  constructor(private router: Router, private employeeService: EmployeeService, private settingService: SettingsService,
    private projectService: ProjectService, private app: AppComponent) {
    this.seleectedEmployee = this.employeeService.editEmp;
  }
  marked: any = true;
  isBounsHour: any = false;
  isactive: any = false;
  departments: any = [];
  professions: any = [];
  projects: any = [];
  supervisors: any = [];
  selectedSupervisor: any = [];
  selectedDepartment: any = [];
  selectedProfession: any = [];
  selectedProjects: any = [];

  ngOnInit() {
    if (this.seleectedEmployee) {
      if (this.seleectedEmployee.isadmin === 'y') {
        this.marked = true;
      } else {
        this.marked = false;
      }
      if (this.seleectedEmployee.isbouns_hour_apply === 'y') {
        this.isBounsHour = true;
      } else {
        this.isBounsHour = false;
      }
      if (this.seleectedEmployee.isactive === 'y') {
        this.isactive = true;
      } else {
        this.isactive = false;
      }
      console.log(this.seleectedEmployee);
      this.updateEmployee.controls.rec_id.setValue(this.seleectedEmployee.rec_id);
      this.updateEmployee.controls.isadmin.setValue(this.seleectedEmployee.isadmin);
      this.updateEmployee.controls.isBounsHourApplying.setValue(this.seleectedEmployee.isbouns_hour_apply);
      this.updateEmployee.controls.isative.setValue(this.seleectedEmployee.isactive);
      this.updateEmployee.controls.eid.setValue(this.seleectedEmployee.eid);
      this.updateEmployee.controls.fullname.setValue(this.seleectedEmployee.name);
      this.updateEmployee.controls.othername.setValue(this.seleectedEmployee.othername);
      this.updateEmployee.controls.mobileno.setValue(this.seleectedEmployee.mobile);
      this.updateEmployee.controls.homemobile.setValue(this.seleectedEmployee.home_mobile);
      this.updateEmployee.controls.department.setValue(this.seleectedEmployee.department_id);
      this.updateEmployee.controls.profession.setValue(this.seleectedEmployee.profession_id);
      if (this.seleectedEmployee.basic_salary) {
        this.updateEmployee.controls.bsalary.setValue(this.seleectedEmployee.basic_salary);
      } else {
        this.updateEmployee.controls.bsalary.setValue(0);
      }
      if (this.seleectedEmployee.per_hour_rate) {
        this.updateEmployee.controls.hourrate.setValue(this.seleectedEmployee.per_hour_rate);
      } else {
        this.updateEmployee.controls.hourrate.setValue(0);
      }
      if (this.seleectedEmployee.allowance_one) {
        this.updateEmployee.controls.allowanceOne.setValue(this.seleectedEmployee.allowance_one);
      } else {
        this.updateEmployee.controls.allowanceOne.setValue(0);
      }
      if (this.seleectedEmployee.allowance_two) {
        this.updateEmployee.controls.allowanceTwo.setValue(this.seleectedEmployee.allowance_two);
      } else {
        this.updateEmployee.controls.allowanceTwo.setValue(0);
      }
      this.updateEmployee.controls.supervisor.setValue(this.seleectedEmployee.supervisor_id);
      this.updateEmployee.controls.projects.setValue(this.seleectedEmployee.project_ids);
      this.getDepartments();
      this.getProfession();
      this.getProjects();
      this.getSupervisors();
      this.updateEmployee.get('bsalary').valueChanges.subscribe(value => {
        this.updateEmployee.controls.hourrate.setValue(this.updateEmployee.controls.bsalary.value / 240);
      });
    } else {
      this.goToAllEmployee();
    }
  }
  goToAllEmployee() {
    this.router.navigate(['/employees']);
  }
  // load deparments
  getDepartments() {
    const deps = JSON.parse(localStorage.getItem('departments'));
    // console.log(deps);
    if (deps && deps.length > 0) {
      this.departments = deps;
    } else {
      this.settingService.allDepartments().subscribe(data => {
        // console.log(data);
        localStorage.setItem('departments', JSON.stringify(data));
        this.departments = data;
      });
    }
    const that = this;
    this.selectedDepartment = _.filter(that.departments, function (ele) {
      return ele.rec_id.toString() === that.seleectedEmployee.department_id;
    });

  }
  // load professions
  getProfession() {
    const profs = JSON.parse(localStorage.getItem('professions'));
    // console.log(profs);
    if (profs && profs.length > 0) {
      this.professions = profs;
    } else {
      this.settingService.allProfessions().subscribe(data => {
        localStorage.setItem('professions', JSON.stringify(data));
        this.professions = data;
      });
    }
    const that = this;
    this.selectedProfession = _.filter(that.professions, function (ele) {
      return ele.rec_id.toString() === that.seleectedEmployee.profession_id;
    });
  }
  // load projects
  getProjects() {
    const progs = JSON.parse(localStorage.getItem('projects'));
    if (progs && progs.length > 0) {
      this.projects = progs;
    } else {
      this.projectService.allProjects().subscribe(data => {
        localStorage.setItem('projects', JSON.stringify(data));
        this.projects = data;
      });
    } const that = this;
    that.selectedProjects = _.filter(that.projects, function (ele) {
      if (_.contains(that.seleectedEmployee.project_ids, ele.rec_id.toString())) {
        return ele;
      }
    });
  }
  // load projects
  getSupervisors() {
    this.supervisors = JSON.parse(localStorage.getItem('supervisors'));
    const that = this;
    this.selectedSupervisor = _.filter(that.supervisors, function (ele) {
      return ele.rec_id.toString() === that.seleectedEmployee.supervisor_id;
    });
  }
  toggleVisibility(e) {
    this.marked = e.target.checked;
    if (e.target.checked) {
      this.updateEmployee.controls.isadmin.setValue('y');
      this.updateEmployee.controls.supervisor.setValue('');
    } else {
      this.updateEmployee.controls.isadmin.setValue('n');
      this.updateEmployee.controls.projects.setValue('');
    }
  }
  toggleBounsHour(e) {
    this.isBounsHour = e.target.checked;
    if (e.target.checked) {
      this.updateEmployee.controls.isBounsHourApplying.setValue('y');
    } else {
      this.updateEmployee.controls.isBounsHourApplying.setValue('n');
    }
  }
  toggleisactive(e) {
    if (e.target.checked) {
      this.updateEmployee.controls.isative.setValue('y');
    } else {
      this.updateEmployee.controls.isative.setValue('n');
    }
  }

  supervisorChanged(args) {
    if (args.length > 0) {
      this.updateEmployee.controls.supervisor.setValue(args[0].rec_id);
    } else {
      this.updateEmployee.controls.supervisor.reset();
    }
  }
  departmentChange(args) {
    if (args.length > 0) {
      this.updateEmployee.controls.department.setValue(args[0].rec_id);
    } else {
      this.updateEmployee.controls.department.reset();
    }
  }
  professionsChange(args) {
    if (args) {
      this.updateEmployee.controls.profession.setValue(args[0].rec_id);
    } else {
      this.updateEmployee.controls.department.reset();
    }
  }
  projectsChanged(args) {
    if (args.length > 0) {
      const ids = [];
      args.forEach(element => {
        ids.push(element.rec_id);
        this.updateEmployee.controls.projects.setValue(ids);
      });
    } else {
      this.updateEmployee.controls.projects.reset();
    }
  }

  updateEmployeeData() {
    console.log(this.updateEmployee.value);
    if (this.updateEmployee.valid) {
      this.app.Spinner.show();
      this.employeeService.editEmployee(this.updateEmployee.value).subscribe((data: any) => {
        this.app.showSuccess('Employee data updated successfully!');
        this.router.navigate(['/employees']);
      }, error => {
      });
    } else {
      this.app.showError('Some filed are required with valid data format!');
    }
  }

}
