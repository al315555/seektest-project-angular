import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-experiment',
  templateUrl: './new-experiment.component.html',
  styleUrls: ['./new-experiment.component.css']
})
export class NewExperimentComponent implements OnInit {
  
  dateHourArray: Date[];
  dateHourSelected: Date;
  changingValueProgres: Number;

  constructor() {
    this.dateHourArray = new Array<Date>();
    this.changingValueProgres = 100;
  }

  ngOnInit() {

  }
  addDate(){
    this.dateHourArray.push(this.dateHourSelected);
    this.dateHourSelected = null
  }

}
