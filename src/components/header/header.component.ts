import { Component } from '@angular/core';
import {FunctionsService} from '../../app/functions.service';
import {AuthService} from '../../app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  itemString = 'item';
  itemActiveString = 'item active';
  titleHeader = 'SeekTest';

  miPerfilItem = this.itemString;
  experimentosItem = this.itemActiveString;
  nuevoExperimentoItem = this.itemString;

  constructor(public authService: AuthService, public functionsService: FunctionsService) {  }

  logout() {
    this.authService.logout();
  }

  selectPerfil() {
    this.functionsService.selectPerfil();
    this.miPerfilItem = this.itemActiveString;
    this.experimentosItem = this.itemString;
    this.nuevoExperimentoItem = this.itemString;
  }
  goBackToExperiments() {
    this.functionsService.selectExperimentos();
    this.experimentosItem = this.itemActiveString;
    this.miPerfilItem = this.itemString;
    this.nuevoExperimentoItem = this.itemString;
  }

  goToNewExperiment() {
    this.functionsService.selectNewExperiment();
    this.experimentosItem = this.itemString;
    this.miPerfilItem = this.itemString;
    this.nuevoExperimentoItem = this.itemActiveString;
  }
}
