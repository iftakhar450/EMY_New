import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://localhost:3000/main';
  private socket;

  constructor() {
    console.log('socket service');
    this.socket = io('http://localhost:3000/main');
    //   this.socket = io.connect('localhost', {
    //     port: 3000
    // });
    // this.socket.on('depUpdate', function () {
    //   console.log('depUpdate');
    // });
    // console.log(this.socket);
    // this.socket.emit('subscribe', { group: '1' });
    //  this.sendMessage('skdfjskdfjk');
  }
  observer: any;
  getSocketDepartmentUpdateData(): Observable<any> {
    this.socket.on('depUpdate', (res) => {
      console.log('depUpdate');
      this.observer.next(res);
    });
    return this.getSocketDataObservable();
  }
  employeesUpdateDetected(): Observable<any> {
    this.socket.on('empUpdate', (res) => {
      console.log('empUpdate');
      this.observer.next(res);
    });
    return this.getSocketDataObservable();
  }
  workNatureUpdateDetected(): Observable<any> {
    this.socket.on('worknatureUpdate', (res) => {
      console.log('worknatureUpdate');
      this.observer.next(res);
    });
    return this.getSocketDataObservable();
  }
  getSocketProjectUpdateData() {
    this.socket.on('projectUpdate', (res) => {
      console.log('projectUpdate');
      this.observer.next(res);
    });
    return this.getSocketDataObservable();
  }
  getSocketAttendenceUpdateData() {
    this.socket.on('attendenceUpdate', (res) => {
      console.log('attendenceUpdate');
      this.observer.next(res);
    });
    return this.getSocketDataObservable();
  }
  getSocketDataObservable(): Observable<any> {
    return new Observable(observer => {
      this.observer = observer;
    });
  }

}
