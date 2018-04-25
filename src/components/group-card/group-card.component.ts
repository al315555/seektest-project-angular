import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Experiment} from '../../models/experiment';
import {ExperimentsService} from '../../app/experiments.service';
import {SuiModalService, TemplateModalConfig, ModalTemplate, ModalConfig, ModalSize} from 'ng2-semantic-ui';
import {ModalExperiment} from '../modal/experiment-modal.component';
import {ModalConfirm} from '../modal/confirm-modal.component';
import {ModalExperimentEdit} from '../modal/experiment-edit-modal.component';


@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit {
  @Input() grupo: any;

  isOwn: boolean;
  messageBody: string;
  messageHeader: string;
  private clicked: boolean;

  constructor(public experimentService: ExperimentsService, public modalService: SuiModalService) { }

  ngOnInit() {
  }

  seleccionarGrupo() {
    console.log('Grupo seleccionado: ', this.grupo.nombre);
    this.messageBody = '¿Estás seguro de que quieres añadirte al grupo?';
    this.modalService
      .open(new ModalConfirm(this.grupo.nombre, this.messageBody, ModalSize.Normal))
      .onApprove(() => { // poner aquí la orden de envio
         console.log('User has accepted.'); })
      .onDeny(() => {console.log('User said close.'); });
  }
}
