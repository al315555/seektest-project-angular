import {Component, OnInit} from '@angular/core';
import {ExperimentsService} from '../../app/experiments.service';
import {SuiModalService} from 'ng2-semantic-ui';
import {FunctionsService} from '../../app/functions.service';

@Component({
  selector: 'app-grupos-invest',
  templateUrl: './grupos-invest.component.html',
  styleUrls: ['./grupos-invest.component.css']
})
export class GruposInvestComponent implements OnInit {

  constructor(public functionsService: FunctionsService) {

  }

  ngOnInit() {
  }

  goToNewGroup() {
    this.functionsService.SelectNewGroup();
  }
}
