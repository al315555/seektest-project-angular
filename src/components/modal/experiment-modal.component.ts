import {SuiModal, ComponentModalConfig, ModalSize} from 'ng2-semantic-ui';
import {Component} from '@angular/core';
import {ConfirmModalComponent} from './confirm-modal.component';
import {Experiment} from '../../models/experiment';

interface IExperimentModalContext {
  title: string;
  item: any;
  itemDates: Date[];
  noDataString: string;
}

@Component({
  selector: 'app-modal-experiment',
  template: `
    <div class="header">{{ modal.context.title }}</div>
    <div class="content">
      <app-experiment-data [item]="modal.context.item" [itemDates]="modal.context.itemDates"></app-experiment-data>
    </div>
    <div class="actions">
      <button class="ui red button" (click)="modal.deny(undefined)">Cerrar</button>
    </div>
    `
})
export class ExperimentModalComponent {
  constructor(public modal: SuiModal<IExperimentModalContext, void, void>) {}
}

export class ModalExperiment extends ComponentModalConfig<IExperimentModalContext, void, void> {
  constructor(title: string, item: any, itemDates: Date[], noDataString: string = 'sin datos expecificados', size = ModalSize.Normal) {
    super(ExperimentModalComponent, { title, item, itemDates, noDataString});

    this.mustScroll = true;
    // this.isFullScreen = true;
    // this.isBasic = true;
    this.isClosable = true;
    this.transitionDuration = 100;
    this.size = size;
  }
}
