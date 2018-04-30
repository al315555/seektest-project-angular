import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Experiment} from '../../models/experiment';
import {ExperimentsService} from '../../app/experiments.service';
import {SuiModalService, TemplateModalConfig, ModalTemplate, ModalConfig, ModalSize} from 'ng2-semantic-ui';
import {ModalExperiment} from '../modal/experiment-modal.component';
import {ModalConfirm} from '../modal/confirm-modal.component';
import {ModalExperimentEdit} from '../modal/experiment-edit-modal.component';
import {GruposInvestComponent} from '../grupos-invest/grupos-invest.component';
import {Group} from '../../models/group';


@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit {
  @Input() grupo: Group;
  @Input() myGroup: boolean;

  dateCreated: Date;
  isOwn: boolean;
  messageBody: string;
  messageHeader: string;
  private clicked: boolean;

  constructor(public experimentService: ExperimentsService, public modalService: SuiModalService) {
    this.dateCreated = new Date();
  }

  ngOnInit() {
    this.dateCreated.setTime(this.grupo.dateCreated);
  }

  abandonarGrupo() {
    this.messageBody = '¿Estás seguro de que quieres abandonar el grupo? Tendrás que volver unirte en un futuro.';
    this.modalService
      .open(new ModalConfirm(this.grupo.nombre, this.messageBody, ModalSize.Tiny))
      .onApprove(() => { // poner aquí la orden de envio
        console.log('User has accepted.');
      })
      .onDeny(() => {console.log('User said cancel.'); });
  }

  seleccionarGrupo() {
    this.messageBody = '¿Estás seguro de que quieres añadirte al grupo? Puedes abandonarlo cuando quieras.';
    this.modalService
      .open(new ModalConfirm(this.grupo.nombre, this.messageBody, ModalSize.Tiny))
      .onApprove(() => { // poner aquí la orden de envio
         console.log('User has accepted.');
      })
      .onDeny(() => {console.log('User said cancel.'); });
  }
}
