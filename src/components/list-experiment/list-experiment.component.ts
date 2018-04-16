import { Component, OnInit } from '@angular/core';
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

  items: any[] = null;

  item: any;
  itemDates: Date[];
  clicked: boolean;

  object: any;
  textoTitulo: string;
  numberLimit: number;

  op:number;

  constructor(public experimentService: ExperimentsService, public functions: FunctionsService) {
    this.textoTitulo = ''; this.numberLimit = 2;
    this.clicked = false;
    this.item = new Experiment(); this.itemDates = new Array();
  }

  ngOnInit() {
    this.getExperiments();
  }

  getExperiments(){
    this.experimentService.getAllExperiments(this.numberLimit)
      .snapshotChanges().map(actions => {
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      }).subscribe((value) => {
        this.items = value;
        this.items.reverse();
        return value.map(item => item.key);
      });
  }

  buscarExperimentos() {
    if(this.op == 0){
      this.items.sort((a,b) => this.comparePubliDate(a,b));
    }else if(this.op == 1){
      this.items.sort((a,b) => this.compareDuration(a,b));
    }
    if(this.textoTitulo != ""){
      this.items.sort((a, b) => this.compareTitle(a, b));
    }
    
  }

  compareTitle(a: Experiment, b: Experiment): number {
    var textLowCas: string = this.getCleanedString(this.textoTitulo).toString();
    if (this.getCleanedString(a.title).includes(textLowCas) && !this.getCleanedString(b.title).includes(textLowCas)) {
      return -1;
    } else {
      if (!this.getCleanedString(a.title).includes(textLowCas) && this.getCleanedString(b.title).includes(textLowCas)) {
        return 1;
      }
    }
    return 0;
  }

  comparePubliDate(a: Experiment, b: Experiment): number {
    if(a.datePublished >= b.datePublished){
      return -1;
    }else{
      if(a.datePublished < b.datePublished)
        return 1;
    }
    return 0;
  }

  compareDuration(a: Experiment, b: Experiment): number {
    if(a.duration >= b.duration){
      return 1;
    }else{
      if(a.duration < b.duration)
        return -1;
    }
    return 0;
  }

  getCleanedString(cadena: String) {

    var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";

    for (var i = 0; i < specialChars.length; i++) {
      cadena = cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }

    cadena = cadena.toLowerCase();
    cadena = cadena.replace(/á/gi, "a");
    cadena = cadena.replace(/é/gi, "e");
    cadena = cadena.replace(/í/gi, "i");
    cadena = cadena.replace(/ó/gi, "o");
    cadena = cadena.replace(/ú/gi, "u");
    cadena = cadena.replace(/ñ/gi, "n");
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
