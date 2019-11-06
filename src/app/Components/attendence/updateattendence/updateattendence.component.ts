import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendenceService } from 'src/app/Services/attendence/attendence.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from './../../../../environments/environment';
import { _ } from 'underscore';
import { ProjectService } from 'src/app/Services/project/project.service';
import { SettingsService } from 'src/app/Services/settings/settings.service';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-updateattendence',
  templateUrl: './updateattendence.component.html',
  styleUrls: ['./updateattendence.component.scss']
})
export class UpdateattendenceComponent implements OnInit {
  isPresent: any = false;
  attendenceStatus: any = environment.attenedenceStatus;
  projectFilterOption: any = [];
  workNatureFilterOption: any = [];

  selectedStatus: any;
  selectedproject: any;
  selectedWorknature: any;
  constructor(private router: Router, private attendenceService: AttendenceService, private settingService: SettingsService
    , private projectService: ProjectService, private app: AppComponent) { }
  updateAttendence = new FormGroup({
    // isative: new FormControl('y', Validators.required),
    rec_id: new FormControl(''),
    pid: new FormControl(''),
    wid: new FormControl(''),
    overtime: new FormControl(0),
    status: new FormControl(''),
  });
  ngOnInit() {
    if (this.attendenceService.editItem) {
      this.updateAttendence.controls.rec_id.setValue(this.attendenceService.editItem.rec_id);
      this.updateAttendence.controls.pid.setValue(this.attendenceService.editItem.project);
      this.updateAttendence.controls.wid.setValue(this.attendenceService.editItem.work);
      this.updateAttendence.controls.overtime.setValue(this.attendenceService.editItem.overtime);
      this.updateAttendence.controls.status.setValue(this.attendenceService.editItem.status);
      const that = this;
      that.selectedStatus = _.filter(that.attendenceStatus, function (ele) {
        return ele.text === that.attendenceService.editItem.status;
      });
      this.selectedStatus = this.attendenceService.editItem.status;
      if (this.attendenceService.editItem.status === 'Present' || this.attendenceService.editItem.status === 'Weekend') {
        this.isPresent = true;
      } else {
        this.isPresent = false;
      }
    } else {
      this.goToAllAttendence();

    }
    this.getProjects();
    this.getTypeOfWorks();
  }
  goToAllAttendence() {
    this.router.navigate(['/viewAttendence']);
  }
  getProjects() {
    if (this.attendenceService.editItem) {
      const progs = JSON.parse(localStorage.getItem('projects'));
      if (progs && progs.length > 0) {
        this.projectFilterOption = progs;
      } else {
        this.projectService.allProjects().subscribe(data => {
          localStorage.setItem('projects', JSON.stringify(data));
          this.projectFilterOption = data;
        });
      }
      const that = this;
      this.selectedproject = _.filter(this.projectFilterOption, function (ele) {
        if (ele.sid === that.attendenceService.editItem.projectId) {
          that.updateAttendence.controls.wid.setValue(ele.rec_id);
          return ele;
        }

      });
    }

  }
  getTypeOfWorks() {
    if (this.attendenceService.editItem) {
      const worksna = JSON.parse(localStorage.getItem('worksnatures'));
      if (worksna && worksna.length > 0) {
        this.workNatureFilterOption = worksna;
      } else {
        this.settingService.allWorknatures().subscribe(data => {
          localStorage.setItem('worksnatures', JSON.stringify(data));
          this.workNatureFilterOption = data;
        });
      }
      const that = this;
      this.selectedWorknature = _.filter(this.workNatureFilterOption, function (ele) {
        if (ele.name === that.attendenceService.editItem.work) {
          that.updateAttendence.controls.wid.setValue(ele.rec_id);
          return ele;
        }
      });
    }

    // console.log(this.typeOfWorks);
  }
  statusChanged(args) {
    if (args.length > 0) {
      this.updateAttendence.controls.status.setValue(args[0].text);
      if (args[0].text === 'Present' || args[0].text === 'Weekend') {
        this.isPresent = true;
      } else {
        this.isPresent = false;
      }
    } else {
      this.updateAttendence.controls.status.reset();
      this.isPresent = false;
    }
  }
  projectsChanged(args) {
    if (args.length > 0) {
      this.updateAttendence.controls.pid.setValue(args[0].rec_id);
    } else {
      this.updateAttendence.controls.projects.reset();
    }
  }
  worknatureChanged(args) {
    if (args.length > 0) {
      this.updateAttendence.controls.wid.setValue(args[0].rec_id);
    } else {
      this.updateAttendence.controls.projects.reset();
    }
  }
  updateAttendenceSubmit() {
    // console.log(this.updateAttendence.value);
    if (this.updateAttendence.valid) {
      if (this.updateAttendence.controls.status.value === 'Absent' || this.updateAttendence.controls.status.value === 'Leave') {
        this.updateAttendence.controls.overtime.reset();
        this.updateAttendence.controls.wid.reset();
        this.updateAttendence.controls.pid.reset();
      }
      this.app.Spinner.show();
      this.attendenceService.updateAttendence(this.updateAttendence.value).subscribe((data: any) => {
        this.app.showSuccess('Attendence updated successfully!');
        this.router.navigate(['/viewAttendence']);
      }, error => {
      });
    } else {
      this.app.showError('Some filed are required with valid data format!');
    }
  }
}
