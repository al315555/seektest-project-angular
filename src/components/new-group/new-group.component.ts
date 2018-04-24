import {Component, OnInit, ViewChild} from '@angular/core';
import {Group} from '../../models/group';
import {GroupsService} from '../../app/groups.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {MessageToastComponent} from '../message-toast/message-toast.component';
import {MessageToast} from '../../models/message-toast';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent {
  @ViewChild(MessageToastComponent) messageToast: MessageToastComponent;

  messages: MessageToast[];
  name: String;
  buttonEnabled: boolean;

  constructor(private afAuth: AngularFireAuth) { //private groupsService: GroupsService  - añadir en constructor cuando funcione
    this.buttonEnabled = false;
    this.messages = [];
  }

  changeName() {
    if (this.name === '') {
      this.buttonEnabled = false;
    } else {
      this.buttonEnabled = true;
    }
  }

  clearFields() {
    this.name = '';
    this.buttonEnabled = false;
  }

  addGrupo() {
    const grp: Group = new Group();
    grp.name = this.name.toString();
    this.groupsService.addGroup(grp).then((value) => {
        this.clearFields();
        this.messageToast.pushMessage({
          title: 'Grupo creado!', description: 'El grupo ha sido creado correctamente',
          type: 'success'
        });
      }
    );
  }
}
