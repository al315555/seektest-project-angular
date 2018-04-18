import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Experiment } from '../../models/experiment';
import { MessageToastComponent } from '../message-toast/message-toast.component';
import { MessageToast } from '../../models/message-toast';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireObject, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FunctionsService } from '../../app/functions.service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-edit-experiment',
  templateUrl: './edit-experiment.component.html',
  styleUrls: ['./edit-experiment.component.css']
})
export class EditExperimentComponent implements OnInit {

  @Input() experiment: Experiment;

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
    this.changingValueProgres = 100;
    this.collapse = true;
    this.messages = [];

    this.dateHourArray = new Array<Date>();
    this.edadInicio = null;
    this.edadFinal = null;
    this.alergias = null;
    this.medicalObs = null;
    this.perfilSexo = null;
    this.gift = null;
    this.lat = null;
    this.lat = null;

    this.durationEntered = true;
    this.titleEntered = true;
    this.dateHourEntered = true;
    this.placeEntered = true;
    this.numberParticipantsEntered = true;
    this.descriptionEntered = true;
    this.buttonEnabled = true;
    this.spinnerLoading = false;
    this.textoDesplegable = 'Añadir perfil de sujeto';
  }

  ngOnInit() {
    this.dateHourArray = new Array<Date>();
    this.experiment.dates.forEach(element => {
      const fecha: Date = new Date();
      fecha.setTime(element);
      this.dateHourArray.push(fecha);
    });
    this.title = this.experiment.title;
    this.place = this.experiment.place;
    this.lat = this.experiment.placeLatLon.lat;
    this.lon = this.experiment.placeLatLon.lon;
    this.duration = this.experiment.duration;
    this.numberParticipants = parseInt(this.experiment.numberParticipants);
    this.description = this.experiment.description;
    this.gift = this.experiment.gift;
    this.perfilSexo = this.experiment.userProfile.sexo;
    this.edadInicio = this.experiment.userProfile.rangoEdad.inicio;
    this.edadFinal = this.experiment.userProfile.rangoEdad.final;
    this.alergias = this.experiment.userProfile.alergias;
    this.medicalObs = this.experiment.userProfile.medicalObs;
  }

  cambiaMensaje() {
    if (!this.collapse) {
      this.textoDesplegable = 'Cerrar';
    } else {
      this.textoDesplegable = 'Añadir un perfil de sujeto';
    }
  }

  buttonEnable() {
    if (this.changingValueProgres >= 100) {
      this.buttonEnabled = true;
    } else {
      this.buttonEnabled = false;
    }
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

  addExperiment() {
    if (this.edadInicio != null && this.edadFinal != null && this.edadInicio > this.edadFinal) {
      this.messageToast.pushMessage({ title: 'Error!', description: 'La edad de inicio no puede ser mayor que la de fin.', type: 'error' });
    } else {
      const userProfile = {
        sexo: this.perfilSexo, rangoEdad: { inicio: this.edadInicio, final: this.edadFinal },
        alergias: this.alergias, medicalObs: this.medicalObs
      };

      this.spinnerLoading = true;
      // guardamos las fechas como numero time para poder formatearlo al recibirlo
      const dateNumberArray = [];
      this.dateHourArray.forEach(value => {
        dateNumberArray.push(value.getTime());
      });
      console.log(this.experiment.key);
      this.afs.list('experiments/').update(this.experiment.key,
        {
          uidPublisher: localStorage.getItem('uid_usuario'), datePublished: this.experiment.datePublished,
          title: this.title, place: this.place, placeLatLon: { lat: this.lat, lon: this.lon },
          numberParticipants: this.numberParticipants,
          description: this.description, dates: dateNumberArray, gift: this.gift, duration: this.duration,
          userProfile: userProfile
        }
      ).then((value) => {
        this.messageToast.pushMessage({
          title: 'Experimento modificado!', description: 'El experimento ha sido modificado correctamente',
          type: 'success'
        });
        this.spinnerLoading = false;
        window.scrollTo(0, 0);
      }
      ).catch((value) => {
        this.messages.push({
          title: 'Ha habido un error!',
          description: 'No se ha podido modificar el experimento, intentelo mas tarde.', type: 'error'
        });
        this.spinnerLoading = false;
        window.scrollTo(0, 0);
      });
    }
  }

}
