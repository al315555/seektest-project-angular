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
          <p>{{ modal.context.content }}</p>
      </div>
      <div class="actions">
          <button class="ui red button" (click)="modal.deny(undefined)">Cancel</button>
          <button class="ui green button" (click)="modal.approve(undefined)" autofocus>OK</button>
      </div>
`
})
export class ConfirmModalComponent {
  constructor(public modal: SuiModal<IConfirmModalContext, void, void>) {}
}
