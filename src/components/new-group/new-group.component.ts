import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {Group} from '../../models/group';
// import {GroupsService} from '../../app/groups.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {MessageToastComponent} from '../message-toast/message-toast.component';
import {MessageToast} from '../../models/message-toast';
import {AngularFireDatabase} from 'angularfire2/database';
import {ExperimentsService} from '../../app/experiments.service';
import {GroupsService} from '../../app/groups.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})

export class NewGroupComponent implements OnInit {
  @ViewChild(MessageToastComponent) messageToast: MessageToastComponent;

  messages: MessageToast[];
  name: string;
  descripcion: string;
  buttonEnabled: boolean;
  textoTitulo: string;
  numberLimit: number;
  op: number;
  items: any[] = null;
  itemsAll: any[] = null;

  constructor(private afAuth: AngularFireAuth, private groupsService: GroupsService) {
    this.name = '';
    this.descripcion = '';
    this.buttonEnabled = false;
    this.messages = new Array();
    this.numberLimit = 5;
  }

  ngOnInit() {

  }

  changeBoton() {
    if (this.descripcion !== '' && this.name !== '') {
      this.buttonEnabled = true;
    } else {
      this.buttonEnabled = false;
    }
  }

  clearFields() {
    this.name = '';
    this.buttonEnabled = false;
  }

  addGrupo() {
    console.log('Adding grupo');
    const researchersOfGroup = new Array();
    researchersOfGroup.push(localStorage.getItem('uid_usuario'));
    const grp: Group = new Group();
    grp.nombre = this.name.toString();
    grp.dateCreated = new Date().getTime();
    grp.description = this.descripcion;
    grp.researchers = researchersOfGroup;
    this.groupsService.addGroup(grp).then((value) => {
        this.clearFields();
        this.messageToast.pushMessage({
          title: '¡Grupo creado!', description: 'El grupo ha sido creado correctamente',
          type: 'success'
        });
      }
    );
  }

}
