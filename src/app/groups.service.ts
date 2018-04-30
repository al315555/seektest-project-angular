import {Injectable} from '@angular/core';
import {Group} from '../models/group';
import {AngularFireDatabase} from 'angularfire2/database';

import { AngularFireDatabaseModule } from 'angularfire2/database';



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
import {isLineBreak} from 'codelyzer/angular/sourceMappingVisitor';


@Injectable()
export class GroupsService {

  constructor(public db: AngularFireDatabase) { }

  addGroup(group: Group): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.db.list('groups/').push(
          group)
          .then(value => resolve(true));
      } catch (e) {
        return reject(e);
      }
    });

  }
  getAllGrups(limit: number) {
    return this.db.list('groups/', ref => ref.orderByChild('dateCreated').limitToLast(limit));
  }

  showMyGroup(): Group {
    const group = new Group();
    const user = localStorage.getItem('uid_usuario');
    const refKeys = this.db.list('groups/');
    refKeys.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe((value) => {
      value.forEach( item => {
        const researchers = item.researchers;
          researchers.forEach( researcher => {
            if (user === researcher) {
              group.researchers = item.researchers;
              group.dateCreated = item.dateCreated;
              group.nombre = item.nombre;
              group.description = item.description;
              console.log(group);
            }
          });
        return value.map(item2 => item2.key);
    }); });
    console.log(group);
    return group;
  }
}
