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
  }

  signup(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  updateUser(user: User, data: any) {
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
    this.addUser(data1, data1._uid);
  }

// Sets user data to firestore after succesful login
  setUserDoc(user) {

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
    this.addUser(data, data._uid);
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(value => {
          this.generateUserDataJson();

          /*
          console.log('Loggeado correctamente: ' + value.uid);
          console.log('Usuario: ' + value.email);

          console.log(this.db.list('users/' + value.uid));

          /*
          const user2$ = this.db.list('users/'+value.uid);
          this.db.object('users/'+value.uid).valueChanges().subscribe(users => {this.users = users;
          console.log(this.users)});

          console.log('Usuario prueba: '+this.users);



          user._name = value.name;
          user._surname = value.surname;
          user._sexo = value.sexo;
          user._infoAdicional = value.infoAdicional;
          user._alergias = value._alergias;
          user._observacionesMedicas = value.observacionesMedicas;
          user._email = email;
          user._photoURL = value.photoURL;
          user._uid = value.uid;


          */
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

  addUser(us, key) {
    console.log(us);
    this.items.push(us)
      .then(value => {
          this.userData = us;
          this.userDataJson._name = us._name;
          console.log('Guardado correctamente.');
          this.functions.changeShowMainPageToFalse();
          this.functions.changeToLogged();
          this.functions.selectPerfil();
          this.generateUserDataJson();
          window.location.reload();
        }
      );
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

    // console.log(nombreUsuario);

   /* this.db.list("users/" + myUserId).subs
    const topUserPostsRef = firebase.database().ref('users/' + myUserId);
    topUserPostsRef.on('value',function () {

    }{

    });
    console.log(topUserPostsRef);
    */
  }
  resetPassword(email) {
    console.log(email);
    this.afAuth.auth.sendPasswordResetEmail(email)
    .then(() => console.log('email sent'))
    .catch((error) => console.log(error));
}
}
