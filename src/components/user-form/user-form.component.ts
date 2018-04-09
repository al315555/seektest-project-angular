import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/auth.service';
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators, NgControlStatusGroup, AbstractControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {FunctionsService} from '../../app/functions.service';
import {User} from '../../app/core/User';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  signupForm: FormGroup;
  detailForm: FormGroup;

  userState;

  constructor(public fb: FormBuilder, private afs: AngularFirestore,
              public auth: AuthService, public functions: FunctionsService) { }

  areEqual(): boolean {
    return this.password.value === this.password2.value;
  }

  ngOnInit() {

    this.userState = this.auth.user.map(user => {
      if (user) {
        return user.displayName ? 'complete' : 'incomplete';
      }
    });

    // First Step
    this.signupForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
        ]
      ],
      'password': ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
        ]
      ],
      'password2': ['', [
        Validators.required
      ]]
    });

    // Second Step
    this.detailForm = this.fb.group({
      'name': ['', [ ]],
      'surname': ['', [ ] ],
      'fechaNacimiento': ['', [ ] ],
      'sexo': ['', [ ] ],
      'alergias': ['', [ ] ],
      'observacionesMedicas': ['', [ ] ],
      'infoAdicional': ['', [ ] ],
    });

  }


  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get password2() { return this.signupForm.get('password2'); }

  get name() { return this.detailForm.get('name'); }
  get surname() { return this.detailForm.get('surname'); }
  get fechaNacimiento() { return this.detailForm.get('fechaNacimiento'); }
  get sexo() { return this.detailForm.get('sexo'); }
  get alergias() { return this.detailForm.get('alergias'); }
  get observacionesMedicas() { return this.detailForm.get('observacionesMedicas'); }
  get infoAdicional() { return this.detailForm.get('infoAdicional'); }

  signup() {
    return this.auth.signup(this.email.value, this.password.value);
  }


  setUserInfo(user) {
   /*this.auth.updateUser(user, { name:  this.name.value, apellido:  this.surname.value,
      age:  this.age.value, alergias:  this.alergias.value, sexo: this.sexo.value,
      observacionesMedicas:  this.observacionesMedicas.value, infoAdicional:  this.infoAdicional.value } );
    */

    user.name = this.name.value;
    user.surname = this.surname.value;
    user.fechaNacimiento = this.fechaNacimiento.value;
    user.alergias = this.alergias.value;
    user.sexo = this.sexo.value;
    user.observacionesMedicas = this.observacionesMedicas.value;
    user.infoAdicional = this.infoAdicional.value;
    this.functions.changeShowMainPageToFalse();
    this.functions.changeToLogged();
    return this.auth.setUserDoc(user);
  }
  setName(user) {
    return this.auth.updateUser(user, { name:  this.name.value} );
  }
  setSurname(user) {
    return this.auth.updateUser(user, { surname:  this.surname.value } );
  }
  setFechaNacimiento(user) {
    return this.auth.updateUser(user, { age:  this.fechaNacimiento.value });
  }

  setAlergias(user) {
    return this.auth.updateUser(user, { alergias:  this.alergias.value });
  }
  setObservacionesMedicas(user) {
    return this.auth.updateUser(user, { observacionesMedicas:  this.observacionesMedicas.value });
  }
  setInfoAdicional(user) {
    return this.auth.updateUser(user, { infoAdicional:  this.infoAdicional.value });
  }

  goBackRegister() {
    this.functions.changeShowMainPageToTrue();
  }
}
