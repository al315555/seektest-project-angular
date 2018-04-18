import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import {FunctionsService} from './functions.service';
import {User} from './core/User';
import { AngularFirestore, AngularFirestoreDocument,  } from 'angularfire2/firestore';
import {AngularFireDatabase, AngularFireObject, AngularFireList, snapshotChanges} from 'angularfire2/database';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from './core/notify.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { switchMap } from 'rxjs/operators';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireStorage} from 'angularfire2/storage';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  error: boolean;
  errorMessage: string;
  datosUsuario: boolean;

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
    _fechaNacimiento: 0,
    _alergias: ''
  });

  users: any;


  constructor(private afAuth: AngularFireAuth, public firebaseAuth: AngularFireAuth, public functions: FunctionsService,
              private notify: NotifyService, public db: AngularFireDatabase, public st: AngularFireStorage) {
    this.datosUsuario = false;
    this.user = firebaseAuth.authState;
    this.items = db.list('/users');
    this.generateUserDataJson();
    console.log('Datos usuario 2', this.datosUsuario);
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
      _researcher: user._researcher,
      _photoURL: data._photoURL};
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
      _researcher: user.researcher,
      _photoURL: 'http://static.wixstatic.com/media/1dd1d6_3f96863fc9384f60944fd5559cab0239.png_srz_300_300_85_22_0.50_1.20_0.00_png_srz'
    };
    localStorage.setItem('uid_usuario', firebase.auth().currentUser.uid);
    return this.addUser(data, data._uid);
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(value => {
          localStorage.setItem('uid_usuario', firebase.auth().currentUser.uid);
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
    localStorage.removeItem('usuario');
    localStorage.removeItem('uid_usuario');
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

  putNewImg(file): boolean {
    try {
      const myUserId = firebase.auth().currentUser.uid;
      const url = 'Perfil/' + myUserId + '/' + file.name;
      const storageRef = this.st.upload(url, file)
        .then(value => {
          this.userDataJson._photoURL = value.downloadURL;
          console.log(value.downloadURL);
          return true;
        })
        .catch(value => {
          console.log(value);
          return false;
        });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  actualizarUsuario(): boolean {
    try {
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
        _photoURL: this.userDataJson._photoURL
      });
      return true;
    } catch {
      return false;
    }
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
      this.generateUserDataJson();
      this.functions.changeShowMainPageToFalse();
      this.functions.changeToLogged();
      // this.functions.selectPerfil();
      console.log('Actualizado en vista.');
      this.verificarCorreo();
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
    if (localStorage.getItem('uid_usuario') != null) {
      console.log('uid ya guardado a preiori');
      const myUserId = localStorage.getItem('uid_usuario');
      if (localStorage.getItem('usuario') === null) {
        console.log('usuario guardado ', myUserId);
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
              localStorage.setItem('usuario', JSON.stringify(this.userDataJson));
            });
        });
    } else {
      // Cargando usuario de storage"
      this.userDataJson = JSON.parse(localStorage.getItem('usuario'));
    }
  }
  }
  resetPassword(email) {
    console.log(email);
    this.afAuth.auth.sendPasswordResetEmail(email)
    .then(value => {
      alert('¡Correo de recuperación enviado! Revise su bandeja de entrada y siga los pasos.');
      console.log('email sent'); })
    .catch(error => {
      alert('Error en el envio del correo de recuperación. Puede que el usuario no esté registrado.');
      console.log(error);
    });
}
deleteUser() {
  this.functions.changeShowMainPageToTrue();
  this.functions.changeToNotLogged();
  localStorage.removeItem('usuario');
  localStorage.removeItem('uid_usuario');
  console.log('deleting user');
  this.firebaseAuth.auth.currentUser.delete();
}
verificarCorreo() {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    console.log('Verification mail correcto');
  }).catch(function(error) {
    console.log(error);
  });
}
}
