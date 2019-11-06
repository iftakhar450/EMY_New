import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
// import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() headerText: string;
  headerlabel: string;
  closeResult: string;
  username: string;
  constructor(private router: Router, private modalService: NgbModal, private app: AppComponent) {
  }

  ngOnInit() {
    this.headerlabel = this.headerText;
    this.username = localStorage.getItem('name');
    // alert(this.headerlabel);
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  logout() {
    this.modalService.dismissAll();
    localStorage.clear();
    this.router.navigate(['/']);
  }
  open(contant) {
    this.app.open(contant);
  }
}
