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
import 'rxjs/add/operator/catch';

import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  error: boolean;
  errorMessage: string;

  constructor(private afAuth: AngularFireAuth, public firebaseAuth: AngularFireAuth, private afs: AngularFirestore,
              public functions: FunctionsService, private notify: NotifyService) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    /*return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        return this.setUserDoc(user) // create initial user document
      })
      .catch();*/
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  updateUser(user: User, data: any) {
    // return this.afs.doc(`users/${user._uid}`).update(data)
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user._uid}`);
    const data1: User = {
      _uid: user._uid,
      _name: user._name,
      _surname: user._surname,
      _age: user._age,
      _email: user._email,
      _alergias: user._alergias,
      _infoAdicional: user._infoAdicional,
      _observacionesMedicas: user._observacionesMedicas,
      _sexo: user._sexo,
      _photoURL: 'http://static.wixstatic.com/media/1dd1d6_3f96863fc9384f60944fd5559cab0239.png_srz_300_300_85_22_0.50_1.20_0.00_png_srz',
  };
  return userRef.set(data1);

  }
// Sets user data to firestore after succesful login
setUserDoc(user) {

  const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

  const data: User = {
    _uid: user.uid,
    _name: user.name,
    _surname: user.surname,
    _age: user.age,
    _email: user.email,
    _alergias: user.alergias,
    _infoAdicional: user.infoAdicional,
    _observacionesMedicas: user.observacionesMedicas,
    _sexo: user.sexo,
    _photoURL: 'http://static.wixstatic.com/media/1dd1d6_3f96863fc9384f60944fd5559cab0239.png_srz_300_300_85_22_0.50_1.20_0.00_png_srz',
  };
  return userRef.set(data);

}

  login(email: string, password: string) {
    const user = new User({
      uid: '',
      email: '',
      name: '',
      surname: '',
      photoURL: '',
      sexo: '',
      infoAdicional: '',
      observacionesMedicas: '',
      age: '',
      alergias: ''
    });

   return new Promise((resolve, reject) => {this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(value => {
          console.log('Loggeado correctamente: ' + value);
          user._name = value.name;
          user._surname = value.surname;
          user._sexo = value.sexo;
          user._infoAdicional = value.infoAdicional;
          user._alergias = value._alergias;
          user._observacionesMedicas = value.observacionesMedicas;
          user._email = email;
          user._photoURL = value.photoURL;
          user._uid = value.uid;
          resolve(user);
        })
        .catch(err => {
          console.log('Error: ', err.message);
          this.errorMessage = err.message;
          reject(err);
        }); });
  }
  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.functions.changeShowMainPageToTrue();
    this.functions.changeToNotLogged();
  }
}
