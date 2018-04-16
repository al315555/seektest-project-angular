import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-experiment-card',
  templateUrl: './experiment-card.component.html',
  styleUrls: ['./experiment-card.component.css']
})
export class ExperimentCardComponent implements OnInit {

  @Output() clickEvEm = new EventEmitter<any>();
  @Input() expe: any;

  private clicked: boolean;

  constructor() { 
  
  }

  ngOnInit() {

  }

  openModal(){
    this.clickEvEm.emit(this.expe); 
  }

}
