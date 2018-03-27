import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import {FunctionsService} from './functions.service';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  private isLogged: boolean;
  error: boolean;

  constructor(public firebaseAuth: AngularFireAuth, public functions: FunctionsService) {
    this.user = firebaseAuth.authState;
    this.error = false;
    this.isLogged = firebaseAuth.authState === null ? false : true;
    if (this.isLogged) {
      this.functions.changeToLogged();
    } else {
      this.functions.changeToNotLogged();
    }
  }

  isAnyoneLogged(): boolean {
    return this.isLogged;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.error = false;
        this.isLogged = true;
        this.functions.changeToLogged();
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.error = true;
        this.isLogged = false;
        this.functions.changeToNotLogged();
      });
  }

  login(email: string, password: string) {

    return new Promise((resolve, reject) => {this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.error = false;
        this.isLogged = true;
        this.functions.changeToLogged();
        console.log('Nice, it worked!', value.message);
        resolve(value.message);
      })
      .catch(err => {
        this.error = true;
        this.isLogged = false;
        this.functions.changeToNotLogged();
        console.log('Something went wrong:', err.message);
        reject(err.message);
      }); });
  }


  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.functions.changeShowMainPageToTrue();
    this.functions.changeToNotLogged();
    this.isLogged = false;
  }

}
