import { Component, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MessageToast } from '../../models/message-toast';
import { MessageToastComponent } from '../message-toast/message-toast.component';
import {FunctionsService} from '../../app/functions.service';
import {AngularFireDatabase, AngularFireObject, AngularFireList, snapshotChanges} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-new-experiment',
  templateUrl: './new-experiment.component.html',
  styleUrls: ['./new-experiment.component.css']
})
export class NewExperimentComponent {
  @ViewChild(MessageToastComponent) messageToast: MessageToastComponent;

  messages: MessageToast[];
  spinnerLoading: boolean;
  collapse: boolean;
  changingValueProgres: number;
  progresIncrement: number = 16.7;

  datesHoursString: string[];
  dateHourArray: Date[];
  dateHourSelected: Date;
  dateHourEntered: boolean;

  title: String;
  titleEntered: boolean;

  place: String;
  lat: number;
  lon: number;
  placeEntered: boolean;

  duration: number;
  durationEntered: boolean;

  numberParticipants: number;
  numberParticipantsEntered: boolean;

  description: String;
  descriptionEntered: boolean;

  gift: String;

  perfilSexo: String;
  edadInicio: Number;
  edadFinal: Number;
  alergias: String;
  medicalObs: String;

  buttonEnabled: boolean;

  textoDesplegable: String;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFireDatabase, public functions: FunctionsService) {
    this.dateHourArray = new Array<Date>();
    this.changingValueProgres = 0;
    this.collapse = true;
    this.messages = [];
    this.edadInicio = null;
    this.edadFinal = null;
    this.alergias = null;
    this.medicalObs = null;
    this.perfilSexo = null;
    this.gift = null;
    this.lat = null;
    this.lat = null;

    this.durationEntered = false;
    this.titleEntered = false;
    this.dateHourEntered = false;
    this.placeEntered = false;
    this.numberParticipantsEntered = false;
    this.descriptionEntered = false;
    this.buttonEnabled = false;
    this.spinnerLoading = false;
    this.textoDesplegable = 'Añadir perfil de sujeto';
  }

  placeMarker(event) {
    this.lat = event.coords.lat;
    this.lon = event.coords.lng;
  }

  addDate() {
    if (this.dateHourSelected != null) {
      this.dateHourArray.push(this.dateHourSelected);
      this.dateHourSelected = null;
      if (!this.dateHourEntered) {
        this.dateHourEntered = true;
        this.changingValueProgres += this.progresIncrement;
      }
    } else {
      // Alerta introducir hora
    }

  }

  deleteDate(i) {
    this.dateHourArray.splice(i, 1);
    if (this.dateHourArray.length === 0) {
      this.dateHourEntered = false;
      this.changingValueProgres -= this.progresIncrement;
    }
  }

  changeTitle() {
    if (this.title === '') {
      this.titleEntered = false;
      this.changingValueProgres -= this.progresIncrement;
    } else {
      if (!this.titleEntered) {
        this.titleEntered = true;
        this.changingValueProgres += this.progresIncrement;
      }
    }
    this.buttonEnable();
  }

  changePlace() {
    if (this.place === '') {
      this.placeEntered = false;
      this.changingValueProgres -= this.progresIncrement;
    } else {
      if (!this.placeEntered) {
        this.placeEntered = true;
        this.changingValueProgres += this.progresIncrement;
      }
    }
    this.buttonEnable();
  }

  changeDuration() {
    if ((this.durationEntered) && (this.duration == null || this.duration <= 0)) {
      this.durationEntered = false;
      this.changingValueProgres -= this.progresIncrement;
    } else {
      if (!this.durationEntered && this.duration > 0) {
        this.durationEntered = true;
        this.changingValueProgres += this.progresIncrement;
      }
    }
    this.buttonEnable();
  }

  changeNumberParticipants() {
    if ((this.numberParticipantsEntered) && (this.numberParticipants == null || this.numberParticipants <= 0)) {
      this.numberParticipantsEntered = false;
      this.changingValueProgres -= this.progresIncrement;
    } else {
      if (!this.numberParticipantsEntered && this.numberParticipants > 0) {
        this.numberParticipantsEntered = true;
        this.changingValueProgres += this.progresIncrement;
      }
    }
    this.buttonEnable();
  }

  changeDescription() {
    if (this.description === '') {
      this.descriptionEntered = false;
      this.changingValueProgres -= this.progresIncrement;
    } else {
      if (!this.descriptionEntered) {
        this.descriptionEntered = true;
        this.changingValueProgres += this.progresIncrement;
      }
    }
    this.buttonEnable();
  }

  buttonEnable() {
    if (this.changingValueProgres >= 100) {
      this.buttonEnabled = true;
    } else {
      this.buttonEnabled = false;
    }
  }

  clearFields() {
    this.dateHourArray = new Array<Date>();
    this.changingValueProgres = 0;
    this.title = '';
    this.place = '';
    this.numberParticipants = null;
    this.description = '';
    this.edadFinal = null;
    this.duration = null;
    this.gift = null;
    this.edadInicio = null;
    this.perfilSexo = null;
    this.alergias = null;
    this.medicalObs = null;
    this.titleEntered = false;
    this.dateHourEntered = false;
    this.placeEntered = false;
    this.numberParticipantsEntered = false;
    this.descriptionEntered = false;
    this.buttonEnabled = false;
    this.spinnerLoading = false;
    this.buttonEnabled = false;
    this.durationEntered = false;
  }

  addExperiment() {
    if (this.edadInicio != null && this.edadFinal != null && this.edadInicio > this.edadFinal) {
      this.messageToast.pushMessage({title: 'Error!', description: 'La edad de inicio no puede ser mayor que la de fin.', type: 'error'});
    } else {
      const userProfile = {sexo: this.perfilSexo, rangoEdad: {inicio: this.edadInicio, final: this.edadFinal},
        alergias: this.alergias, medicalObs: this.medicalObs};
      try {
        this.spinnerLoading = true;
        // guardamos las fechas como numero time para poder formatearlo al recibirlo
        const dateNumberArray = new Array();
        this.dateHourArray.forEach(value => {
          dateNumberArray.push(value.getTime());
        });

        this.afs.list('experiments/').push(
          {
            uidPublisher: localStorage.getItem('uid_usuario'), datePublished: new Date().getTime(),
            title: this.title, place: this.place, placeLatLon: {lat: this.lat, lon: this.lon},
            numberParticipants: this.numberParticipants,
            description: this.description, dates: dateNumberArray, gift: this.gift, duration: this.duration,
            userProfile: userProfile
          }
        ).then((value) => {
          this.clearFields();
          this.messageToast.pushMessage({title: 'Experimento añadido!', description: 'El experimento ha sido añadido correctamente',
          type: 'success'});
          }
        );
      } catch {
        this.messages.push({title: 'Ha habido un error!',
          description: 'No se ha podido subir el experimento, intentelo mas tarde.', type: 'error'});
      }
    }
  }

  cambiaMensaje() {
    if (!this.collapse) {
      this.textoDesplegable = 'Cerrar';
    } else {
      this.textoDesplegable = 'Añadir un perfil de sujeto';
    }
  }

  goBackToExperiments() {
    this.functions.selectExperimentos();
  }
}
