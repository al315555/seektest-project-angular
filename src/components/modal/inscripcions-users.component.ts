import {SuiModal, ComponentModalConfig, ModalSize} from 'ng2-semantic-ui';
import {Component} from '@angular/core';
import {ConfirmModalComponent} from './confirm-modal.component';
import {Experiment} from '../../models/experiment';
import {Inscription} from '../../models/inscription';

interface IInscripcionsModalContext {
  title: string;
  item: string;
  inscriptions: Inscription[];
  noDataString: string;
}

@Component({
  selector: 'app-modal-inscripcions-users',
  template: `
    <div class="header">{{ modal.context.title }}</div>
    <div class="content">
      <app-list-users-inscriptions [expKey]="modal.context.item" [inscripciones]="modal.context.inscriptions"></app-list-users-inscriptions>
    </div>
    <div class="actions">
      <button class="ui red button" (click)="modal.deny(undefined)">Cerrar</button>
    </div>
    `,
  styleUrls: ['./modal.component.css']
})
export class InscripcionsUsersModalComponent {
  constructor(public modal: SuiModal<IInscripcionsModalContext, void, void>) {}
}

export class ModalInscripcionsUsers extends ComponentModalConfig<IInscripcionsModalContext, void, void> {
  constructor(title: string, item: string, inscriptions: Inscription[],
              noDataString: string = 'No hay inscripciones', size = ModalSize.Normal) {
    super(InscripcionsUsersModalComponent, { title, item, inscriptions, noDataString});

    this.mustScroll = true;
    // this.isFullScreen = true;
    // this.isBasic = true;
    this.isClosable = true;
    this.transitionDuration = 500;
    this.size = size;
  }
}
