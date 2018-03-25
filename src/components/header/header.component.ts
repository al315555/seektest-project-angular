import { Component } from '@angular/core';
import {FunctionsService} from '../../app/functions.service';
import {AuthService} from '../../app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  titleHeader = 'SeekTest';

  constructor(public authService: AuthService, public functionsService: FunctionsService) {  }

  logout() {
    this.authService.logout();
  }

  selectPerfil() {
    this.functionsService.selectPerfil();
  }
}
