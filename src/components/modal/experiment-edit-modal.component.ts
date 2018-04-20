import {SuiModal, ComponentModalConfig, ModalSize} from 'ng2-semantic-ui';
import {Component} from '@angular/core';
import {ConfirmModalComponent} from './confirm-modal.component';
import {Experiment} from '../../models/experiment';

interface IExperimentModalContext {
  title: string;
  item: any;
}

@Component({
  selector: 'app-modal-experiment-edit',
  template: `
    <div class="header">Editar&nbsp;experimento</div>
    <div class="content">
      <app-edit-experiment [experiment]="modal.context.item"></app-edit-experiment>
    </div>
    <div class="actions">
      <button class="ui red button" (click)="modal.deny('denied')">Cerrar</button>
    </div>
    `,
  styleUrls: ['./modal.component.css']
})
export class ExperimentEditModalComponent {
  constructor(public modal: SuiModal<IExperimentModalContext, void, void>) {}
}

export class ModalExperimentEdit extends ComponentModalConfig<IExperimentModalContext, void, void> {
  constructor(title: string, item: any, noDataString: string = 'sin datos expecificados', size = ModalSize.Normal) {
    super(ExperimentEditModalComponent, { title, item});

    this.mustScroll = true;
    // this.isFullScreen = true;
    // this.isBasic = true;
    this.isClosable = true;
    this.transitionDuration = 100;
    this.size = size;
  }
}
