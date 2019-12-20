import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from './../../../Services/employees/employee.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SettingsService } from 'src/app/Services/settings/settings.service';
import { ProjectService } from 'src/app/Services/project/project.service';
@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.scss']
})
export class AddNewEmployeeComponent implements OnInit {
  // supervisors = [
  //   { item_id: 1, item_text: 'Ghulam Sarwar' },
  //   { item_id: 2, item_text: 'Jhanzaib' },
  //   { item_id: 3, item_text: 'Tanveer' },
  //   { item_id: 4, item_text: 'Amir' },
  // ];
  departments: any = [];
  professions: any = [];
  supervisors: any = [];
  projects: any = [];
  // selected_supervisors = [];
  addNewEmplyee = new FormGroup({
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
    bsalary: new FormControl(0, Validators.compose([
      Validators.pattern('^[0-9]+$')
    ])),
    hourrate: new FormControl(0),
    allowanceOne: new FormControl(0, Validators.compose([
      Validators.pattern('^[0-9]+$')
    ])),
    allowanceTwo: new FormControl(0, Validators.compose([
      Validators.pattern('^[0-9]+$')
    ])),
    supervisor: new FormControl(''),
    projects: new FormControl(''),
  });
  marked = false;
  isBounsHour = false;
  modalReference: any;
  constructor(private app: AppComponent,
    private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute,
    private settingService: SettingsService, private projectService: ProjectService) { }

  ngOnInit() {
    this.addNewEmplyee.get('bsalary').valueChanges.subscribe(value => {
      this.addNewEmplyee.controls.hourrate.setValue(Math.round((this.addNewEmplyee.controls.bsalary.value / 240) * 100) / 100);
    });
    this.supervisors = JSON.parse(localStorage.getItem('supervisors'));
    // this.departments = this.getDepartments();
    // console.log(this.getDepartments());
    this.getProfession();
    this.getDepartments();
    this.getProjects();
  }
  goToAllEmployee() {
    this.router.navigate(['/employees']);
  }

  // load deparments
  getDepartments() {
    const deps = JSON.parse(localStorage.getItem('departments'));
    console.log(deps);
    if (deps && deps.length > 0) {
      this.departments = deps;
    } else {
      this.settingService.allDepartments().subscribe(data => {
        // console.log(data);
        localStorage.setItem('departments', JSON.stringify(data));
        this.departments = data;
      });
    }

  }
  // load professions
  getProfession() {
    const profs = JSON.parse(localStorage.getItem('professions'));
    if (profs && profs.length > 0) {
      this.professions = profs;
    } else {
      this.settingService.allProfessions().subscribe(data => {
        localStorage.setItem('professions', JSON.stringify(data));
        this.professions = data;
      });
    }
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
    }
  }
  toggleVisibility(e) {
    this.marked = e.target.checked;
    if (e.target.checked) {
      this.addNewEmplyee.controls.isadmin.setValue('y');
    } else {
      this.addNewEmplyee.controls.isadmin.setValue('n');
    }
  }
  toggleBounsHour(e) {
    this.isBounsHour = e.target.checked;
    if (e.target.checked) {
      this.addNewEmplyee.controls.isBounsHourApplying.setValue('y');
    } else {
      this.addNewEmplyee.controls.isBounsHourApplying.setValue('n');
    }
  }
  toggleisactive(e) {
    if (e.target.checked) {
      this.addNewEmplyee.controls.isative.setValue('y');
    } else {
      this.addNewEmplyee.controls.isative.setValue('n');
    }
  }
  supervisorChanged(args) {
    // console.log(args);
    if (args.length > 0) {
      //  console.log(args[0].rec_id);
      this.addNewEmplyee.controls.supervisor.setValue(args[0].rec_id);
    } else {
      this.addNewEmplyee.controls.supervisor.reset();
    }
    // console.log(this.addNewEmplyee.controls.supervisor.value);

  }
  departmentChange(args) {
    if (args.length > 0) {
      console.log(args[0].rec_id);
      this.addNewEmplyee.controls.department.setValue(args[0].rec_id);
    } else {
      this.addNewEmplyee.controls.department.reset();
    }
    console.log(this.addNewEmplyee.controls.department.value);
  }
  professionsChange(args) {
    if (args) {
      console.log(args[0].rec_id);
      this.addNewEmplyee.controls.profession.setValue(args[0].rec_id);
    }
  }
  submitNewWEmployeeData() {
    console.log(this.addNewEmplyee.value);
    console.log(this.addNewEmplyee.controls.bsalary);
    console.log(this.addNewEmplyee.controls.allowanceOne);
    console.log(this.addNewEmplyee.controls.allowanceTwo);
    console.log(this.addNewEmplyee.controls.hourrate);
    if (this.addNewEmplyee.valid) {
      this.app.Spinner.show();
      this.employeeService.addNewEmployee(this.addNewEmplyee.value).subscribe((data: any) => {
        this.app.showSuccess('Employee added successfully!');
        this.router.navigate(['/employees']);
      }, error => {
      });
    } else {
      this.app.showError('Some filed are required with valid data format!');
    }
    // console.log(this.addNewEmplyee.value);
  }
  projectsChanged(args) {
    if (args.length > 0) {
      const ids = [];
      args.forEach(element => {
        ids.push(element.rec_id);
        this.addNewEmplyee.controls.projects.setValue(ids);
      });
    } else {
      this.addNewEmplyee.controls.projects.reset();
    }
  }
}
