import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ReportsService } from 'src/app/Services/report/reports.service';
import { AppComponent } from 'src/app/app.component';
import { CalendarView } from 'angular-calendar';
import { SalaryReport } from './../../../interfaces/salaryReportInterface';
import * as moment from 'moment';
import { ExcelService } from 'src/app/Services/excel/excel.service';

@Component({
  selector: 'app-monthly-salary-report',
  templateUrl: './monthly-salary-report.component.html',
  styleUrls: ['./monthly-salary-report.component.scss']
})
export class MonthlySalaryReportComponent implements OnInit {
  @ViewChild('modalContent', { static: true } as any) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  viewDate: Date = new Date();
  salaryData: SalaryReport[] = [];
  daysOfMonth = moment(this.viewDate).daysInMonth();
  headers: any = ['Name', 'Basic Salary', 'Allowance One', 'Allowance Two', 'Month Total', 'Daily Rate',
    'Rate Per Hour', 'Present', 'Absent', 'Working Days', 'Salary of Month', 'Overtime Hours', 'Overtime Amount',
    'Bouns Hours', 'Bouns Hours Amount', 'Gross Total'];
  constructor(private reportService: ReportsService, private app: AppComponent,
    private excelService: ExcelService) { }

  ngOnInit() {
    this.getSalaryReport();
  }
  getSalaryReport() {
    this.app.Spinner.show();
    this.reportService.getmonthlySalaryData({ date: this.viewDate }).subscribe((data: any) => {

      this.calculateSalery(data);
    }, error => {
    });
  }
  calculateSalery(data) {
    this.salaryData = [];
    data.forEach(element => {
      // console.log(element);
      const obj = {
        name: element.name, bsalary: element.basic_salary ? element.basic_salary : 0,
        allownsOne: element.allowance_one ? element.allowance_one : 0, allownsTwo: element.allowance_two ? element.allowance_two : 0,
        monthTotal: 0, dailyRate: 0, ratePerHour: 0, present: element.presents, absent: element.absense,
        workkingsDays: 0, salaryOfMonth: 0, overtimeHoure: 0, overtimeAmount: 0, bounsHour: 0,
        bounsHourAmount: 0, grossTotal: 0
      };
      obj.monthTotal = obj.bsalary + obj.allownsOne + obj.allownsTwo;
      obj.dailyRate = Math.round((obj.monthTotal / this.daysOfMonth) * 100) / 100;
      obj.ratePerHour = Math.round((obj.bsalary / 240) * 100) / 100;
      obj.workkingsDays = element.presents - (2 * obj.absent);
      if (obj.workkingsDays > 0) {
        obj.salaryOfMonth = obj.workkingsDays * obj.dailyRate;
      } else {
        obj.workkingsDays = 0;
        obj.salaryOfMonth = 0;
      }
      obj.overtimeHoure = this.countOVertimeHours(element.overtime);
      obj.overtimeAmount = Math.round((obj.overtimeHoure * obj.ratePerHour) * 100) / 100;
      if (obj.workkingsDays === this.daysOfMonth) {
        obj.bounsHour = this.daysOfMonth;
      }
      obj.bounsHourAmount = Math.round((obj.bounsHour * obj.ratePerHour) * 100) / 100;
      obj.grossTotal = Math.round((obj.salaryOfMonth + obj.overtimeAmount + obj.bounsHourAmount) * 100) / 100;
      this.salaryData.push(obj);
      // console.log(obj);
    });
  }
  countOVertimeHours(data) {
    if (data) {
      data = data.split(',');
      // console.log(data);
      let ovt = 0;
      data.forEach(element => {
        ovt += Number(element);
      });
      return ovt;
    } else {
      return 0;

    }
  }

  loadNextMonth() {
    this.daysOfMonth = moment(this.viewDate).daysInMonth();
    this.getSalaryReport();
  }
  loadPreviousMonth() {
    this.daysOfMonth = moment(this.viewDate).daysInMonth();
    this.getSalaryReport();
  }
  exportAsExcel() {
    if (this.salaryData.length > 0) {
      // this.excelService.exportAsExcelFile(this.salaryData, 'Salary-report');
      this.reportService.exportAsCsv(this.salaryData, 'Salary Report', this.headers, 'employees-salary-report');

    } else {
      this.app.showError('Data not available for this month');
    }

  }

}
