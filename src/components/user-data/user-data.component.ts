import {Component, ViewChild} from '@angular/core';
import { AuthService } from '../../app/auth.service';
import {FunctionsService} from '../../app/functions.service';
import {MessageToast} from '../../models/message-toast';
import {MessageToastComponent} from '../message-toast/message-toast.component';
import {ConfirmModal} from '../modal/modal.component';
import {ModalSize, SuiModalService} from 'ng2-semantic-ui';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {
  @ViewChild(MessageToastComponent) messageToast: MessageToastComponent;
  messages: MessageToast[];
  spinnerLoading: boolean;
  messageBody: string;
  messageHeader: string;
  mode: any;
  firstDayOfWeek: string;
  fechaNacimiento: Date;

  constructor(public authService: AuthService, public functions: FunctionsService, public modalService: SuiModalService) {
    this.messageBody = '¿Estás seguro de que quieres borrar tu cuenta? No podrás recuperarla.';
    this.messageHeader = 'Darme de baja y anular cuenta';
    this.mode = 'date';
    this.fechaNacimiento = new Date();
    this.fechaNacimiento.setTime(authService.userDataJson._fechaNacimiento);
  }

  fileChange(event) {
    const filesList: FileList = event.target.files;
    const file = filesList.item(0);
    console.log(file.name);
    console.log(this.authService.putNewImg(file));
  }

  openModalDeleteUser() {
    this.modalService
      .open(new ConfirmModal(this.messageHeader, this.messageBody, ModalSize.Normal))
      .onApprove(() => {alert('User has accepted.'); })
      .onDeny(() => {alert('User has denied.'); });
  }

  goBackToExperiments() {
    this.functions.selectExperimentos();
  }

  guardarDatos() {
    if (this.authService.actualizarUsuario()) {
      this.messageToast.pushMessage({
        title: 'Acción realizada con éxito.',
        description: 'Los datos se han actualizado correctamente.',
        type: 'success'
      });
    } else {
      this.messageToast.pushMessage({
        title: '¡Ups! Algo no ha ido bien.',
        description: 'Los datos no se han podido actualizar.',
        type: 'error'
      });
    }
    // this.functions.selectExperimentos();
  }
  borrarUsuario() {
    this.authService.deleteUser();
  }
}
