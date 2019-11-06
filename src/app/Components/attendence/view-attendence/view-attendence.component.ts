import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AttendenceService } from 'src/app/Services/attendence/attendence.service';
import { AppComponent } from 'src/app/app.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/app/Services/socket/socket.service';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { environment } from './../../../../environments/environment';
import { _ } from 'underscore';
@Component({
  selector: 'app-view-attendence',
  templateUrl: './view-attendence.component.html',
  styleUrls: ['./view-attendence.component.scss']
})
export class ViewAttendenceComponent implements OnInit {
  attendences: any = [];
  attendencesSave: any = [];
  selectedatn: any;
  selectedDate: any = new Date();
  statusFilterOption: any = environment.attenedenceStatus;
  supervisorFilterOption: any = [];
  projectFilterOption: any = [];
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
    addClass: 'form-control, datePicker', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: max-line-length
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown
  };
  constructor(private router: Router, private attendenceService: AttendenceService,
    private app: AppComponent, private modalService: NgbModal, private socket: SocketService) { }
  @ViewChild('atnDelete', {static: false}) private atnDelete;
  @ViewChild('atnInfo',  {static: false}) private atnInfo;
  @ViewChild('atnFilter',  {static: false}) private atnFilter;
  ngOnInit() {
    this.getAttendenceOfDay();
    this.socketAttendenceUpdateData();
  }
  socketAttendenceUpdateData() {
    this.socket.getSocketAttendenceUpdateData()
      .subscribe(data => {
        this.getAttendenceOfDay();
        console.log('socket attendence update');
      });
  }

  goToAddAttendence() {
    this.router.navigate(['/addAttendence']);
  }
  getAttendenceOfDay() {
    this.attendenceService.todayAttendence(this.selectedDate).subscribe((data: any) => {
      console.log(data);
      this.attendences = data;
      this.attendencesSave = data;
      this.supervisorFilterOption = Object.keys(_.groupBy(data, 'supervisor'));
      this.projectFilterOption = Object.keys(_.groupBy(data, 'projectId'));
      this.projectFilterOption = _.reject(this.projectFilterOption, function (val) {
        return val === 'null';
      });
    }, error => {
      if (error.error.msg) {
      } else {
      }
    });
  }
  attendenceDeleteClick(item) {
    this.selectedatn = item;
    this.app.open(this.atnDelete);
  }
  attendenceInfoClick(item) {
    this.selectedatn = item;
    this.modalService.open(this.atnInfo);
  }
  attendenceEditClick(item) {
    this.attendenceService.editItem = item;
    this.router.navigate(['/updateAttendence']);
  }
  showFilterOption() {
    this.app.open(this.atnFilter);
  }
  attendenceFilterSubmit() {
    this.getAttendenceOfDay();
    this.modalService.dismissAll();
  }
  attendenceFilterClear() {
    this.selectedDate = new Date();
    this.getAttendenceOfDay();
    this.modalService.dismissAll();
  }
  attendenceDelete() {
    this.app.Spinner.show();
    this.attendenceService.deleteAttendence(this.selectedatn.rec_id).subscribe((data: any) => {
      this.app.showSuccess(data.msg);
      this.modalService.dismissAll();
    }, error => {
      this.modalService.dismissAll();
    });
  }

  statusFilterOptionChange(args) {
    if (args.length > 0) {
      this.attendences = _.filter(this.attendencesSave, function (ele) {
        return ele.status === args[0].text;
      });
    } else {
      this.attendences = this.attendencesSave;
    }
  }
  supervisorFilterOptionChange(args) {
    console.log(args[0]);
    if (args.length > 0) {
      this.attendences = _.filter(this.attendencesSave, function (ele) {
        return ele.supervisor === args[0];
      });
    } else {
      this.attendences = this.attendencesSave;
    }
  }
  projectFilterOptionChange(args) {
    console.log(args[0]);
    if (args.length > 0) {
      this.attendences = _.filter(this.attendencesSave, function (ele) {
        return ele.projectId === args[0];
      });
    } else {
      this.attendences = this.attendencesSave;
    }
  }

}
