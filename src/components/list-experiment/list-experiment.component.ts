import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { FunctionsService } from '../../app/functions.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { NotifyService } from '../../app/core/notify.service';
import { User } from '../../app/core/User';
import { ExperimentsService } from '../../app/experiments.service';
import { getQueryValue } from '@angular/core/src/view/query';
import { Experiment } from '../../models/experiment';


@Component({
  selector: 'app-list-experiment',
  templateUrl: './list-experiment.component.html',
  styleUrls: ['./list-experiment.component.css']
})
export class ListExperimentComponent implements OnInit {

  @Input() type: number;

  items: any[] = null;
  itemsAll: any[] = null;

  item: any;
  itemDates: Date[];
  clicked: boolean;

  object: any;
  textoTitulo: string;
  numberLimit: number;

  op: number;

  constructor(public experimentService: ExperimentsService, public functions: FunctionsService) {
    this.textoTitulo = '';
    this.numberLimit = 2;
    this.clicked = false;
    this.item = new Experiment();
    this.itemDates = new Array();
  }

  ngOnInit() {
    console.log('get experimentos');
    this.getExperiments();
  }

  getExperiments() {
    if (this.type === 0 || this.type == null) {
      this.experimentService.getAllExperiments(this.numberLimit)
      .snapshotChanges().map(actions => {
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      }).subscribe((value) => {
        this.items = value;
        this.items.reverse();
        this.itemsAll = this.items;
        return value.map(item => item.key);
      });
    } else if (this.type === 1) {
      this.experimentService.getMyExperiments()
      .snapshotChanges().map(actions => {
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      }).subscribe((value) => {
        this.items = value;
        this.items.reverse();
        this.itemsAll = this.items;
        return value.map(item => item.key);
      });
    } else if (this.type === 2) {
      this.items = this.experimentService.obtenerExperimentosInscrito();
      this.items.reverse();
      this.itemsAll = this.items;
    }
  }

  buscarExperimentos() {

    if (this.op === 0) {
      this.items.sort((a, b) => this.comparePubliDate(a, b));
    } else if (this.op === 1) {
      this.items.sort((a, b) => this.compareDuration(a, b));
    }

    if (this.textoTitulo !== '') {
      this.items = this.itemsAll;
      const it: any[] = new Array();
      this.items.forEach(element => {
        console.log(this.compareTitle(element));
        if (this.compareTitle(element)) {
          it.push(element);
        }
        this.items = it;
      });
    } else {
      this.items = this.itemsAll;
    }

  }

  compareTitle(elem: Experiment) {
    const elemClean = this.getCleanedString(elem.title);
    const titleClean = this.getCleanedString(this.textoTitulo);
    return elemClean.includes(titleClean.toString());
  }

  comparePubliDate(a: Experiment, b: Experiment): number {
    if (a.datePublished >= b.datePublished) {
      return -1;
    } else {
      if (a.datePublished < b.datePublished) {
        return 1;
      }
    }
    return 0;
  }

  compareDuration(a: Experiment, b: Experiment): number {
    if (a.duration >= b.duration) {
      return 1;
    } else {
      if (a.duration < b.duration) {
        return -1;
      }
    }
    return 0;
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

  infoExpe(item: any) {
    console.log(item.key);
    this.clicked = true;
    this.item = item;
    this.itemDates = new Array();
    item.dates.forEach(value => {
      const d = new Date();
      d.setTime(value);
      this.itemDates.push(d);
    });
  }

  masResultados() {
    this.numberLimit += 5;
    this.getExperiments();
    this.buscarExperimentos();
  }
}
