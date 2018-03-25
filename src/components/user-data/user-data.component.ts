import { Component } from '@angular/core';
import { AuthService } from '../../app/auth.service';
import {FunctionsService} from '../../app/functions.service';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {

  constructor(public authService: AuthService, public functions: FunctionsService) {}

  goBackToExperiments() {
    this.functions.selectExperimentos();
  }
}
