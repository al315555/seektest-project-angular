import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-experiment',
  templateUrl: './new-experiment.component.html',
  styleUrls: ['./new-experiment.component.css']
})
export class NewExperimentComponent implements OnInit {
  
  collapse: boolean;
  changingValueProgres: number;
  progresIncrement: number = 20;

  dateHourArray: Date[];
  dateHourSelected: Date;
  dateHourEntered: boolean;
  
  title: String;
  titleEntered: boolean;

  place: String;
  numberParticipants: number;
  description: String;

  constructor() {
    this.dateHourArray = new Array<Date>();
    this.changingValueProgres = 0;
    this.collapse = true;
    this.titleEntered = false;
    this.dateHourEntered = false;
  }

  ngOnInit() {

  }
  addDate(){
    if(this.dateHourSelected != null){
      this.dateHourArray.push(this.dateHourSelected);
      this.dateHourSelected = null
      if(!this.dateHourEntered){
        this.dateHourEntered = true;
        this.changingValueProgres += this.progresIncrement;
      }
    }else{
      //Alerta introducir hora
    }
    
  }

  deleteDate(i){
    this.dateHourArray.splice(i,1)
    if(this.dateHourArray.length == 0){
      this.dateHourEntered = false;
      this.changingValueProgres -= this.progresIncrement;
    }
  }

  changeTitle(){
    if(this.title == ""){
      this.titleEntered = false;
      this.changingValueProgres -= this.progresIncrement;
      console.log(this.changingValueProgres);
    }else{
      if(this.titleEntered == false){
        this.titleEntered = true;
        this.changingValueProgres += this.progresIncrement;
      }
    }
  }

}