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

  @Input() item: any;
  @Input() itemDates: Date[];

  finalizado: boolean;
  monthDates: number[];
  noDataString = 'sin datos definidos';

  sesionesInscrito: boolean[];

  estaInscrito: boolean;
  numeroEstrellasMedias: number;

  valorada: boolean;


  constructor(public experimentService: ExperimentsService , public functions: FunctionsService, private auth: AuthService,
              private modalService: SuiModalService) {
    this.monthDates = new Array();
    this.sesionesInscrito = new Array();
    this.finalizado = false;
    this.numeroEstrellasMedias = 0;
    this.valorada = false;
  }

  ngOnInit() {
    this.itemDates.forEach(value => {
      console.log(value);
      this.monthDates.push(value.getMonth());
    });
    if (this.item.uidPublisher === localStorage.getItem('uid_usuario')) {
      this.isOwn = true;
    } else {
      this.isOwn = false;
    }
    this.finalizado = true;
    this.item.dates.forEach(value => {
      if (value > new Date().getTime()) {
        console.log('FECHA_: ' + value);
        this.finalizado = false;
      }
    });
    if (this.item.mediaValoracion > 0 && this.item.numberVotaciones > 0) {
      this.numeroEstrellasMedias = Math.round(this.item.mediaValoracion / this.item.numberVotaciones);
    }
    if (this.item.inscriptions && this.item.inscriptions.length > 0) {
      let encontrada = false;
      this.item.inscriptions.forEach(value => {
        this.sesionesInscrito.push(value.uid === localStorage.getItem('uid_usuario'));
        if (!encontrada) {
          encontrada = value.uid === localStorage.getItem('uid_usuario');
          if (encontrada) {
            this.valorada = value.expeValue > 0;
            this.estaInscrito = true;
          }
        }
      });
    }
    console.log(this.sesionesInscrito);
  }

  inscribirseA(date: Date) {
    const inscription: Inscription = new Inscription();
    inscription.session = date.getTime();
    inscription.state = Inscription.PENDIENTE;
    inscription.uid = localStorage.getItem('uid_usuario');
    inscription.expeValue = 0;
    inscription.userValue = 0;
    console.log('Creada inscripción: ' + inscription);
    this.modalService
      .open(new ModalConfirm('Enviar petición de inscripción',
        '¿Está seguro de que desea inscribirse a esta sesión?' +
        'Tendrá que esperar a ser aceptado por los investigadores.', ModalSize.Tiny))
      .onApprove(() => {this.inscribirse(inscription); })
      .onDeny(() => { console.log('Cancelled'); });
  }

  private inscribirse(inscription: Inscription) {
    if (this.item.inscriptions === undefined) {
      this.item.inscriptions = [];
    }
    this.item.inscriptions.push(inscription);
    this.experimentService.addInscriptionToExperiment(inscription, this.item);
    this.refrescarExperimento();
  }

  cancelarInscripcion(index: number) {
    this.modalService
      .open(new ModalConfirm('Cancelar asistencia a la sesión',
        '¿Está seguro de que desea cancelar la inscripción?' +
        'La acción se no puede deshacer.', ModalSize.Tiny))
      .onApprove(() => {this.cancelarIns(index); })
      .onDeny(() => { console.log('Cancelled'); });

  }

  valorarInscripcion(index: number) {
    this.item.mediaValoracion += this.item.inscriptions[index].expeValue;
    this.item.numberVotaciones++;
    this.experimentService.updateInscriptionsOfExperiment(this.item);
    // this.refrescarExperimento();
  }

  private cancelarIns(index: number) {
    this.item.inscriptions[index].state = Inscription.CANCELADO;
    this.experimentService.updateInscriptionsOfExperiment(this.item);
    this.refrescarExperimento();
  }

  private refrescarExperimento() {
    // this.item = this.experimentService.getExperimentByKey(this.item.key);
    this.ngOnInit();
  }
}
