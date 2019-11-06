import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ProjectService } from 'src/app/Services/project/project.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { _ } from 'underscore';
import { SocketService } from 'src/app/Services/socket/socket.service';
@Component({
  selector: 'app-allproject',
  templateUrl: './allproject.component.html',
  styleUrls: ['./allproject.component.scss']
})
export class AllprojectComponent implements OnInit {
  allProjects: any = [];
  allProjectsSave: any = [];
  selectedproject: any = {};
  projectFilterOption: any = [];
  extensions: any = [];
  closeResult: any;
  searchbyclient: any = '';
  constructor(private router: Router, private app: AppComponent, private projectService: ProjectService,
    private modalService: NgbModal, private socket: SocketService) { }
  @ViewChild('projectInfo') private projectInfo;
  @ViewChild('projectdelete') private projectdelete;
  ngOnInit() {
    this.getAllProjects();
    this.socketProjecttUpdateData();
  }
  socketProjecttUpdateData() {
    this.socket.getSocketProjectUpdateData()
      .subscribe(data => {
        this.getAllProjects();
        console.log('socket project update');
      });
  }
  goToAddnewProject() {
    this.router.navigate(['/addnewprojects']);
  }
  getAllProjects() {
    this.app.Spinner.show();
    this.projectService.allProjects().subscribe((data: any) => {
      console.log(data);
      this.allProjects = data;
      this.allProjectsSave = data;
      localStorage.setItem('projects', JSON.stringify(data));
      this.projectFilterOption = Object.keys(_.groupBy(data, 'status'));
    }, error => {
    });
  }
  projectInfoClick(item) {
    this.selectedproject = item;
    console.log(item.extras);
    if (item.extras && item.extras.length > 0) {
      this.extensions = item.extras.split(',');
    } else {
      this.extensions = [];
    }
    this.app.open(this.projectInfo);

  }
  projectEditClick(item) {
    this.projectService.editProject = item;
    this.router.navigate(['/updateproject']);
  }
  projectDeleteClick(item) {
    this.selectedproject = item;
    this.app.open(this.projectdelete);
  }
  deleteProject() {
    this.app.Spinner.show();
    this.projectService.deleteProject(this.selectedproject.rec_id).subscribe((data: any) => {
      this.app.showSuccess(data.msg);
      this.modalService.dismissAll();
    }, error => {
    });
  }
  projectFilterOptionChange(args) {
    if (args.length > 0) {
      this.allProjects = _.filter(this.allProjectsSave, function (ele) {
        console.log(ele.status);
        return ele.status === args[0];
      });
    } else {
      this.allProjects = this.allProjectsSave;
    }

  }

}
