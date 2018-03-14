import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-login-spinner',
  templateUrl: './login-spinner.component.html',
  styleUrls: ['./login-spinner.component.css']
})
export class LoginSpinnerComponent implements OnInit {
  @Input() message: string;

  constructor() { 
  }

  ngOnInit() {
  }

}
