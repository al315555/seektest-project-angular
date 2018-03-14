import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginSpinnerComponent } from '../components/login-spinner/login-spinner.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from './auth.service';
import { LoginComponent } from '../components/login/login.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginSpinnerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule , FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent, LoginComponent]
})
export class AppModule { }
