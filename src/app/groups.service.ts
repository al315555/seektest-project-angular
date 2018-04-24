import {Injectable} from '@angular/core';
import {Group} from '../models/group';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class GroupsService {

  constructor(public db: AngularFireDatabase) { }

  addGroup(group: Group) {
    return this.db.list('groups/').push(
      group
    );
  }
}
