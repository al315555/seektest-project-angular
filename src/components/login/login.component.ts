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
  autentify: boolean;
  errorMessage: string;

  constructor(public authService: AuthService, public functions: FunctionsService) {}

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.autentify = true;
    this.authService.login(this.email, this.password)
      .then( value => {
        console.log('Autentify modificado a false en then.');
        this.autentify = false;
        this.email = this.password = '';
    })
      .catch(errr => {
        console.log('Autentify modificado a false en catch.');
        this.autentify = false;
        this.errorMessage = this.showSpanishMsg(errr.message);
        this.errorHappened = true;
        this.email = this.password = '';
      } );

  }
  private showSpanishMsg(errorMess: string): string {
    switch (errorMess) {
      case 'The email address is badly formatted.':
        return 'El formato del e-mail no es correcto.';
      case 'The password is invalid or the user does not have a password.':
        return 'La contraseña es incorrecta.';
      case 'There is no user record corresponding to this identifier. The user may have been deleted.':
        return 'El usuario no existe.';
      default:
        return 'Error genérico. Contacte con el administrador';
    }
  }

  logout() {
    this.authService.logout();
  }

  goBackLogin() {
    this.errorHappened = false;
    this.errorMessage = '';
    this.functions.changeShowMainPageToTrue();
  }
  resetPassword(){
    this.functions.changeToNotLogged();
    this.functions.changeToResetPassword();
    this.functions.changeShowMainPageToFalse();
    console.log("Reset");
  }
}
