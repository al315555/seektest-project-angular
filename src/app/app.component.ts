import { Component, OnInit} from '@angular/core';
import { LoginSpinnerComponent } from '../components/login-spinner/login-spinner.component';
import { AuthService } from './core/auth.service';
import { NotifyService } from './core/notify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SEEK TEST';
}
