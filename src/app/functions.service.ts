import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class FunctionsService {
  user: Observable<firebase.User>;
  error: boolean;
  showMainPage: boolean;
  isLogged: boolean;

  constructor() {
    this.error = false;
    this.showMainPage = true;
    this.isLogged = false;
  }

  changeShowMainPageToTrue() {
    this.showMainPage = true;
  }

  changeShowMainPageToFalse() {
    this.showMainPage = false;
  }

  changeToLogged() {
    this.isLogged = true;
  }

  changeToNotLogged() {
    this.isLogged = false;
  }
}
