import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { LoginSpinnerComponent } from '../components/login-spinner/login-spinner.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from './auth.service';
import { LoginComponent } from '../components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserFormComponent } from '../components/user-form/user-form.component';
import {FunctionsService} from './functions.service';
import {ExperimentsComponent} from '../components/experiments/experiments.component';
import {HeaderComponent} from '../components/header/header.component';
import {UserDataComponent} from '../components/user-data/user-data.component';
import {LoggedComponent} from '../components/logged/logged.component';
import {NewExperimentComponent } from '../components/new-experiment/new-experiment.component';
import {SuiModule} from 'ng2-semantic-ui';

// import { AngularFirestoreModule } from 'angularfire2/firestore';


@NgModule({
  declarations: [
    AppComponent,
    LoginSpinnerComponent,
    LoginComponent,
    UserFormComponent,
    ExperimentsComponent,
    HeaderComponent,
    UserDataComponent,
    LoggedComponent,
    NewExperimentComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule ,
    FormsModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    SuiModule
  ],
  providers: [AuthService, FunctionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
