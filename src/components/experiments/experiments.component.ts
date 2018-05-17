import { Component } from '@angular/core';
import {FunctionsService} from '../../app/functions.service';
import {AuthService} from '../../app/auth.service';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent {

  constructor(public authService: AuthService, public functionsService: FunctionsService) {
    console.log('resultado ' + this.authService.getUserEmail(localStorage.getItem('uid_usuario')));
  }

}
