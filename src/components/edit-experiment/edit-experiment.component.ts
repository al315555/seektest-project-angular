import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Experiment } from '../../models/experiment';
import { MessageToastComponent } from '../message-toast/message-toast.component';
import { MessageToast } from '../../models/message-toast';

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

  constructor() { }

  ngOnInit() {
    this.dateHourArray = new Array<Date>();
    this.experiment.dates.forEach(element => {
      const fecha: Date = new Date();
      fecha.setTime(element);
      this.dateHourArray.push(fecha);
    });
    console.log(this.dateHourArray);
  }

}
