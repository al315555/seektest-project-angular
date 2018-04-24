import {Component} from '@angular/core';
import {FunctionsService} from '../../app/functions.service';
import {AuthService} from '../../app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  itemString = 'ui item';
  itemActiveString = 'ui item pink active';
  titleHeader = 'SeekTest';

  miPerfilItem = this.itemString;
  gruposItem = this.itemString;
  misExperimentosItem = this.itemString;
  experimentosItem = this.itemActiveString;
  nuevoExperimentoItem = this.itemString;

  constructor(public authService: AuthService, public functionsService: FunctionsService) {
  }

  logout() {
    this.authService.logout();
  }

  selectPerfil() {
    this.functionsService.selectPerfil();
    this.miPerfilItem = this.itemActiveString;
    this.gruposItem = this.itemString;
    this.misExperimentosItem = this.itemString;
    this.experimentosItem = this.itemString;
    this.nuevoExperimentoItem = this.itemString;
  }

  selectGrupos(){
    this.functionsService.selectGrupos();
    this.gruposItem = this.itemActiveString;
    this.misExperimentosItem = this.itemString;
    this.experimentosItem = this.itemString;
    this.miPerfilItem = this.itemString;
    this.nuevoExperimentoItem = this.itemString;
  }

  goToMyExperiments() {
    this.functionsService.selectMyExperiments();
    this.misExperimentosItem = this.itemActiveString;
    this.gruposItem = this.itemString;
    this.experimentosItem = this.itemString;
    this.miPerfilItem = this.itemString;
    this.nuevoExperimentoItem = this.itemString;
  }

  goBackToExperiments() {
    this.functionsService.selectExperimentos();
    this.experimentosItem = this.itemActiveString;
    this.gruposItem = this.itemString;
    this.misExperimentosItem = this.itemString;
    this.miPerfilItem = this.itemString;
    this.nuevoExperimentoItem = this.itemString;
  }

  goToNewExperiment() {
    this.functionsService.selectNewExperiment();
    this.experimentosItem = this.itemString;
    this.miPerfilItem = this.itemString;
    this.gruposItem = this.itemString;
    this.misExperimentosItem = this.itemString;
    this.nuevoExperimentoItem = this.itemActiveString;
  }
}
