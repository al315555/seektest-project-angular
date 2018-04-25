import {SuiModal, ComponentModalConfig, ModalSize} from 'ng2-semantic-ui';
import {Component} from '@angular/core';
import {ConfirmModalComponent} from './confirm-modal.component';
import {Experiment} from '../../models/experiment';

interface IInscripcionsModalContext {
  title: string;
  items: any[];
  itemDates: Date[];
  noDataString: string;
}

@Component({
  selector: 'app-modal-inscripcions-users',
  template: `
    <div class="header">{{ modal.context.title }}</div>
    <div class="content">
      ---EN DESARROLLO--- Aquí va la lista de usuarios y los botones.
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
  constructor(title: string, items: any[], itemDates: Date[], noDataString: string = 'sin datos expecificados', size = ModalSize.Normal) {
    super(InscripcionsUsersModalComponent, { title, items, itemDates, noDataString});

    this.mustScroll = true;
    // this.isFullScreen = true;
    // this.isBasic = true;
    this.isClosable = true;
    this.transitionDuration = 500;
    this.size = size;
  }
}
