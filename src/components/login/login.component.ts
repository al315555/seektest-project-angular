import { Component } from '@angular/core';
import { AuthService } from '../../app/auth.service';

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

  constructor(public authService: AuthService) {}

  signup() {
    let result: string;
    result = this.authService.signup(this.email, this.password);
    if ( result === 'OK' ) {
      this.errorHappened = false;
      this.logged = true;
    } else {
      this.errorHappened = true;
      this.logged = false;
    }
    this.email = this.password = '';
  }

  login() {
    let result: string;
    result =
      this.authService.login(this.email, this.password);
    if ( result === 'OK' ) {
      this.errorHappened = false;
      this.logged = true;
    } else {
      this.errorHappened = true;
      this.logged = false;
    }
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }
}
