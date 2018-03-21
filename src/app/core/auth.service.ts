import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface Student {
  uid: string;
  email: string;
  photoURL: string;
  name?: string;
  surname?: string;
  location?: string;
  age?: string;
  genero?: string;
  alergias?: string;
  observacionesMedicas?: string;
  infoAdicional?: string;
}


@Injectable()
export class AuthService {

  user: Observable<Student>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private notify: NotifyService) {

      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<Student>(`users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })

  }

  //// Email/Password Auth ////
  
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        return this.setUserDoc(user) // create initial user document
      })
      .catch(error => this.handleError(error) );
  }

  // Update properties on the user document
  updateUser(user: Student, data: any) { 
    return this.afs.doc(`users/${user.uid}`).update(data)
  }



  // If error, console log and notify user
  private handleError(error) {
    console.error(error)
    this.notify.update(error.message, 'error')
  }

  // Sets user data to firestore after succesful login
  private setUserDoc(user) {

    const userRef: AngularFirestoreDocument<Student> = this.afs.doc(`users/${user.uid}`);

    const data: Student = {
      uid: user.uid,
      email: user.email || null,
      photoURL: 'http://static.wixstatic.com/media/1dd1d6_3f96863fc9384f60944fd5559cab0239.png_srz_300_300_85_22_0.50_1.20_0.00_png_srz',
      name: user.name,
      surname: user.name
    }
    return userRef.set(data)

  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => this.handleError(error) );
  }
  
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error) )
  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
}