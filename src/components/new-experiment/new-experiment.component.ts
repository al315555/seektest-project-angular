import { Component, OnInit } from '@angular/core';
import { FunctionsService} from '../../app/functions.service';

@Component({
  selector: 'app-new-experiment',
  templateUrl: './new-experiment.component.html',
  styleUrls: ['./new-experiment.component.css']
})
export class NewExperimentComponent implements OnInit {
  collapse: boolean;
  dateHourArray: Date[];
  dateHourSelected: Date;
  changingValueProgres: Number;

  constructor(public functions: FunctionsService) {
    this.dateHourArray = new Array<Date>();
    this.changingValueProgres = 100;
    this.collapse = true;
  }

  ngOnInit() {

  }
  addDate() {
    if (this.dateHourSelected != null) {
      this.dateHourArray.push(this.dateHourSelected);
      this.dateHourSelected = null;
    } else {
      // Alerta introducir hora
    }

  }

  deleteDate(i) {
    this.dateHourArray.splice(i, 1 );
  }

}
