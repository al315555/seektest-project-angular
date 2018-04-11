import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import {FunctionsService} from './functions.service';
import {User} from './core/User';
import { AngularFirestore, AngularFirestoreDocument,  } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireObject, AngularFireList  } from 'angularfire2/database';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from './core/notify.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { switchMap } from 'rxjs/operators';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  error: boolean;
  errorMessage: string;

  items: AngularFireList<User[]> = null; //  list of objects
  userData: AngularFireObject<User> = null; //   single object
  userDataObject: AngularFireObject<Object>;

  userDataJson = new User({
    _uid: ' ',
    _email: '',
    _name: '',
    _surname: '',
    _photoURL: '',
    _sexo: '',
    _infoAdicional: '',
    _observacionesMedicas: '',
    _fechaNacimiento: '',
    _alergias: ''
  });

  users: any;


  constructor(private afAuth: AngularFireAuth, public firebaseAuth: AngularFireAuth, public functions: FunctionsService,
              private notify: NotifyService, public db: AngularFireDatabase) {
    this.user = firebaseAuth.authState;
    this.items = db.list('/users');
    this.generateUserDataJson();
  }

  signup(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  updateUser(user: User, data: any): string {
    const data1: User = {
      _uid: data._uid,
      _name: data._name,
      _surname: data._surname,
      _fechaNacimiento: data._fechaNacimiento,
      _email: user._email,
      _alergias: data._alergias,
      _infoAdicional: data._infoAdicional,
      _observacionesMedicas: data._observacionesMedicas,
      _sexo: data._sexo,
      _photoURL: 'http://static.wixstatic.com/media/1dd1d6_3f96863fc9384f60944fd5559cab0239.png_srz_300_300_85_22_0.50_1.20_0.00_png_srz',
    };
    return this.addUser(data1, data1._uid);
  }

// Sets user data to firestore after succesful login
  setUserDoc(user): string {

    const data: User = {
      _uid: user.uid,
      _name: user.name,
      _surname: user.surname,
      _email: user.email,
      _alergias: user.alergias,
      _infoAdicional: user.infoAdicional,
      _observacionesMedicas: user.observacionesMedicas,
      _sexo: user.sexo,
      _fechaNacimiento: user.fechaNacimiento,
      _photoURL: 'http://static.wixstatic.com/media/1dd1d6_3f96863fc9384f60944fd5559cab0239.png_srz_300_300_85_22_0.50_1.20_0.00_png_srz',
    };
    
    return this.addUser(data, data._uid);
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(value => {
          this.generateUserDataJson();
          resolve('');
        })
        .catch(err => {
          console.log('Error: ', err.message);
          this.errorMessage = err.message;
          reject(err);
        });
    });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.functions.changeShowMainPageToTrue();
    this.functions.changeToNotLogged();
  }

  getUser(uid: string) {
    return this.db.list('users/', ref => ref.orderByChild('_uid').equalTo(uid));
  }

  /*
  getUser(uid: string) {
    return this.db.list('users/', ref => ref.orderByChild('_uid').equalTo(uid))
          .snapshotChanges()
          .map (Changes => {
            console.log(Change);
            return Changes.map(p => ({
               key: p.payload.key, ...p.payload.val()}));
            });
  }
  */

  actualizarUsuario() {
    const myUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + myUserId).set({
      _name: this.userDataJson._name,
      _uid: myUserId,
      _surname: this.userDataJson._surname,
      _email: this.userDataJson._email,
      _alergias: this.userDataJson._alergias,
      _infoAdicional: this.userDataJson._infoAdicional,
      _observacionesMedicas: this.userDataJson._observacionesMedicas,
      _sexo: this.userDataJson._sexo,
      _fechaNacimiento: this.userDataJson._fechaNacimiento,
      _photoURL: 'http://static.wixstatic.com/media/1dd1d6_3f96863fc9384f60944fd5559cab0239.png_srz_300_300_85_22_0.50_1.20_0.00_png_srz',


    });
  }

  addUser(us, key): string {
    let correcto: boolean = false;
    try {
      this.items.push(us);
      correcto = true;
    } catch {
      correcto = false;
    }
    if (correcto) {
      this.functions.changeShowMainPageToFalse();
      this.functions.changeToLogged();
      this.functions.selectPerfil();
      this.generateUserDataJson();
      console.log('Actualizado en vista.');
      this.verificarCorreo()
      return 'true';
    } else {
      console.log('Algo fue mal.');
      return 'false';
    }

    // this.items.set(key, us);

    // var newKey  = key.replace('.', "");
    // const userList = this.db.list('/users');
    // const user3 = null;
    // userList.set(key, user);
  }

  private handleError(error) {
    console.log(error);
  }

  generateUserDataJson() {
    if (firebase.auth().currentUser != null) {
      const myUserId = firebase.auth().currentUser.uid;
      const nombreUsuario = this.db.list('users/', ref => ref.orderByChild('_uid').equalTo(myUserId))
        .snapshotChanges().subscribe(value => {
          value.map(cosas => {
            this.userDataJson._name = cosas.payload.child('_name').exportVal();
            this.userDataJson._fechaNacimiento = cosas.payload.child('_fechaNacimiento').exportVal();
            this.userDataJson._alergias = cosas.payload.child('_alergias').exportVal();
            this.userDataJson._infoAdicional = cosas.payload.child('_infoAdicional').exportVal();
            this.userDataJson._photoURL = cosas.payload.child('_photoURL').exportVal();
            this.userDataJson._sexo = cosas.payload.child('_sexo').exportVal();
            this.userDataJson._observacionesMedicas = cosas.payload.child('_observacionesMedicas').exportVal();
            this.userDataJson._surname = cosas.payload.child('_surname').exportVal();
            this.userDataJson._email = cosas.payload.child('_email').exportVal();
          });
          // console.log(value);
        });
    }
  }
  resetPassword(email) {
    console.log(email);
    this.afAuth.auth.sendPasswordResetEmail(email)
    .then(() => console.log('email sent'))
    .catch((error) => console.log(error));
}
deleteUser() {
  this.functions.changeShowMainPageToTrue();
  this.functions.changeToNotLogged();
  console.log('deleting user');
  this.firebaseAuth.auth.currentUser.delete();
}
verificarCorreo(){
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    console.log("Verification mail correcto")
  }).catch(function(error) {
    console.log(error)
  });
}

}

