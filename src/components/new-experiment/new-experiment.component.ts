import { Component, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MessageToast } from '../../models/message-toast';
import { MessageToastComponent } from '../message-toast/message-toast.component';
import { FunctionsService } from '../../app/functions.service';
import { AngularFireObject, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProfile } from '../../models/user-profile';
import { RangoEdad } from '../../models/rango-edad';
import { Experiment } from '../../models/experiment';
import { ExperimentsService } from '../../app/experiments.service';

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

  mode: string;
  firstDayOfWeek: string;

  constructor(private afAuth: AngularFireAuth, private experimentService: ExperimentsService, public functions: FunctionsService) {
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
    this.buttonEnable();
  }

  deleteDate(i) {
    this.dateHourArray.splice(i, 1);
    if (this.dateHourArray.length === 0) {
      this.dateHourEntered = false;
      this.changingValueProgres -= this.progresIncrement;
    }
    this.buttonEnable();
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

  private isNotNull(item: any): boolean {
    return item != null && item !== undefined;
  }

  addExperiment() {
    if (this.edadInicio != null && this.edadFinal != null && this.edadInicio > this.edadFinal) {
      this.messageToast.pushMessage({ title: 'Error!', description: 'La edad de inicio no puede ser mayor que la de fin.', type: 'error' });
    } else {

      const userProfile: UserProfile = new UserProfile();
      const rangoEdad: RangoEdad = new RangoEdad();

      if (this.isNotNull(this.edadInicio)) {
        rangoEdad.inicio = this.edadInicio.valueOf();
      }

      if (this.isNotNull(this.edadFinal)) {
        rangoEdad.final = this.edadFinal.valueOf();
      }

      if (this.isNotNull(this.perfilSexo)) {
        userProfile.sexo = this.perfilSexo.toString();
      }

      if (this.isNotNull(this.alergias)) {
        userProfile.alergias = this.alergias.toString();
      }

      if (this.isNotNull(this.medicalObs)) {
        userProfile.medicalObs = this.medicalObs.toString();
      }

      this.spinnerLoading = true;
      // guardamos las fechas como numero time para poder formatearlo al recibirlo
      const dateNumberArray = [];
      this.dateHourArray.forEach(value => {
        dateNumberArray.push(value.getTime());
      });

      const exp: Experiment = new Experiment();

      exp.uidPublisher = localStorage.getItem('uid_usuario');
      exp.datePublished = new Date().getTime();
      exp.title = this.title.toString();
      exp.place = this.place.toString();
      if (this.isNotNull(this.lat)) {
        exp.placeLatLon = { lat: this.lat, lon: this.lon };
      }
      exp.numberParticipants = this.numberParticipants.toString();
      exp.description = this.description.toString();
      exp.dates = dateNumberArray;
      if (this.isNotNull(this.gift)) {
        exp.gift = this.gift.toString();
      }
      exp.duration = this.duration;
      exp.userProfile = userProfile;


      this.experimentService.addExperiment(exp).then((value) => {
        this.clearFields();
        this.messageToast.pushMessage({
          title: 'Experimento añadido!', description: 'El experimento ha sido añadido correctamente',
          type: 'success'
        });
        window.scrollTo(0, 0);
      }
      );
    }
  }

  cambiaMensaje() {
    if (!this.collapse) {
      this.textoDesplegable = 'Cerrar';
    } else {
      this.textoDesplegable = 'Añadir un perfil de sujeto';
    }
    window.scrollTo(0, 0);
  }

  goBackToExperiments() {
    this.functions.selectExperimentos();
  }
}
