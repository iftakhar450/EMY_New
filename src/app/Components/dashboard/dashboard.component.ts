import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { SocketService } from 'src/app/Services/socket/socket.service';
import { ReportsService } from 'src/app/Services/report/reports.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  empDetail: any = '';
  projectDetail: any = [];
  constructor(private app: AppComponent, socket: SocketService, private reportService: ReportsService) {
   // this.app.Spinner.show();
    this.app.isLoginPage = false;
  }

  ngOnInit() {
    this.getDashboardDetail();
  }
  getDashboardDetail() {
    this.reportService.getDashboardData().subscribe((data: any) => {
      console.log(data);
      console.log(data.employeesDetail[0]);
      this.empDetail = data.employeesDetail[0];
      this.projectDetail = data.projectDetail;
    }, error => {
    });
  }
  totalProjects() {
    let total = 0;
    this.projectDetail.forEach(element => {
      total += element.count;
    });
    return total;
  }

}
