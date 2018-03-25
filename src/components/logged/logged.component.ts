import { Component } from '@angular/core';
import {FunctionsService} from '../../app/functions.service';
import {AuthService} from '../../app/auth.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent {

  constructor(public authService: AuthService, public functionsService: FunctionsService) {  }

}
