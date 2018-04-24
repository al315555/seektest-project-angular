import {Injectable} from '@angular/core';
import {Group} from '../models/group';
import {AngularFireDatabase} from 'angularfire2/database';

import { AngularFireDatabaseModule } from 'angularfire2/database'



import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { FunctionsService } from './functions.service';
import { User } from './core/User';
import { AngularFirestore, AngularFirestoreDocument, } from 'angularfire2/firestore';
import { AngularFireObject, AngularFireList, snapshotChanges } from 'angularfire2/database';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from './core/notify.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { switchMap } from 'rxjs/operators';
import { Experiment } from '../models/experiment';
import { Inscription } from '../models/inscription';

@Injectable()
export class GroupsService {

  constructor(public db: AngularFireDatabase) { }

  addGroup(group: Group) {
    return this.db.list('groups/').push(
      group
    );
  }
  getAllGrups(limit: number) {
    return this.db.list('grupos/', ref => ref.orderByChild('datePublished').limitToLast(limit));
  }
}
