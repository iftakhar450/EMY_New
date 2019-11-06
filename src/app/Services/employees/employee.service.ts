import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  // url: any = '/login';
  editEmp: any;
  addNewEmployee(data) {
    const url: any = environment.baseUrl + environment.addNewEmplyee;
    return this.http.post(url, data);
  }
  allEmployee() {
    const url: any = environment.baseUrl + environment.allEmployees;
    return this.http.post(url, {});
  }
  deleteEmployee(id) {
    const url: any = environment.baseUrl + environment.deleteEmployee;
    return this.http.post(url, {userId: id});
  }
  editEmployee(data) {
    const url: any = environment.baseUrl + environment.editEmployee;
    return this.http.post(url, data);
  }
}
