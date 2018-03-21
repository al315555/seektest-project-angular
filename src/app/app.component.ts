import { Component, OnInit} from '@angular/core';
import { LoginSpinnerComponent } from '../components/login-spinner/login-spinner.component';
import { AuthService } from './core/auth.service';
import { NotifyService } from './core/notify.service';
import {FunctionsService} from './functions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'SEEK TEST';
  register: boolean;
  login: boolean;
  showMainPage: boolean;

  constructor(public authService: AuthService, public functionsService: FunctionsService) {
    this.login = false; this.register = false; this.showMainPage = this.functionsService.showMainPage;
  }

  clickOnRegister() {
    this.register = true;
    this.login = false;
    this.showMainPage = false;
    this.functionsService.changeShowMainPageToFalse();
  }

  clickOnLogin() {
    this.login = true;
    this.register = false;
    this.showMainPage = false;
    this.functionsService.changeShowMainPageToFalse();
  }

  goBack() {
    this.login = false;
    this.register = false;
    this.showMainPage = true;
    this.functionsService.changeShowMainPageToTrue();
  }

  changeShowMainPage() {
    this.showMainPage = false;
  }
}
