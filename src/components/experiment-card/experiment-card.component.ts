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

  constructor(public experimentService: ExperimentsService , public functions: FunctionsService) {}

  ngOnInit() {
    this.experimentService.getAllExperiments()
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
      // $('.ui.modal').modal('show');
      // estooy intentado que esta zona despliegue el modal con los datos del experimento
    }
}
