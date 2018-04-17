import {Component, ViewChild} from '@angular/core';
import { AuthService } from '../../app/auth.service';
import {FunctionsService} from '../../app/functions.service';
import {MessageToast} from '../../models/message-toast';
import {MessageToastComponent} from '../message-toast/message-toast.component';


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

  constructor(public authService: AuthService, public functions: FunctionsService) {
    this.messageBody = '¿Estás seguro de que quieres borrar tu cuenta? No podrás recuperarla.';
    this.messageHeader = 'Darme de baja y anular cuenta';
    this.mode = 'date';
  }

  fileChange(event) {
    const filesList: FileList = event.target.files;
    const file = filesList.item(0);
    console.log(file.name);
    console.log(this.authService.putNewImg(file));
    /*if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData:FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      const headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      const options = new RequestOptions({ headers: headers });
      this.http.post(`${this.apiEndPoint}`, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
          data => console.log('success'),
          error => console.log(error)
        )
    } */
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
