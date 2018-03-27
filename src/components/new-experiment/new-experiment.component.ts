import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-new-experiment',
  templateUrl: './new-experiment.component.html',
  styleUrls: ['./new-experiment.component.css']
})
export class NewExperimentComponent implements OnInit {
  experimentAdded: boolean;
  spinnerLoading: boolean;
  collapse: boolean;
  changingValueProgres: number;
  progresIncrement: number = 16.7;

  dateHourArray: Date[];
  dateHourSelected: Date;
  dateHourEntered: boolean;

  title: String;
  titleEntered: boolean;

  place: String;
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

  constructor(private afs: AngularFirestore) {
    this.dateHourArray = new Array<Date>();
    this.changingValueProgres = 0;
    this.collapse = true;
    this.experimentAdded = false;
    this.edadInicio = null;
    this.edadFinal = null;
    this.alergias = null;
    this.medicalObs = null;
    this.perfilSexo = null;
    
    this.durationEntered = false;
    this.titleEntered = false;
    this.dateHourEntered = false;
    this.placeEntered = false;
    this.numberParticipantsEntered = false;
    this.descriptionEntered = false;
    this.buttonEnabled = false;
    this.spinnerLoading = false;
  }

  ngOnInit() {

  }

  addDate() {
    if (this.dateHourSelected != null) {
      this.dateHourArray.push(this.dateHourSelected);
      this.dateHourSelected = null
      if (!this.dateHourEntered) {
        this.dateHourEntered = true;
        this.changingValueProgres += this.progresIncrement;
      }
    } else {
      //Alerta introducir hora
    }

  }

  deleteDate(i) {
    this.dateHourArray.splice(i, 1)
    if (this.dateHourArray.length == 0) {
      this.dateHourEntered = false;
      this.changingValueProgres -= this.progresIncrement;
    }
  }

  changeTitle() {
    if (this.title == "") {
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
    if (this.place == "") {
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

  changeDuration(){
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
    if (this.description == "") {
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

  buttonEnable(){
    if(this.changingValueProgres >= 100){
      this.buttonEnabled = true;
    }else{
      this.buttonEnabled = false;
    }
  }
  
  clearFields(){
    this.dateHourArray = new Array<Date>();
    this.changingValueProgres = 0;
    this.title = "";
    this.place = "";
    this.numberParticipants = null;
    this.description = "";
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

  addExperiment(){
    this.spinnerLoading = true
    let userProfile = {sexo: this.perfilSexo, rangoEdad: {inicio: this.edadInicio, final: this.edadFinal}, alergias: this.alergias, medicalObs: this.medicalObs}
    this.afs.collection('experiments').add({title:this.title,place:this.place,numberParticipants:this.numberParticipants,description: this.description,dates: this.dateHourArray, gift:this.gift, duration: this.duration ,userProfile: userProfile})
    .then(value => {
      this.spinnerLoading = false;
      this.clearFields();
      this.experimentAdded = true;
    }).catch(value => {
      this.spinnerLoading = false;
    });
  }

}