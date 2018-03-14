import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginSpinnerComponent } from '../components/login-spinner/login-spinner.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginSpinnerComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
