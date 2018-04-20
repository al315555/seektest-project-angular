import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AngularFireDatabase, AngularFireList, snapshotChanges} from 'angularfire2/database';
import {FunctionsService} from '../../app/functions.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {NotifyService} from '../../app/core/notify.service';
import {User} from '../../app/core/User';
import {Experiment} from '../../models/experiment';
import {ExperimentsService} from '../../app/experiments.service';
import {getQueryValue} from '@angular/core/src/view/query';
import {UserProfile} from '../../models/user-profile';

@Component({
  selector: 'app-inscripcio-experiment',
  templateUrl: './inscripcio-experiment.component.html',
  styleUrls: ['./inscripcio-experiment.component.css']
})
export class InscripcioExperimentComponent implements OnInit {
  @Input() experiment: Experiment;

  constructor() { 
    
  }

  ngOnInit() {
    
  }

  acceptarInscripcion(){
    console.log("componente incripcion: ", this.experiment.key)
  }

}
