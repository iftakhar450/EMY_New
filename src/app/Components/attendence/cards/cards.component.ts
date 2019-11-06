import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { EmployeeService } from 'src/app/Services/employees/employee.service';
import { AttendenceService } from 'src/app/Services/attendence/attendence.service';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { _ } from 'underscore';
import { Subject } from 'rxjs';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Img, Rect, Table, Txt } from 'pdfmake-wrapper';
// import domtoimage from 'dom-to-image';
import * as moment from 'moment';
import { pseudoRandomBytes } from 'crypto';
const colors: any = {
  red: 'red',
  blue: 'blue',
  black: 'black',
  green: 'green',
};
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  @ViewChild('modalContent', { static: true } as any) modalContent: TemplateRef<any>;
  constructor(private modal: NgbModal, private app: AppComponent, private employeeService: EmployeeService,
    private attendenceService: AttendenceService) {
  }
  refresh: Subject<any> = new Subject();
  cardView: any = false;
  allEmployess: any = [];
  attendenceForTable: any = [];
  selectedUser: any = {};
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  imageData: any;
  ngOnInit() {
    this.getEmployees();
  }
  getEmployees() {
    this.employeeService.allEmployee().subscribe((data: any) => {
      // this.allEmployess = data;
      this.allEmployess = _.filter(data, function (ele) {
        return ele.isadmin !== 'y';
      });
      console.log(this.allEmployess);
    }, error => {
    });
  }
  onItemSelect(args) {
    this.selectedUser = args;
    this.fetchDate(this.selectedUser, this.viewDate);
  }
  onItemDeSelect(args) {
    this.selectedUser = {};
    // console.log(args);
  }
  loadNextMonth() {
    this.fetchDate(this.selectedUser, this.viewDate);
  }
  loadPreviousMonth() {
    this.fetchDate(this.selectedUser, this.viewDate);
  }
  fetchDate(user, date) {
    // console.log(user);
    if (Object.keys(user).length > 0 && date) {
      // this.refresh.next();
      this.attendenceService.fetchCardData({ uid: user.rec_id, date: date }).subscribe((data: any) => {
        if (data.length <= 0) {
          this.app.showInfo('No record found');
        }
        const arrary = [];
        this.refreshView(data);
        data.forEach(element => {
          const obj = {
            start: new Date(element.added_date), end: new Date(element.added_date), title: element.status,
            side: element.projectId, overtime: element.overtime, supervisor: element.supervisor
          };
          if (element.status === 'Present') {
            obj.title = 'P';
          }
          if (element.status === 'Absent') {
            obj.title = 'A';
          }
          if (element.status === 'Leave') {
            obj.title = 'L';
          }
          if (element.status === 'Weekend') {
            obj.title = 'W';
          }
          // console.log(obj);
          arrary.push(obj);
        });
        this.events = arrary;
        // console.log(this.events);
        this.refresh.next();
      }, error => {
      });
    } else {
      this.app.showInfo('Select user form dropdown to fetch data');
    }
  }
  refreshView(data) {
    // console.log(data);
    this.attendenceForTable = data;
  }
  async  exportCardAsPdf() {
    console.log(this.selectedUser);
    //   // this.exportAsService.save(this.exportAsConfig, 'My File Name').subscribe(() => {
    //   //   // save started
    //   // });
    // Set the fonts to use
    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    pdf.pageMargins(30);
    pdf.defaultStyle({
      fontSize: 8
    });
    pdf.pageOrientation('portrait'); //  landscape portrait
    pdf.info({
      title: 'Employee attendence Detail',
      // author: 'pdfmake-wrapper',
      // subject: 'subject of document',
    });
    pdf.add('Title : Monthly attendence Detail');
    pdf.add(
      pdf.ln(1)
    );
    pdf.add('Employee Name :' + this.selectedUser.name);
    pdf.add(
      pdf.ln(1)
    );
    pdf.add('For Month :' + moment(this.viewDate).format('MM-YYYY'));
    pdf.add(
      pdf.ln(2)
    );
    const data = this.arrangeTableData();
    pdf.add(new Table(data).widths(['*', '*', '*', '*', '*', '*']).headerRows(1).layout('lightHorizontalLines').end);
    pdf.footer(new Txt('Created By : ' + localStorage.getItem('name')).alignment('center').italics().end);
    pdf.create().download();
  }
  arrangeTableData() {
    this.attendenceForTable = _.sortBy(this.attendenceForTable, function (o) {
      return o.added_date;
    });
    const arr = [['Date', 'Status', 'Supervisor', 'Project/Side', 'Overtime', 'Work']];
    this.attendenceForTable.forEach(element => {
      arr.push([moment(element.added_date).format('ll'), element.status, element.supervisor,
      element.projectId ? element.projectId + '-' + element.project : '-',
      element.overtime ? element.overtime + 'Hrs' : 0 + 'Hrs', element.work]);
    });
    return arr;
  }
  changeView() {
    this.cardView = !this.cardView;
  }
  userChanged(args) {
    // console.log(args);
    if (args.length > 0) {
      this.selectedUser = args[0];
      this.fetchDate(this.selectedUser, new Date);
    }
  }
}
