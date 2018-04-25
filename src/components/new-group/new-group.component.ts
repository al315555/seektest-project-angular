import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {Group} from '../../models/group';
// import {GroupsService} from '../../app/groups.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {MessageToastComponent} from '../message-toast/message-toast.component';
import {MessageToast} from '../../models/message-toast';
import {AngularFireDatabase} from 'angularfire2/database';
import { ExperimentsService } from '../../app/experiments.service';




@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})

export class NewGroupComponent implements OnInit {
  @ViewChild(MessageToastComponent) messageToast: MessageToastComponent;

  messages: MessageToast[];
  name: String;
  buttonEnabled: boolean;
  textoTitulo: string;
  numberLimit: number;
  op: number;
  items: any[] = null;
  itemsAll: any[] = null;
  constructor(public experimentService: ExperimentsService, private afAuth: AngularFireAuth, private groupsService: GroupsService) {
    // private groupsService: GroupsService  - añadir en constructor cuando funcione
    this.textoTitulo = '';
    this.buttonEnabled = false;
    this.messages = [];
    this.numberLimit = 5;
  }

  ngOnInit() {
    console.log('Get grupos');
    this.getGrupos();
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
    console.log('Get grupos');
    this.getGrupos();

    /* const grp: Group = new Group();
    grp.name = this.name.toString();
    this.groupsService.addGroup(grp).then((value) => {
        this.clearFields();
        this.messageToast.pushMessage({
          title: 'Grupo creado!', description: 'El grupo ha sido creado correctamente',
          type: 'success'
        });
      }
    );*/
  }
  buscarGrupo() {
    if (this.textoTitulo !== '') {
      this.items = this.itemsAll;
      const it: any[] = new Array();
      this.items.forEach(element => {
        // console.log(this.compareTitle(element));
        if (this.compareTitle(element)) {
          it.push(element);
        }
        this.items = it;
      });
    } else {
      this.items = this.itemsAll;
    }
    console.log(this.items);
  }
  compareTitle(elem: Group) {
    const elemClean = this.getCleanedString(elem.nombre);
    const titleClean = this.getCleanedString(this.textoTitulo);
    return elemClean.includes(titleClean.toString());
  }

  getCleanedString(cadena: String) {
    const specialChars = '!@#$^&%*()+=-[]\/{}|:<>?,.';
    console.log(cadena);
    for (let i = 0; i < specialChars.length; i++) {
      cadena = cadena.replace(new RegExp('\\' + specialChars[i], 'gi'), '');
    }

    cadena = cadena.toLowerCase();
    cadena = cadena.replace(/á/gi, 'a');
    cadena = cadena.replace(/é/gi, 'e');
    cadena = cadena.replace(/í/gi, 'i');
    cadena = cadena.replace(/ó/gi, 'o');
    cadena = cadena.replace(/ú/gi, 'u');
    cadena = cadena.replace(/ñ/gi, 'n');
    return cadena;
  }

  getGrupos() {
     this.experimentService.getAllGrups(this.numberLimit)
      .snapshotChanges().map(actions => {
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      }).subscribe((value) => {
        this.items = value;
        this.items.reverse();
        this.itemsAll = this.items;
        console.log('grupos: ', this.itemsAll);
        return value.map(item => item.key);
      });
  }
}
