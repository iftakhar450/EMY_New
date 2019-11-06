import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }
  allDepartments() {
    const url: any = environment.baseUrl + environment.allDepartments;
    return this.http.get(url);
  }
  allProfessions() {
    const url: any = environment.baseUrl + environment.allProfessions;
    return this.http.get(url);
  }
  allWorknatures() {
    const url: any = environment.baseUrl + environment.allWorknatures;
    return this.http.get(url);
  }
  addDepartment(data) {
    const url: any = environment.baseUrl + environment.addNewDepartment;
    return this.http.post(url, data);
  }
  addProfession(data) {
    const url: any = environment.baseUrl + environment.addNewProfession;
    return this.http.post(url, data);
  }
  addworknature(data) {
    const url: any = environment.baseUrl + environment.addNewWorknature;
    return this.http.post(url, data);
  }
  updateDepartment(data) {
    const url: any = environment.baseUrl + environment.updateDeparment;
    return this.http.post(url, data);
  }
  deleteDepartment(data) {
    const url: any = environment.baseUrl + environment.deleteDeparment;
    return this.http.post(url, data);
  }
  deleteProfession(data) {
    const url: any = environment.baseUrl + environment.deleteProfession;
    return this.http.post(url, data);
  }
  updateWorknature(data) {
    const url: any = environment.baseUrl + environment.updateWorknature;
    return this.http.post(url, data);
  }
  updateProfession(data) {
    const url: any = environment.baseUrl + environment.updateProfession;
    return this.http.post(url, data);
  }

  deleteWorkNature(data) {
    const url: any = environment.baseUrl + environment.deleteWorknature;
    return this.http.post(url, data);
  }
}
