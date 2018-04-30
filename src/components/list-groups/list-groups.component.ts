import {Component, OnInit} from '@angular/core';
import {FunctionsService} from '../../app/functions.service';
import {AuthService} from '../../app/auth.service';
import {GroupsService} from '../../app/groups.service';
import {Group} from '../../models/group';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.css']
})
export class ListGroupsComponent implements OnInit {

  items: any[] = null;
  itemsAll: any[] = null;
  numberLimit: number;
  textoTitulo: string;
  buttonEnabled: boolean;
  grupoActual: Group;

  constructor(private groupsService: GroupsService) { this.numberLimit = 10;  this.textoTitulo = ''; this.buttonEnabled = false; }


  ngOnInit() {
    this.getGrupos();
    this.grupoActual = this.groupsService.showMyGroup();
  }

  getGrupos() {
    this.groupsService.getAllGrups(this.numberLimit)
      .snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe((value) => {
      this.items = value;
      this.items.reverse();
      this.itemsAll = this.items;
      return value.map(item => item.key);
    });
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
}
