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
import {Experiment} from '../models/experiment';

@Injectable()
export class ExperimentsService {
  error: boolean;
  errorMessage: string;

  constructor(public db: AngularFireDatabase) {}

  getAllExperiments() {
    return this.db.list('experiments/', ref => ref.orderByChild('title'));
  }

}
