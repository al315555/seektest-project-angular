import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { FunctionsService } from './functions.service';
import { User } from './core/User';
import { AngularFirestore, AngularFirestoreDocument, } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireObject, AngularFireList, snapshotChanges } from 'angularfire2/database';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from './core/notify.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { switchMap, retry } from 'rxjs/operators';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Experiment } from '../models/experiment';
import { Inscription } from '../models/inscription';
import {element} from 'protractor';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { Group } from '../models/group';
import { GroupsService } from './groups.service';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Injectable()
export class ExperimentsService {
  error: boolean;
  errorMessage: string;



  constructor(public db: AngularFireDatabase, public groupsService: GroupsService) { }

  getAllExperimentsOrderedByTitle() {
    return this.db.list('experiments/', ref => ref.orderByChild('title'));
  }

  getAllExperiments(limit: number) {
    if (limit === -1) {
      return this.db.list('experiments/', ref => ref.orderByChild('datePublished'));
    } else {
      return this.db.list('experiments/', ref => ref.orderByChild('datePublished').limitToLast(limit));
    }

  }

  getExperimentsByTitle(byTitle: string, limit: number) {
    if (byTitle != null && byTitle !== '') {
      return this.db.list('experiments/', ref => ref.orderByChild('title').startAt(byTitle));
    } else {
      return this.getAllExperiments(limit);
    }
  }

  getMyExperiments() {
    const user = localStorage.getItem('uid_usuario');
    console.log(user);
    if (user != null) {
      return this.db.list('experiments/', ref => ref.orderByChild('uidPublisher').equalTo(user));
    }
    return null;
  }

  getMyGroupExperiments(): Experiment[] {
    const exps = new Array();
    const user = localStorage.getItem('uid_usuario');
    this.db.list('groups/').valueChanges().take(1).toPromise().then((value) => {
      if (value !== undefined) {
        value.forEach((val: Group) => {
          if (val.researchers !== undefined) {
            if (val.researchers.includes(user)) {
              val.researchers.forEach((researcher) => {
                console.log(researcher);
                this.db.list('experiments/', ref => ref.orderByChild('uidPublisher').equalTo(researcher))
                .valueChanges().take(1).toPromise().then((expVal) => {
                  expVal.forEach((exp: Experiment) => {
                    if (exp !== undefined) {
                      exps.push(exp);
                    }
                  });
                });
              });
              return exps;
            }
          }
        });
      }
      });
    return exps;
  }

  deleteExperiment(expKey: string) {
    this.db.list('experiments/' + expKey).remove();
    const refExperiments = this.db.list('experimentsAndUsers/',
        ref => ref.orderByChild('experimentKey').equalTo(expKey));
    refExperiments.remove();
  }

  addExperiment(experiment: Experiment) {
    return this.db.list('experiments/').push(
      experiment
    );
  }

  updateExeriment(key: string, experiment: Experiment) {
    return this.db.list('experiments/').update(key,
      experiment
    );
  }

  addInscriptionToExperiment(newInscription: Inscription, experiment: Experiment) {
    // const newPostKey = firebase.database().ref().child('posts').push().key;

    firebase.database().ref('experiments/' + experiment.key)
      .set({
        datePublished: experiment.datePublished,
        dates: experiment.dates,
        description: experiment.description,
        duration: experiment.duration,
        numberParticipants: experiment.numberParticipants,
        numberVotaciones: experiment.numberVotaciones,
        mediaValoracion: experiment.mediaValoracion,
        place: experiment.place,
        placeLatLon: experiment.placeLatLon,
        title: experiment.title,
        uidPublisher: experiment.uidPublisher,
        inscriptions: experiment.inscriptions
      }).then(value => { console.log('Anyadida inscription'); });
    firebase.database().ref('experimentsAndUsers/').push({
        userUidInscripted: newInscription.uid,
        experimentKey: experiment.key
    });
  }

  /*
    * En este método se filtran los experimentos que aparecen en la tabla experimentsAndUsers
    * cogiendo los experimentos que aparezcan relacionados con el uid de usuario
    * en dicha tabla.
    * */
  obtenerExperimentosInscrito() {
    const items = []; const exps = [];
    const user = localStorage.getItem('uid_usuario');
    const refKeys = this.db.list('experimentsAndUsers/',
        ref => ref.orderByChild('userUidInscripted').equalTo(user));
    refKeys.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe((value) => {
      value.forEach( item => {
        const experimentKey = item.experimentKey;
        const refExperiments = this.db.list('experiments/', ref => ref.orderByKey().equalTo(experimentKey));
        refExperiments.snapshotChanges().map(actiones => {
          return actiones.map(actione => ({ key: actione.key, ...actione.payload.val() }));
        }).subscribe((valueExp) => {
          valueExp.forEach( neu => {
            exps.push(neu);
          });
          return valueExp.map(itema => itema.key);
        });
      });
      return value.map(item => item.key);
    });
    console.log(exps);
    return exps;
  }
  obtenerUsuariosInscritosAExperimento(expKey: string) {
    const items = []; const exps = [];
    const refKeys = this.db.list('experimentsAndUsers/',
      ref => ref.orderByChild('experimentKey').equalTo(expKey));
    refKeys.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe((value) => {
      value.forEach( item => {
        const userKey = item.userUidInscripted;
        console.log(userKey);
        const refExperiments = this.db.list('users/', ref => ref.orderByChild('_uid').equalTo(userKey));
        refExperiments.snapshotChanges().map(actiones => {
          return actiones.map(actione => ({ key: actione.key, ...actione.payload.val() }));
        }).subscribe((valueExp) => {
          console.log(valueExp);
          valueExp.forEach( neu => {
            console.log(neu);
            exps.push(neu);
          });
          return valueExp.map(itema => itema.key);
        });
      });
      return value.map(item => item.key);
    });
    console.log(exps);
    return exps;
  }

  updateInscriptionsOfExperiment(experiment: Experiment) {
    firebase.database().ref('experiments/' + experiment.key)
      .set({
        datePublished: experiment.datePublished,
        dates: experiment.dates,
        description: experiment.description,
        duration: experiment.duration,
        numberParticipants: experiment.numberParticipants,
        numberVotaciones: experiment.numberVotaciones,
        mediaValoracion: experiment.mediaValoracion,
        place: experiment.place,
        placeLatLon: experiment.placeLatLon,
        title: experiment.title,
        uidPublisher: experiment.uidPublisher,
        inscriptions: experiment.inscriptions
      }).then(value => { console.log('editadas inscriptiones'); });
  }

  /** Si devuleve -1 es que no hay votación del usuario**/
  getMyVoteToExperiment(experiment: Experiment): number {
    const dataReturn = {number: -1};
    const refKeys = this.db.list('experimentsAndUsers/',
      ref => ref.orderByChild('experimentKey').equalTo(experiment.key));
    refKeys.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe((value) => {
      value.forEach(item => {
        if (item.uid ===  localStorage.getItem('uid_usuario')) {
          dataReturn.number = item.voteValue;
        }
      });
    });
    return dataReturn.number;
  }

  getExperimentByKey(key: string): any {
    let res: any = {};
    const ref = this.db.list('experiments/' + key);
    ref.snapshotChanges().map(actions => {
      return actions.map(action => (res = { key: action.key, ...action.payload.val() }));
    }).subscribe((value) => {

    });
    console.log(res);
    return res;
  }
}

