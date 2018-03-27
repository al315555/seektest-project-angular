import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import {FunctionsService} from './functions.service';
import {User} from './core/User';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';



import { Router } from '@angular/router';
import { NotifyService } from './core/notify.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch'

import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  private isLogged: boolean;
  error: boolean;

  constructor(public firebaseAuth: AngularFireAuth, public functions: FunctionsService) {
  constructor(private afAuth: AngularFireAuth,private firebaseAuth: AngularFireAuth,private afs: AngularFirestore, public functions: FunctionsService, private notify: NotifyService) {
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
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        return this.setUserDoc(user) // create initial user document
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.error = true;
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.error = false;
        console.log('Nice, it worked!', value.message);
      })
      .catch(err => {
        this.error = true;
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.functions.changeShowMainPageToTrue();
    this.functions.changeToNotLogged();
  }

}
