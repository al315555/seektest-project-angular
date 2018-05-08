import {Component, OnInit} from '@angular/core';
import {FunctionsService} from '../../app/functions.service';
import {AuthService} from '../../app/auth.service';
import {GroupsService} from '../../app/groups.service';
import {Group} from '../../models/group';
import {GroupCardComponent} from '../group-card/group-card.component';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.css']
})
export class ListGroupsComponent implements OnInit {

  items: Group[] = null;
  itemsAll: Group[] = null;
  textoTitulo: string;
  buttonEnabled: boolean;
  grupoActual: Group;

  constructor(private groupsService: GroupsService, private functionsService: FunctionsService) {
    this.textoTitulo = '';
    this.buttonEnabled = false;
  }

  goToNewGroup() {
    this.functionsService.SelectNewGroup();
  }

  ngOnInit() {
    this.getGrupos();
  }

  getGrupos() {
    const group =  new Group();
    const user = localStorage.getItem('uid_usuario');
    this.groupsService.getAllGrups()
    .snapshotChanges().map(actions => {
      return actions.map(action => ({key: action.key, ...action.payload.val()}));
    }).subscribe((value) => {
      if (value !== undefined) {
      this.items = value;
      this.items.reverse();
      this.itemsAll = this.items;
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
          this.items.forEach(element => {
            if (element.key === this.grupoActual.key || element.nombre === undefined) {
              this.items.splice(this.items.indexOf(element), 1);
            }
          });
          return value.map(item2 => item2.key);
        });
      }
    });
    this.grupoActual = group;
  }


  buscarGrupo() {
    if (this.textoTitulo !== '') {
      this.items = this.itemsAll;
      const it: any[] = new Array();
      this.items.forEach(element => {
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

  borrarGrupoActual(): void {
    this.grupoActual = new Group();
  }

  actualizarGrupoActual(grupo: Group): void {
    this.grupoActual = grupo;
  }
}
