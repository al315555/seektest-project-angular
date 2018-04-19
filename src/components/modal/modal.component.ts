import {ComponentModalConfig, ModalSize} from 'ng2-semantic-ui';
import {ConfirmModalComponent} from './baseModal.component';

interface IConfirmModalContext {
  title: string;
  content: string;
}

export class ConfirmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
  constructor(title: string, content: string, size = ModalSize.Normal) {
    super(ConfirmModalComponent, { title, content });

    this.mustScroll = true;
    // this.isFullScreen = true;
    // this.isBasic = true;
    this.isClosable = false;
    this.transitionDuration = 100;
    this.size = size;
  }
}
