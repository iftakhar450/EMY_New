import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeService } from './../../../Services/employees/employee.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/Services/socket/socket.service';
import { _ } from 'underscore';
@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss']
})
export class AllEmployeesComponent implements OnInit {
  allEmployess: any = [];
  allEmployessSave: any = [];
  selectedEmp: any;
  searchbyUsername: any = '';
  profFilterOption: any = [];
  supervisorFilterOption: any = [];
  // filterOption: any = {name:''}
  constructor(private app: AppComponent, private modalService: NgbModal,
    private employeeService: EmployeeService, private router: Router,
    private socket: SocketService) { }
  @ViewChild('empInfo',  {static: false}) private empInfo;
  @ViewChild('empdelete',  {static: false}) private empdelete;
  ngOnInit() {
    // this.app.Spinner.show();
    this.getEmpployees();
    this.socketEmployeeUpdate();
  }
  socketEmployeeUpdate() {
    this.socket.getSocketDepartmentUpdateData()
      .subscribe(data => {
        this.getEmpployees();
        console.log('socket department update');
      });
  }
  getEmpployees() {
    this.app.Spinner.show();
    this.employeeService.allEmployee().subscribe((data: any) => {
      console.log(data);
      this.allEmployess = data;
      this.allEmployessSave = data;
      localStorage.setItem('allemployees', JSON.stringify(data));
      this.profFilterOption = Object.keys(_.groupBy(data, 'profName'));
      this.profFilterOption = _.reject(this.profFilterOption, function (val) {
        return val === 'null';
      });
      this.supervisorFilterOption = _.filter(data, function (ele) {
        return ele.isadmin === 'y';
      });
      // this.supervisorFilterOption = Object.keys(_.groupBy(this.supervisorFilterOption, 'name'));
    }, error => {
    });
  }
  deleteEmployee() {
    this.app.Spinner.show();
    this.employeeService.deleteEmployee(this.selectedEmp.rec_id).subscribe((data: any) => {
      //  this.data = data;
      console.log(data);
      this.app.showSuccess(data.msg);
      this.modalService.dismissAll();
    }, error => {
    });
  }
  goToAddnewEmployee() {
    const s = this.allEmployess.filter(e => e.isadmin.includes('y'));
    localStorage.setItem('supervisors', JSON.stringify(s));
    this.router.navigate(['/addnewemployee']);
  }
  empEditClick(user) {
    this.employeeService.editEmp = user;
    const s = this.allEmployess.filter(e => e.isadmin.includes('y'));
    localStorage.setItem('supervisors', JSON.stringify(s));
    this.router.navigate(['/updateemployee']);
  }
  empDeleteClick(user) {
    this.selectedEmp = user;
    this.app.open(this.empdelete);
  }
  empInfoClick(user) {
    console.log(user);
    this.selectedEmp = user;
    this.app.open(this.empInfo);
  }

  getSupervisorName(id) {

    const obj = _.filter(this.allEmployessSave, function (ele) {
      if (ele.rec_id.toString() === id) {
        return ele;
      }
    });
    if (obj.length > 0) {
      return obj[0].name;
    } else {
      return '';
    }

  }
  profFilterOptionChange(args) {
    console.log(args[0]);
    if (args.length > 0) {
      this.allEmployess = _.filter(this.allEmployessSave, function (ele) {
        console.log(ele.profName);
        return ele.profName === args[0];
      });
    } else {
      this.allEmployess = this.allEmployessSave;
    }

  }
  supervisorFilterOptionChange(args) {
    if (args.length > 0) {
      this.allEmployess = _.filter(this.allEmployessSave, function (ele) {
        return ele.supervisor_id === args[0].rec_id.toString();
      });
    } else {
      this.allEmployess = this.allEmployessSave;
    }

  }
}
