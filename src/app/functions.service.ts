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
  gruposSelected: boolean;
  myexperimentsSelected: boolean;
  experimentsSelected: boolean;
  newExperimentSelected: boolean;
  newGroupSelected: boolean;
  reset: boolean;
  myexperimentsInscriptionsSelected: boolean;

  constructor() {
    this.error = false;
    if (localStorage.getItem('status_showMainPage') == null) {
      this.showMainPage = true;
    } else {
      this.showMainPage = (localStorage.getItem('status_showMainPage') === 'true');
    }

    if (localStorage.getItem('status_isLogged') == null) {
      this.isLogged = false;
    } else {
      this.isLogged = (localStorage.getItem('status_isLogged') === 'true');
    }

    this.perfilSelected = false;
    this.gruposSelected = false;
    this.experimentsSelected = true;
    this.myexperimentsSelected = false;
    this.newExperimentSelected = false;
    this.newGroupSelected = false;
    this.reset = false;
    this.myexperimentsInscriptionsSelected = false;
  }

  selectPerfil() {
    this.myexperimentsInscriptionsSelected = false;
    this.perfilSelected = true;
    this.gruposSelected = false;
    this.myexperimentsSelected = false;
    this.newExperimentSelected = false;
    this.experimentsSelected = false;
    this.newGroupSelected = false;
  }

  selectGrupos() {
    this.myexperimentsInscriptionsSelected = false;
    this.perfilSelected = false;
    this.gruposSelected = true;
    this.myexperimentsSelected = false;
    this.newExperimentSelected = false;
    this.experimentsSelected = false;
    this.newGroupSelected = false;
  }

  selectExperimentos() {
    this.myexperimentsInscriptionsSelected = false;
    this.perfilSelected = false;
    this.gruposSelected = false;
    this.myexperimentsSelected = false;
    this.newExperimentSelected = false;
    this.experimentsSelected = true;
    this.newGroupSelected = false;
  }

  selectMyExperiments() {
    this.perfilSelected = false;
    this.gruposSelected = false;
    this.myexperimentsSelected = true;
    this.newExperimentSelected = false;
    this.experimentsSelected = false;
    this.newGroupSelected = false;
    this.myexperimentsInscriptionsSelected = false;
  }

  selectMyExperimentsInscriptions() {
    this.perfilSelected = false;
    this.gruposSelected = false;
    this.myexperimentsSelected = false;
    this.newExperimentSelected = false;
    this.experimentsSelected = false;
    this.newGroupSelected = false;
    this.myexperimentsInscriptionsSelected = true;
  }

  selectNewExperiment() {
    this.perfilSelected = false;
    this.gruposSelected = false;
    this.myexperimentsSelected = false;
    this.newExperimentSelected = true;
    this.experimentsSelected = false;
    this.newGroupSelected = false;
    this.myexperimentsInscriptionsSelected = false;
  }

  SelectNewGroup() {
    this.myexperimentsInscriptionsSelected = false;
    this.perfilSelected = false;
    this.gruposSelected = false;
    this.myexperimentsSelected = false;
    this.newExperimentSelected = false;
    this.experimentsSelected = false;
    this.newGroupSelected = true;
  }
  changeShowMainPageToTrue() {
    this.myexperimentsInscriptionsSelected = false;
    this.perfilSelected = false;
    this.gruposSelected = false;
    this.myexperimentsSelected = false;
    this.newExperimentSelected = false;
    this.experimentsSelected = false;
    this.newGroupSelected = false;
    this.showMainPage = true;
    this.isLogged = false;
    localStorage.setItem('status_showMainPage', 'true');
    localStorage.setItem('status_isLogged', 'false');
  }

  changeShowMainPageToFalse() {
    this.showMainPage = false;
    localStorage.setItem('status_showMainPage', 'false');
  }

  changeToLogged() {
    this.isLogged = true;
    localStorage.setItem('status_isLogged', 'true');
  }
  changeToNotLogged() {
    this.isLogged = false;
    localStorage.setItem('status_isLogged', 'false');
  }

  changeToResetPassword() {
    console.log('reset true');
    this.reset = true;
    this.myexperimentsInscriptionsSelected = false;
    this.perfilSelected = false;
    this.gruposSelected = false;
    this.myexperimentsSelected = false;
    this.newExperimentSelected = false;
    this.experimentsSelected = false;
    this.newGroupSelected = false;
    this.showMainPage = false;
    this.isLogged = false;
  }
  changeToNotResetPassword() {
    this.reset = false;
    this.showMainPage = true;
  }



  changeUserLogged(user: Observable<firebase.User>): void {
    this.user = user;
  }
}
