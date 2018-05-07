import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AngularFireDatabase, AngularFireList, snapshotChanges} from 'angularfire2/database';
import {FunctionsService} from '../../app/functions.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {NotifyService} from '../../app/core/notify.service';
import {User} from '../../app/core/User';
import {Experiment} from '../../models/experiment';
import {ExperimentsService} from '../../app/experiments.service';
import {getQueryValue} from '@angular/core/src/view/query';
import {UserProfile} from '../../models/user-profile';
import {Inscription} from '../../models/inscription';
import {AuthService} from '../../app/auth.service';
import {ModalConfirm} from '../modal/confirm-modal.component';
import {ModalSize, SuiModalService} from 'ng2-semantic-ui';



@Component({
  selector: 'app-experiment-data',
  templateUrl: './experiment-data.component.html',
  styleUrls: ['./experiment-data.component.css']
})
export class ExperimentDataComponent implements OnInit {

  modal: any;
  mesesAnyo =
    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayor', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  mes: string;

  isOwn: boolean;
  experimentoRealizado: boolean;

  numeroEstrellas: number;

  @Input() item: any;
  @Input() itemDates: Date[];

  monthDates: number[];
  noDataString = 'sin datos definidos';

  sesionesInscrito: boolean[];

  estaInscrito: boolean;

  constructor(public experimentService: ExperimentsService , public functions: FunctionsService, private auth: AuthService,
              private modalService: SuiModalService) {
    this.monthDates = new Array();
    this.sesionesInscrito = new Array();
  }

  ngOnInit() {
    this.itemDates.forEach(value => {
      console.log("Valor:",value);
      this.monthDates.push(value.getMonth());
    });
    if (this.item.uidPublisher === localStorage.getItem('uid_usuario')) {
      this.isOwn = true;
    } else {
      this.isOwn = false;
    }
    if (this.item.inscriptions && this.item.inscriptions.length > 0) {
      this.numeroEstrellas = 2;
      this.item.inscriptions.forEach(element => {
        if(element.uid == localStorage.getItem('uid_usuario')){
          console.log(this.compararFechas(new Date(element.session), new Date()))
        }
      });
      
    }
    
    /*if (this.item.date === ) {
      this.isOwn = true;
    } else {
      this.isOwn = false;
    }*/

    if (this.item.inscriptions && this.item.inscriptions.length > 0) {
        let indice = 0;
        this.item.inscriptions.forEach(value => {
          this.sesionesInscrito.push(value.uid === localStorage.getItem('uid_usuario'));
          this.estaInscrito = value.uid === localStorage.getItem('uid_usuario');
          indice++;
        });
    }
    console.log(this.sesionesInscrito);
  }

  inscribirseA(date: Date) {
    const inscription: Inscription = new Inscription();
    inscription.session = date.getTime();
    inscription.state = Inscription.PENDIENTE;
    inscription.uid = localStorage.getItem('uid_usuario');
    console.log('Creada inscripción: ' + inscription);
    this.modalService
      .open(new ModalConfirm('Enviar petición de inscripción',
        '¿Está seguro de que desea inscribirse a esta sesión?' +
        'Tendrá que esperar a ser aceptado por los investigadores.', ModalSize.Tiny))
      .onApprove(() => {this.inscribirse(inscription); })
      .onDeny(() => { console.log('Cancelled'); });
  }

  private inscribirse(inscription: Inscription) {
    this.experimentService.addInscriptionToExperiment(inscription, this.item);
    let indice = 0;
    this.item.inscriptions.forEach(value => {
      this.sesionesInscrito.push(value.uid === localStorage.getItem('uid_usuario'));
      indice++;
    });
    this.estaInscrito = true;
  }

  cancelarInscripcion(index: number) {
    this.modalService
      .open(new ModalConfirm('Cancelar asistencia a la sesión',
        '¿Está seguro de que desea cancelar la inscripción?' +
        'La acción se no puede deshacer.', ModalSize.Tiny))
      .onApprove(() => {this.cancelarIns(index); })
      .onDeny(() => { console.log('Cancelled'); });

  }

  private cancelarIns(index: number) {
    this.item.inscriptions[index].state = 3;
    this.experimentService.updateInscriptionsOfExperiment(this.item);
  }
  
  compararFechas(dateExperimento, dateActual) {
    console.log("Fechas: ",dateExperimento, dateActual)
    this.experimentoRealizado = dateExperimento<dateActual
  }

  obtenerValor(){
    this.experimentService.valorarExperimento(this.item,this.numeroEstrellas);
    //console.log("Valoracion",this.numeroEstrellas)
  }
}


