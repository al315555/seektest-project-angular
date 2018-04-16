import { Component, OnInit } from '@angular/core';
import {FunctionsService} from '../../app/functions.service';
import {AuthService} from '../../app/auth.service';

@Component({
  selector: 'app-my-experiments',
  templateUrl: './my-experiments.component.html',
  styleUrls: ['./my-experiments.component.css']
})
export class MyExperimentsComponent implements OnInit {

  constructor(public authService: AuthService, public functionsService: FunctionsService) {  }

  ngOnInit() {
  }

}
