import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
  editItem: any;
  constructor(private http: HttpClient) { }
  addNewAttendence(data) {
    const url: any = environment.baseUrl + environment.addAttendence;
    return this.http.post(url, data);
  }
  updateAttendence(data) {
    const url: any = environment.baseUrl + environment.updateAttendence;
    return this.http.post(url, data);
  }
  todayAttendence(date) {
    const url: any = environment.baseUrl + environment.todayAttendence;
    return this.http.post(url, {date});
  }
  deleteAttendence(id) {
    const url: any = environment.baseUrl + environment.deleteAttendence;
    return this.http.post(url, {rec_id: id});
  }
  fetchCardData(data) {
    const url: any = environment.baseUrl + environment.fetchCardData;
    return this.http.post(url, data);
  }
}
