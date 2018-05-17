import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../app/core/User';
import {AuthService} from '../../app/auth.service';
import {ExperimentsService} from '../../app/experiments.service';
import {Inscription} from '../../models/inscription';

@Component({
  selector: 'app-list-users-inscriptions',
  templateUrl: './list-users-inscriptions.component.html',
  styleUrls: ['./list-users-inscriptions.component.css']
})
export class ListUsersInscriptionsComponent implements OnInit {

  @Input() expKey: string;
  @Input() inscripciones: Inscription[];

  listaUsuariosInscritos: User[];
  listasesiones: number[];
  finalizado: boolean;

  constructor(public experimentService: ExperimentsService,
  private auth: AuthService) { this.listasesiones = new Array(); this.listaUsuariosInscritos = []; }

  ngOnInit() {
    console.log(this.expKey);
    this.listaUsuariosInscritos = this.experimentService.obtenerUsuariosInscritosAExperimento(this.expKey);
    console.log(this.listaUsuariosInscritos);
    this.finalizado = true;
    this.inscripciones.forEach(value => {
      if (value.session > new Date().getTime()) {
        console.log('FECHA_: ' + value);
        this.finalizado = false;
      }
    });
  }

  obtenerEdad(fechaNacimiento: number): number {
    const today = new Date().getTime();
    const dif = today - fechaNacimiento;
    const age = Math.round(dif / 3.154e10); /*MILISEGUNDOS EN UN AÑO*/
    return age;
  }

  devolverColor(state: number) {
    switch (state) {
      case Inscription.DENEGADO:
        return 'red';
      case Inscription.ACEPTADO:
        return 'green';
      case Inscription.PENDIENTE:
        return 'blue';
      case Inscription.CANCELADO:
        return 'grey';
      default:
        return 'black';
    }
  }

  obtenerFechaEnString(sesion: number): string {
    const fecha = new Date();
    fecha.setTime(sesion);
    return fecha.getDay() + '/' + fecha.getMonth() + '/' + fecha.getFullYear()
      + ' - ' + fecha.getHours() + ':' + fecha.getMinutes();
  }

  aceptarEnExperimento(userUid: string) {
    this.inscripciones.forEach(inscription => {
      const uidIns = inscription.uid;
      if (uidIns === userUid) {
        inscription.state = Inscription.ACEPTADO;
        const user = this.auth.getUserEmail(uidIns);
        // envio de email al usuario aceptado
        user.snapshotChanges()
          .map(actions => {
            return actions.map(action => ({ key: action.key, ...action.payload.val() }));
          })
          .subscribe((value) => {
            if (value !== undefined) {
              value.forEach((val: User) => {
                if (val._name !== undefined) {
                  console.log(val._name + ' --> ' + val._email );
                  this.auth.sendEmail(val._email, 'SEEKTEST: Inscripción a experimento ACEPTADA',
                    'cuerpo del correo');
                }
              });
            }
          });
      }
    });
  }

  denegarEnExperimento(userUid: string) {
    this.inscripciones.forEach(inscription => {
      const uidIns = inscription.uid;
      if (uidIns === userUid) {
        inscription.state = Inscription.DENEGADO;
      }
    });
  }

  /*getInscription(userUid: string): Inscription {
      this.inscripciones.forEach(inscription => {
        console.log(inscription.uid === userUid);
        if (inscription.uid === userUid) {
          return inscription;
        }
      });
    return new Inscription();
  }*/

}
