import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../../app/auth.service';

@Component({
  selector: 'app-login-spinner',
  templateUrl: './login-spinner.component.html',
  styleUrls: ['./login-spinner.component.css']
})
export class LoginSpinnerComponent implements OnInit {
  @Input() message: string;
  @Input() showed: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
