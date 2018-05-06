import { Component, OnInit } from '@angular/core';
import {FunctionsService} from '../../app/functions.service';
import {AuthService} from '../../app/auth.service';

@Component({
  selector: 'app-my-experiments-inscriptions',
  templateUrl: './my-experiments-inscriptions.component.html',
  styleUrls: [ './my-experiments-inscriptions.component.css']
})
export class MyExperimentsInscriptionsComponent implements OnInit {

  constructor(public authService: AuthService, public functionsService: FunctionsService) {  }

  ngOnInit() {
  }

}
