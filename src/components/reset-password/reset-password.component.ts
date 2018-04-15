import { Component } from '@angular/core';
import { AuthService } from '../../app/auth.service';
import {FunctionsService} from '../../app/functions.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string;
  constructor(public authService: AuthService, public functions: FunctionsService) {}

  resetPassword() {
      this.email.trim();
      this.authService.resetPassword(this.email);
      this.functions.changeToNotResetPassword();
  }

  cancelar() {
    this.functions.changeToNotResetPassword();
    this.functions.changeShowMainPageToTrue();
  }
}

