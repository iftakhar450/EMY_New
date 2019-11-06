import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    isLoginPage: any = false;
    constructor(public toastr: ToastrManager, private spinner: NgxSpinnerService, private modalService: NgbModal) {
        console.log('from app ts' +  this.isLoginPage);
    }
    title = 'Emy';
    Spinner: any;
    closeResult: any;
    ngOnInit() {
        this.Spinner = this.spinner;
    }
    showSuccess(msg) {
        this.toastr.successToastr(msg, 'Success!');
    }

    showError(msg) {
        this.toastr.errorToastr(msg, 'Oops!');
    }

    showWarning(msg) {
        this.toastr.warningToastr(msg, 'Alert!');
    }

    showInfo(msg) {
        this.toastr.infoToastr(msg, 'Info');
    }
    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }
}
