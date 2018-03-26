import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import {FunctionsService} from './functions.service';
import {User} from './core/User';

/*@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  error: boolean;

  constructor(private firebaseAuth: AngularFireAuth, public functions: FunctionsService) {
    this.user = firebaseAuth.authState;
    this.error = false;
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

  

}*/
@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  error: boolean;

  constructor(private firebaseAuth: AngularFireAuth, public functions: FunctionsService) {
    this.user = firebaseAuth.authState;
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

  login(email: string, password: string){
    let user = new User({
      uid: "",
      email: "",
      name: "",
      surname:"",
      photoURL: "",
      sexo:"",
      infoAdicional:"",
      observacionesMedicas:"",
      age:"",
      alergias:""
    })
    
   return new Promise((resolve, reject) => {this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(value => {
          console.log("Loggeado correctamente")
          user._name = value.displayName;
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
          console.log("Error: ", err.message);
          reject(err);
        });});
  }
  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.functions.changeShowMainPageToTrue();
    this.functions.changeToNotLogged();
  }
}
