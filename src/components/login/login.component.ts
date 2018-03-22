import { Component } from '@angular/core';
import { AuthService } from '../../app/auth.service';
import {FunctionsService} from '../../app/functions.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;
  errorHappened: boolean;
  logged: boolean;

  constructor(public authService: AuthService, public functions: FunctionsService) {}
  
  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }

  goBackLogin() {
    this.functions.changeShowMainPageToTrue();
  }
}
