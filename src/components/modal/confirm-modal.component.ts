import {SuiModal, ComponentModalConfig, ModalSize} from 'ng2-semantic-ui';
import {Component} from '@angular/core';

interface IConfirmModalContext {
  title: string;
  content: string;
}

@Component({
  selector: 'app-modal-confirm',
  template: `
      <div class="header">{{ modal.context.title }}</div>
      <div class="content">
          {{ modal.context.content }}
      </div>
      <div class="actions">
          <button class="ui red button" (click)="modal.deny(undefined)">Cancelar</button>
          <button class="ui green button" (click)="modal.approve(undefined)" autofocus>Lo entiendo, acepto</button>
      </div>
`,
  styleUrls: ['./modal.component.css']
})
export class ConfirmModalComponent {
  constructor(public modal: SuiModal<IConfirmModalContext, void, void>) {}
}

export class ModalConfirm extends ComponentModalConfig<IConfirmModalContext, void, void> {
  constructor(title: string, content: any, size = ModalSize.Normal) {
    super(ConfirmModalComponent, { title, content });

    this.mustScroll = true;
    // this.isFullScreen = true;
    // this.isBasic = true;
    this.isClosable = false;
    this.transitionDuration = 500;
    this.size = size;
  }
}
