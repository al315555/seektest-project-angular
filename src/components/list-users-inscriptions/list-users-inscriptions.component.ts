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

  constructor(public experimentService: ExperimentsService) { this.listasesiones = new Array(); }

  ngOnInit() {
    this.listaUsuariosInscritos = this.experimentService.obtenerUsuariosInscritosAExperimento(this.expKey);
  }

  obtenerEdad(fechaNacimiento: number): number {
    const today = new Date().getTime();
    const dif = today - fechaNacimiento;
    const age = Math.round(dif / 3.154e10); /*MILISEGUNDOS EN UN AÑO*/
    return age;
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
