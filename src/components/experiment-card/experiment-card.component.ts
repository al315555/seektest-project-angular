import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Experiment} from '../../models/experiment';
import {ExperimentsService} from '../../app/experiments.service';
import {SuiModalService, TemplateModalConfig, ModalTemplate, ModalConfig, ModalSize} from 'ng2-semantic-ui';
import {ModalExperiment} from '../modal/experiment-modal.component';
import {ModalConfirm} from '../modal/confirm-modal.component';
import {ModalExperimentEdit} from '../modal/experiment-edit-modal.component';

export interface IContext {
  data: string;
}


@Component({
  selector: 'app-experiment-card',
  templateUrl: './experiment-card.component.html',
  styleUrls: ['./experiment-card.component.css']
})
export class ExperimentCardComponent implements OnInit {

  @Input() expe: any;

  isOwn: boolean;

  private clicked: boolean;

  constructor(public experimentService: ExperimentsService, public modalService: SuiModalService) {

  }

  ngOnInit() {
    console.log(this.expe);
    if (this.expe.uidPublisher === localStorage.getItem('uid_usuario')) {
      this.isOwn = true;
    } else {
      this.isOwn = false;
    }

  }

  deleteExperDb() {
    if (this.isOwn) {
      this.experimentService.deleteExperiment(this.expe.key);
    }
  }

  openModal() {
    const itemDates = new Array();
    this.expe.dates.forEach(value => {
      const date = new Date();
      date.setTime(value);
      itemDates.push(date);
    });

    this.modalService
      .open(new ModalExperiment(this.expe.title, this.expe, itemDates, ModalSize.Normal))
      .onApprove(() => {
        console.log('Approved');
      })
      .onDeny(() => {
        console.log('Cancelled');
      });
  }

  deleteExperiment() {
    this.modalService
      .open(new ModalConfirm('Eliminar experimento',
        '¿Está seguro de que desea eliminar el experimento? La acción no se puede deshacer.', ModalSize.Tiny))
      .onApprove(() => {
        this.deleteExperDb();
      })
      .onDeny(() => {
        console.log('Cancelled');
      });
  }

  editExperiment() {
    this.modalService
      .open(new ModalExperimentEdit(this.expe.title, this.expe, ModalSize.Normal))
      .onDeny(() => {
        console.log('Cancelled');
      });

  }

}
