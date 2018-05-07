import {Injectable} from '@angular/core';
import {Group} from '../models/group';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class GroupsService {

  constructor(public db: AngularFireDatabase) {
  }

  addGroup(group: Group): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.db.list('groups/').push(
          group)
          .then(value => {
            console.log(value);
            resolve(true);
          });
      } catch (e) {
        return reject(e);
      }
    });

  }

  getAllGrups() {
    return this.db.list('groups/', ref => ref.orderByChild('dateCreated'));
  }
  /*
  Not used

  showMyGroup(): Group {
    const group =  new Group();
    const user = localStorage.getItem('uid_usuario');
    const refKeys = this.db.list('groups/');
    refKeys.snapshotChanges().map(actions => {
      return actions.map(action => ({key: action.key, ...action.payload.val()}));
    }).subscribe((value) => {
      if (value !== undefined) {
        value.forEach(item => {
          const researchers = item.researchers;
          if (researchers !== undefined) {
            researchers.forEach(researcher => {
              if (user === researcher) {
                group.researchers = item.researchers;
                group.dateCreated = item.dateCreated;
                group.nombre = item.nombre;
                group.description = item.description;
                group.key = item.key;
              }
            });
          }
          return value.map(item2 => item2.key);
        });
      }
    });
    console.log(group);
    return group;
  }
  */

  updateGroupData(group: Group) {
    firebase.database().ref('groups/' + group.key).set({
      dateCreated: group.dateCreated,
      description: group.description,
      nombre: group.nombre,
      researchers: group.researchers
    }).then(result => console.log('Grupo actualizado correctamente. ::: ' + result));
  }
}
