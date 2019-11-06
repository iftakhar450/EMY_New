import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/Services/project/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { environment } from 'src/environments/environment';
import { AppComponent } from 'src/app/app.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-updateproject',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.scss']
})
export class UpdateprojectComponent implements OnInit {
  @ViewChild('extensionDate',  {static: false}) private extensionDate;
  constructor(private router: Router, private projectService: ProjectService, private app: AppComponent,
    private modalService: NgbModal) {
  }
  closeResult: any;
  extensiondate: any = new Date();
  extensiondatearrary: any = [];
  updateProject = new FormGroup({
    // isative: new FormControl('y', Validators.required),
    rec_id: new FormControl(''),
    sid: new FormControl('', Validators.required),
    fullname: new FormControl('', Validators.required),
    othername: new FormControl(''),
    area: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    startDate: new FormControl(new Date(), Validators.required),
    endDate: new FormControl(new Date(), Validators.required),
    extras: new FormControl(''),
  });
  projectStatus: any = environment.projectStatus;
  selectedStatus: any = [];
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
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
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown
  };
  ngOnInit() {
    if (this.projectService.editProject) {
      this.updateProject.controls.rec_id.setValue(this.projectService.editProject.rec_id);
      this.updateProject.controls.sid.setValue(this.projectService.editProject.sid);
      this.updateProject.controls.fullname.setValue(this.projectService.editProject.name);
      this.updateProject.controls.othername.setValue(this.projectService.editProject.translation);
      this.updateProject.controls.area.setValue(this.projectService.editProject.area);
      this.updateProject.controls.location.setValue(this.projectService.editProject.location);
      this.updateProject.controls.status.setValue(this.projectService.editProject.status);
      this.updateProject.controls.startDate.setValue(this.projectService.editProject.startDate);
      this.updateProject.controls.endDate.setValue(this.projectService.editProject.endDate);
      this.selectedStatus.push(this.projectService.editProject.status);
      if (this.projectService.editProject.extras) {
        this.extensiondatearrary = this.projectService.editProject.extras.split(',');
      }
    } else {
      this.goToAllProject();

    }
  }
  goToAllProject() {
    this.router.navigate(['/projects']);
  }
  projectStatusChanged(args) {
    if (args.length > 0) {
      console.log(args[0].text);
      this.updateProject.controls.status.setValue(args[0].text);
    } else {
      this.updateProject.controls.status.reset();
    }
  }
  UpdateProject() {
    this.updateProject.controls.extras.setValue(this.extensiondatearrary);
    if (this.updateProject.valid) {
      this.app.Spinner.show();
      this.projectService.updateProject(this.updateProject.value).subscribe((data: any) => {
        this.app.showSuccess(data.msg);
        this.router.navigate(['/projects']);
      }, error => {
        this.app.showError(error.statusText);
      });
    } else {
      this.app.showError('Some Date Field are required!');
    }
  }
  extensionDateClick() {
    this.app.open(this.extensionDate);
  }
  addExtension() {
    this.extensiondatearrary.push(this.extensiondate);
    this.modalService.dismissAll();
  }
  cancelExtension(index) {
    this.extensiondatearrary.splice(index, 1);
  }
}
