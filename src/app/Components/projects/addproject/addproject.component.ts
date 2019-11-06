import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { AppComponent } from 'src/app/app.component';
import { ProjectService } from 'src/app/Services/project/project.service';
import { environment } from './../../../../environments/environment';
@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.scss']
})
export class AddprojectComponent implements OnInit {
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
  projectStatus: any = environment.projectStatus;
  constructor(private router: Router, private app: AppComponent, private projectService: ProjectService) {
  }
  addNewProject = new FormGroup({
    // isative: new FormControl('y', Validators.required),
    sid: new FormControl('', Validators.required),
    fullname: new FormControl('', Validators.required),
    othername: new FormControl(''),
    area: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    startDate: new FormControl(new Date(), Validators.required),
    endDate: new FormControl(new Date(), Validators.required),
  });
  ngOnInit() {
  }

  toggleisactive(e) {
    if (e.target.checked) {
      this.addNewProject.controls.isative.setValue('y');
    } else {
      this.addNewProject.controls.isative.setValue('n');
    }
  }
  goToAllProject() {
    this.router.navigate(['/projects']);
  }
  submitNewProject() {
    if (this.addNewProject.valid) {
      // console.log(this.addNewProject);
      this.app.Spinner.show();
      this.projectService.addNewProject(this.addNewProject.value).subscribe((data: any) => {
        this.app.showSuccess(data.msg);
        this.router.navigate(['/projects']);
      }, error => {
      });
    } else {
      this.app.showError('Some Date Field are required!');
    }
  }
  projectStatusChanged(args) {
    if (args.length > 0) {
      //  console.log(args[0].text);
      this.addNewProject.controls.status.setValue(args[0].text);
    } else {
      this.addNewProject.controls.status.reset();
    }
  }

}
