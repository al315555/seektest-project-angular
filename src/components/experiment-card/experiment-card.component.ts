import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList, snapshotChanges} from 'angularfire2/database';
import {FunctionsService} from '../../app/functions.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {NotifyService} from '../../app/core/notify.service';
import {User} from '../../app/core/User';
import {Experiment} from '../../models/experiment';
import {ExperimentsService} from '../../app/experiments.service';
import {getQueryValue} from '@angular/core/src/view/query';

@Component({
  selector: 'app-experiment-card',
  templateUrl: './experiment-card.component.html',
  styleUrls: ['./experiment-card.component.css']
})
export class ExperimentCardComponent implements OnInit {


  items: any[] = null;
  clicked: boolean;
  item: any;
  itemDates: Date[];
  object: any;
  textoTitulo: string;
  numberLimit: number;

  constructor(public experimentService: ExperimentsService , public functions: FunctionsService) {
    this.item = new Experiment(); this.itemDates = new Array(); this.textoTitulo = ''; this.numberLimit = 2; }

  ngOnInit() {
    this.experimentService.getAllExperiments(this.numberLimit)
      .snapshotChanges().map(actions => {
      return actions.map(action => ({key: action.key, ...action.payload.val()}));
    }).subscribe((value) => {
        // console.log(value.map(item => item.key));
        this.items = value;
        return value.map(item => item.key);
      });
    }
    info(item: any) {
      console.log(item.key);
      this.clicked = true;
      this.item = item;
      item.dates.forEach(value => {
        const d = new Date();
        d.setTime(value);
        this.itemDates.push(d);
      });
    }
    buscarExperimentos() {
      console.log(this.textoTitulo);
      this.experimentService.getExperimentsByTitle(this.textoTitulo, this.numberLimit)
        .snapshotChanges().map(actions => {
        return actions.map(action => ({key: action.key, ...action.payload.val()}));
      }).subscribe((value) => {
        // console.log(value.map(item => item.key));
        this.items = value;
        return value.map(item => item.key);
      });
      console.log(this.items);
    }

    masResultados() {
      this.numberLimit += 5;
      this.buscarExperimentos();
    }
}
