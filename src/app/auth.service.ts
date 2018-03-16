import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  error: boolean;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
    this.error = false;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.error = false;
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
  }

}
