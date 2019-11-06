import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { SettingsService } from 'src/app/Services/settings/settings.service';
import { SocketService } from 'src/app/Services/socket/socket.service';
@Component({
  selector: 'app-work-natures',
  templateUrl: './work-natures.component.html',
  styleUrls: ['./work-natures.component.scss']
})
export class WorkNaturesComponent implements OnInit {
  allWorknatures: any = [];
  closeResult: any;
  selectedwork: any = {};
  isWorkNature: any = false;
  newWorkNature = new FormGroup({
    name: new FormControl('', Validators.required),
    translation: new FormControl('', Validators.required),
  });
  constructor(private modalService: NgbModal, private app: AppComponent, private service: SettingsService,
    private socket: SocketService) { }
  @ViewChild('workDelete',  {static: false}) private workDelete;
  ngOnInit() {
    this.getWorknatures();
    this.socketWorknatureUpdateData();
  }
  socketWorknatureUpdateData() {
    this.socket.workNatureUpdateDetected()
      .subscribe(data => {
        this.getWorknatures();
        console.log('socket worknature update');
      });
  }

  getWorknatures() {
    this.app.Spinner.show();
    this.service.allWorknatures().subscribe((data: any) => {
      // console.log(data);
      localStorage.setItem('worksnatures', JSON.stringify(data));
      this.allWorknatures = data;
      this.allWorknatures.forEach(element => {
        element['disabled'] = true;
      });
      //  this.data = data;
      this.app.Spinner.hide();
    }, error => {
      this.app.Spinner.hide();
    });
  }
  submitWorknature() {
    if (this.newWorkNature.valid) {
      this.modalService.dismissAll();
      console.log(this.newWorkNature.controls.name.value);
      console.log(this.newWorkNature.controls.translation.value);
      this.addNewWorknature({ name: this.newWorkNature.controls.name.value, translation: this.newWorkNature.controls.translation.value });
    } else {
      this.app.showError('All field are required');
    }
  }
  addNewWorknature(obj) {
    this.app.Spinner.show();
    this.service.addworknature(obj).subscribe((data: any) => {
      this.app.showSuccess(data.msg);
      // this.getDeparments();
      this.newWorkNature.reset();
    }, error => {
    });
  }

  updateWorknature(data) {
    this.app.Spinner.show();
    // tslint:disable-next-line:no-shadowed-variable
    this.service.updateWorknature({ name: data.name, translation: data.translation, rec_id: data.rec_id }).subscribe((data: any) => {
      this.app.showSuccess(data.msg);
    }, error => {
    });
  }
  deleteWorkNatureAlert(data) {
    this.selectedwork = data;
    this.app.open(this.workDelete);
  }
  deleteWorknature() {
    this.app.Spinner.show();
    // tslint:disable-next-line:no-shadowed-variable
    this.service.deleteWorkNature({ rec_id: this.selectedwork.rec_id }).subscribe((data: any) => {
      this.app.showSuccess(data.msg);
      this.modalService.dismissAll();
    }, error => {
    });
  }
  EditToggle(data) {
    data.disabled = !data.disabled;
  }
  open(contant) {
    this.app.open(contant);
  }
}
