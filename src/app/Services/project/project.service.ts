import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  // url: any = '/login';
  editProject: any;
  addNewProject(data) {
    const url: any = environment.baseUrl + environment.addNewProject;
    return this.http.post(url, data);
  }
  updateProject(data) {
    const url: any = environment.baseUrl + environment.updateProject;
    return this.http.post(url, data);
  }
  allProjects() {
    const url: any = environment.baseUrl + environment.allProjects;
    return this.http.post(url, {});
  }
  deleteProject(id) {
    const url: any = environment.baseUrl + environment.deleteProject;
    return this.http.post(url, {depId: id});
  }
}
