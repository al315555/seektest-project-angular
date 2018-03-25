import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class FunctionsService {
  user: Observable<firebase.User>;
  error: boolean;
  showMainPage: boolean;
  isLogged: boolean;
  perfilSelected: boolean;
  experimentsSelected: boolean;
  newExperimentSelected: boolean;

  constructor() {
    this.error = false;
    this.showMainPage = true;
    this.isLogged = false;
    this.perfilSelected = false;
    this.experimentsSelected = true;
    this.newExperimentSelected = false;
  }

  selectPerfil() {
    this.perfilSelected = true;
    this.newExperimentSelected = false;
    this.experimentsSelected = false;
  }

  selectExperimentos() {
    this.perfilSelected = false;
    this.newExperimentSelected = false;
    this.experimentsSelected = true;
  }

  selectNewExperiment() {
    this.perfilSelected = false;
    this.newExperimentSelected = true;
    this.experimentsSelected = false;
  }
  changeShowMainPageToTrue() {
    this.showMainPage = true;
  }

  changeShowMainPageToFalse() {
    this.showMainPage = false;
  }

  changeToLogged() {
    this.isLogged = true;
  }

  changeToNotLogged() {
    this.isLogged = false;
  }
}
