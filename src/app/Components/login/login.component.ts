import { Component, OnInit } from '@angular/core';
import {LoginService} from './../../Services/login/login.service';
import {AppComponent} from './../../app.component';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: any = '';
  password: any = '';
  constructor(private loginService: LoginService, private app: AppComponent, private router: Router, private authService: AuthService) {

    this.app.isLoginPage = true;
  }

  ngOnInit() {
  }

  login() {
    if (this.username && this.password) {
       this.app.Spinner.show();
      this.loginService.login({username: this.username, password: this.password}).subscribe((data: any) => {
      //  this.app.showSuccess('Authorized');
        localStorage.setItem('name', data.name);
        localStorage.setItem('authorized', data.token);
        localStorage.setItem('id', data.rec_id);
        this.authService.setLoginStatus(true);
       this.router.navigate(['/dashboard']);
         }, error => {
         });
    } else {
      this.app.showInfo('All field are required');
    }


  }
  onKeydown(event) {
    if (event.key === 'Enter') {
      alert('enter');
    }
  }

}
