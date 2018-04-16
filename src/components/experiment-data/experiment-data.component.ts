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
import {SuiModalService, TemplateModalConfig, ModalTemplate} from "ng2-semantic-ui";


@Component({
  selector: 'app-experiment-data',
  templateUrl: './experiment-data.component.html',
  styleUrls: ['./experiment-data.component.css']
})
export class ExperimentDataComponent implements OnInit {
  
  modal: any;

  @Input() item: any;
  @Input() itemDates: Date[];

  noDataString = 'sin datos definidos';

  @ViewChild('modalTemplate')
    public modalTemplate:ModalTemplate<null, string, string>

  constructor(public experimentService: ExperimentsService , public functions: FunctionsService) {}

  ngOnInit() {}
  

}
