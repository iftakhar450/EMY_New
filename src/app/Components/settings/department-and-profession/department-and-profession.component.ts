import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { SettingsService } from 'src/app/Services/settings/settings.service';
import { SocketService } from 'src/app/Services/socket/socket.service';
@Component({
  selector: 'app-department-and-profession',
  templateUrl: './department-and-profession.component.html',
  styleUrls: ['./department-and-profession.component.scss']
})
export class DepartmentAndProfessionComponent implements OnInit {

  closeResult: any;
  allDepartments: any = [];
  allProfessions: any = [];
  isDepartmentMatched: any = false;
  isProfessionMatched: any = false;
  selectedDep: any;
  selectedProf: any;
  newDepartment = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  newProfession = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  // tslint:disable-next-line:max-line-length
  constructor(private modalService: NgbModal, private app: AppComponent, private service: SettingsService, private socket: SocketService) { }

  ngOnInit() {
    this.getDeparments();
    this.getProfessions();
    this.newDepartment.get('name').valueChanges.subscribe(value => {
      this.checkDepartmentDuplication(value);
    });
    this.newProfession.get('name').valueChanges.subscribe(value => {
      this.checkProfessionDuplication(value);
    });
    this.socketDepartmentUpdateData();
  }
  socketDepartmentUpdateData() {
    this.socket.getSocketDepartmentUpdateData()
      .subscribe(data => {
        this.getDeparments();
        console.log('socket department update');
      });
  }
  getDeparments() {
    this.app.Spinner.show();
    this.service.allDepartments().subscribe((data: any) => {
      console.log(data);
      this.allDepartments = data;
      this.allDepartments.forEach(element => {
        element['disabled'] = true;
      });
      localStorage.setItem('departments', JSON.stringify(this.allDepartments));
      //  this.data = data;
    }, error => {
    });
  }
  getProfessions() {
    this.app.Spinner.show();
    this.service.allProfessions().subscribe((data: any) => {
      console.log(data);
      this.allProfessions = data;
      this.allProfessions.forEach(element => {
        element['disabled'] = true;
      });
      localStorage.setItem('professions', JSON.stringify(this.allProfessions));
      //  this.data = data;
    }, error => {
    });
  }
  addDepartment(obj) {
    this.app.Spinner.show();
    this.service.addDepartment(obj).subscribe((data: any) => {
      this.app.showSuccess(data.msg);
      // this.getDeparments();
      this.newDepartment.reset();
    }, error => {
    });
  }
  addProfession(obj) {
    this.app.Spinner.show();
    this.service.addProfession(obj).subscribe((data: any) => {
      this.app.showSuccess(data.msg);
      this.getProfessions();
      this.newProfession.reset();
    }, error => {
    });
  }
  submitDepartment() {
    if (this.newDepartment.valid) {
      this.modalService.dismissAll();
      this.addDepartment({ name: this.newDepartment.controls.name.value });
    }
    //  console.log(this.newDepartment.controls.name.value);
  }
  deleteDepartment() {
    this.app.Spinner.show();
    this.service.deleteDepartment(this.selectedDep).subscribe((data: any) => {
       this.app.showSuccess(data.msg);
      this.modalService.dismissAll();
    }, error => {
    });
  }
  submitProfession() {
    if (this.newProfession.valid) {
      this.addProfession({ name: this.newProfession.controls.name.value });
      this.modalService.dismissAll();
    }
    // console.log(this.newProfession.controls.name.value);
  }
  deleteProfession() {
    this.app.Spinner.show();
    this.service.deleteProfession(this.selectedProf).subscribe((data: any) => {
     this.app.showSuccess(data.msg);
      this.modalService.dismissAll();
      this.getProfessions();
    }, error => {
    });
  }
  checkProfessionDuplication(value) {
    const items = this.allProfessions.filter(item => item.name.indexOf(value) !== -1);
    if (items.length > 0) {
      this.isProfessionMatched = true;
    } else {
      this.isProfessionMatched = false;
    }
  }
  checkDepartmentDuplication(value) {
    const items = this.allDepartments.filter(item => item.name.indexOf(value) !== -1);
    // console.log(items);
    if (items.length > 0) {
      this.isDepartmentMatched = true;
    } else {
      this.isDepartmentMatched = false;
    }
  }
  EditToggle(data) {
    data.disabled = !data.disabled;
  }
  updateDepartment(data) {
    console.log(data);
    this.app.Spinner.show();
    // tslint:disable-next-line:no-shadowed-variable
    this.service.updateDepartment({ name: data.name, rec_id: data.rec_id }).subscribe((data: any) => {
      console.log(data);
      this.app.showSuccess(data.msg);
      this.getDeparments();
    }, error => {
    });
  }
  updateProfession(data) {
    console.log(data);
    this.app.Spinner.show();
    // tslint:disable-next-line:no-shadowed-variable
    this.service.updateProfession({ name: data.name, rec_id: data.rec_id }).subscribe((data: any) => {
      console.log(data);
      this.app.showSuccess(data.msg);
      this.getProfessions();
    }, error => {
    });
  }
  deleteProfessionClick(content, pro) {
    this.selectedProf = pro;
    this.app.open(content);

  }
  deleteDepartmentClick(content, dep) {
    this.selectedDep = dep;
    this.app.open(content);
  }
  open(content) {
    this.app.open(content);
  }
  // depEditToggle(dep) {
  //   dep.disabled = !dep.disabled;
  // }

}
