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
import { ListExperimentComponent } from '../components/list-experiment/list-experiment.component';
import { MessageToastComponent } from '../components/message-toast/message-toast.component';

import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';

import { RouterModule, Routes } from '@angular/router';
import {ExperimentsService} from './experiments.service';
import {ExperimentDataComponent} from '../components/experiment-data/experiment-data.component';
import { ExperimentCardComponent } from '../components/experiment-card/experiment-card.component';
import { AgmCoreModule } from '@agm/core';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {MyExperimentsComponent} from '../components/my-experiments/my-experiments.component';
import { EditExperimentComponent } from '../components/edit-experiment/edit-experiment.component';
import { InscripcioExperimentComponent } from './../components/inscripcio-experiment/inscripcio-experiment.component';
import {ConfirmModalComponent} from '../components/modal/confirm-modal.component';
import {ExperimentModalComponent} from '../components/modal/experiment-modal.component';
import {ExperimentEditModalComponent} from '../components/modal/experiment-edit-modal.component';
import { GruposInvestComponent } from '../components/grupos-invest/grupos-invest.component';
import { NewGroupComponent } from '../components/new-group/new-group.component';
import {MyExperimentsInscriptionsComponent} from '../components/my-experiments-inscriptions/my-experiments-inscriptions.component';
import { GroupCardComponent } from '../components/group-card/group-card.component';
import {InscripcionsUsersModalComponent, ModalInscripcionsUsers} from '../components/modal/inscripcions-users.component';

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
    NewExperimentComponent,
    ListExperimentComponent,
    MessageToastComponent,
    ResetPasswordComponent,
    ExperimentDataComponent,
    ExperimentCardComponent,
    MyExperimentsComponent,
    EditExperimentComponent,
    ConfirmModalComponent,
    InscripcioExperimentComponent,
    ExperimentModalComponent,
    ExperimentEditModalComponent,
    GruposInvestComponent,
    NewGroupComponent,
    MyExperimentsInscriptionsComponent,
    NewGroupComponent,
    GroupCardComponent,
    InscripcionsUsersModalComponent
  ],
  entryComponents: [ConfirmModalComponent, ExperimentModalComponent, ExperimentEditModalComponent, InscripcionsUsersModalComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule ,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    SuiModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAtfuI-iI5ecEch8sbJpJcJMLy1Jq0tRcM'
    })
  ],
  providers: [AuthService, FunctionsService, AngularFireDatabase, ExperimentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

const appRoutes: Routes = [
  { path: 'reset', component: ResetPasswordComponent }

];
