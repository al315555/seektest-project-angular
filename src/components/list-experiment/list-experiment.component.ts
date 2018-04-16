import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList, snapshotChanges} from 'angularfire2/database';
import {FunctionsService} from '../../app/functions.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {NotifyService} from '../../app/core/notify.service';
import {User} from '../../app/core/User';
import {ExperimentsService} from '../../app/experiments.service';
import {getQueryValue} from '@angular/core/src/view/query';
import {Experiment} from '../../models/experiment';

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

  constructor(public experimentService: ExperimentsService , public functions: FunctionsService) {
     this.textoTitulo = ''; this.numberLimit = 2; 
     this.clicked = false;
     this.item = new Experiment(); this.itemDates = new Array();
    }

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
      this.buscarExperimentos();
    }
}
