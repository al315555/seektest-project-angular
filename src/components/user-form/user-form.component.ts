import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {FunctionsService} from '../../app/functions.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  signupForm: FormGroup;
  detailForm: FormGroup;

  userState;

  constructor(public fb: FormBuilder, public auth: AuthService, public functions: FunctionsService) { }

  ngOnInit() {

    this.userState = this.auth.user.map(user => {
      if (user) {
        return user.age ? 'complete' : 'incomplete';
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
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
        ]
      ],
      'region': ['', []],
    });

    // Second Step
    this.detailForm = this.fb.group({
      'name': ['', [ ]],
      'surname': ['', [ ] ],
      'age': ['', [ ] ],
      'sexo': ['', [ ] ],
      'alergias': ['', [ ] ],
      'observacionesMedicas': ['', [ ] ],
      'infoAdicional': ['', [ ] ],
    });

  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  get name() { return this.detailForm.get('name'); }
  get surname() { return this.detailForm.get('surname'); }
  get age() { return this.detailForm.get('age'); }
  get sexo() { return this.detailForm.get('sexo'); }
  get alergias() { return this.detailForm.get('alergias'); }
  get observacionesMedicas() { return this.detailForm.get('observacionesMedicas'); }
  get infoAdicional() { return this.detailForm.get('infoAdicional'); }

  signup() {
    return this.auth.emailSignUp(this.email.value, this.password.value);
  }

  setUserInfo(user) {
    this.auth.updateUser(user, { name:  this.name.value, surname:  this.surname.value,
      age:  this.age.value, alergias:  this.alergias.value, sexo: this.sexo.value,
      observacionesMedicas:  this.observacionesMedicas.value, infoAdicional:  this.infoAdicional.value } );
    this.functions.changeShowMainPageToFalse();
    this.functions.changeToLogged();
  }
  setName(user) {
    return this.auth.updateUser(user, { name:  this.name.value} );
  }
  setSurname(user) {
    return this.auth.updateUser(user, { surname:  this.surname.value } );
  }
  setAge(user) {
    return this.auth.updateUser(user, { age:  this.age.value });
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
