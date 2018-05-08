import {Component} from '@angular/core';
import {FunctionsService} from '../../app/functions.service';
import {AuthService} from '../../app/auth.service';
import {ModalSize, SuiModalService} from 'ng2-semantic-ui';
import {ModalConfirm} from '../modal/confirm-modal.component';

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
  misExperimentosInscritosItem = this.itemString;
  messageBody: string;


  constructor(public authService: AuthService, public functionsService: FunctionsService, public modalService: SuiModalService) {
    this.authService.generateUserDataJson();
  }

  logout() {
    this.messageBody = '¿Deseas cerrar la sesión?';
    this.modalService.open(new ModalConfirm('Cerrar sesión', this.messageBody, ModalSize.Tiny)).onApprove(()=> {
      console.log('User has accepted.');
      this.authService.logout();
    }).onDeny(()=> {
      console.log('User said cancel.');
    });
  }

  selectPerfil() {
    this.functionsService.selectPerfil();
    this.miPerfilItem = this.itemActiveString;
    this.gruposItem = this.itemString;
    this.misExperimentosItem = this.itemString;
    this.experimentosItem = this.itemString;
    this.nuevoExperimentoItem = this.itemString;
    this.misExperimentosInscritosItem = this.itemString;
  }

  selectGrupos() {
    this.functionsService.selectGrupos();
    this.gruposItem = this.itemActiveString;
    this.misExperimentosItem = this.itemString;
    this.experimentosItem = this.itemString;
    this.miPerfilItem = this.itemString;
    this.nuevoExperimentoItem = this.itemString;
    this.misExperimentosInscritosItem = this.itemString;
  }

  goToMyExperiments() {
    this.functionsService.selectMyExperiments();
    this.misExperimentosItem = this.itemActiveString;
    this.gruposItem = this.itemString;
    this.experimentosItem = this.itemString;
    this.miPerfilItem = this.itemString;
    this.nuevoExperimentoItem = this.itemString;
    this.misExperimentosInscritosItem = this.itemString;
  }

  goToMyExperimentsInscriptions() {
    this.functionsService.selectMyExperimentsInscriptions();
    this.misExperimentosItem = this.itemString;
    this.gruposItem = this.itemString;
    this.experimentosItem = this.itemString;
    this.miPerfilItem = this.itemString;
    this.nuevoExperimentoItem = this.itemString;
    this.misExperimentosInscritosItem = this.itemActiveString;
  }

  goBackToExperiments() {
    this.functionsService.selectExperimentos();
    this.misExperimentosInscritosItem = this.itemString;
    this.experimentosItem = this.itemActiveString;
    this.gruposItem = this.itemString;
    this.misExperimentosItem = this.itemString;
    this.miPerfilItem = this.itemString;
    this.nuevoExperimentoItem = this.itemString;
  }

  goToNewExperiment() {
    this.functionsService.selectNewExperiment();
    this.misExperimentosInscritosItem = this.itemString;
    this.experimentosItem = this.itemString;
    this.miPerfilItem = this.itemString;
    this.gruposItem = this.itemString;
    this.misExperimentosItem = this.itemString;
    this.nuevoExperimentoItem = this.itemActiveString;
  }
}
