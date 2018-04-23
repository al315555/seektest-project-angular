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

import { switchMap } from 'rxjs/operators';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Experiment } from '../models/experiment';
import { Inscription } from '../models/inscription';

@Injectable()
export class ExperimentsService {
  error: boolean;
  errorMessage: string;

  constructor(public db: AngularFireDatabase) { }

  getAllExperimentsOrderedByTitle() {
    return this.db.list('experiments/', ref => ref.orderByChild('title'));
  }

  getAllExperiments(limit: number) {
    return this.db.list('experiments/', ref => ref.orderByChild('datePublished').limitToLast(limit));
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

  deleteExperiment(expKey: string) {
    this.db.list('experiments/' + expKey).remove();
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
    const itemArray = new Array();
    if (experiment.inscriptions) {
      experiment.inscriptions.forEach(value => {
        itemArray.push(value);
      });
    }
    itemArray.push(newInscription);
    experiment.inscriptions = itemArray;
    firebase.database().ref('experiments/' + experiment.key)
      .set({
        datePublished: experiment.datePublished,
        dates: experiment.dates,
        description: experiment.description,
        duration: experiment.duration,
        numberParticipants: experiment.numberParticipants,
        place: experiment.place,
        placeLatLon: experiment.placeLatLon,
        title: experiment.title,
        uidPublisher: experiment.uidPublisher,
        inscriptions: experiment.inscriptions
      }).then(value => { console.log('Anyadida inscription'); });
  }

  updateInscriptionsOfExperiment(experiment: Experiment) {
    firebase.database().ref('experiments/' + experiment.key)
      .set({
        datePublished: experiment.datePublished,
        dates: experiment.dates,
        description: experiment.description,
        duration: experiment.duration,
        numberParticipants: experiment.numberParticipants,
        place: experiment.place,
        placeLatLon: experiment.placeLatLon,
        title: experiment.title,
        uidPublisher: experiment.uidPublisher,
        inscriptions: experiment.inscriptions
      }).then(value => { console.log('Anyadida inscription'); });
  }
}

