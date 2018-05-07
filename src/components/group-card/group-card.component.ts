import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Experiment} from '../../models/experiment';
import {ExperimentsService} from '../../app/experiments.service';
import {SuiModalService, TemplateModalConfig, ModalTemplate, ModalConfig, ModalSize} from 'ng2-semantic-ui';
import {ModalExperiment} from '../modal/experiment-modal.component';
import {ModalConfirm} from '../modal/confirm-modal.component';
import {ModalExperimentEdit} from '../modal/experiment-edit-modal.component';
import {GruposInvestComponent} from '../grupos-invest/grupos-invest.component';
import {Group} from '../../models/group';
import {GroupsService} from '../../app/groups.service';
import {AuthService} from '../../app/auth.service';


@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit {
  @Input() grupo: Group;
  @Input() myGroup: boolean;
  @Input() hasGroup: boolean;
  @Output() dadoDeBaja = new EventEmitter();
  @Output() dadoDeAlta = new EventEmitter();

  dateCreated: Date = new Date();
  isOwn: boolean;
  messageBody: string;
  messageHeader: string;
  private clicked: boolean;
  investigadores: string;


  constructor(public experimentService: ExperimentsService, public modalService: SuiModalService, private groupsService: GroupsService
    , private authService: AuthService) {
    this.dateCreated = new Date();
    this.investigadores = '';
  }

  ngOnInit() {
    this.dateCreated.setTime(this.grupo.dateCreated);
    if (this.grupo.researchers !== undefined && this.grupo.researchers.length > 0) {
      this.grupo.researchers.forEach(researcher => {
        const refi = this.authService.getNameUserForGroups(researcher);
        refi.snapshotChanges().subscribe(value => {
          value.map(cosas => {
            this.investigadores += ', ' +
              cosas.payload.child('_name').exportVal() + ' ' +
              cosas.payload.child('_surname').exportVal();
          });
        });
      });
      this.investigadores = this.investigadores.trim().substring(2, this.investigadores.length);
    } else {
      this.investigadores = 'No hay miembros';
    }
    // this.hasGroup = this.hasGroup === null ? false : this.hasGroup;
  }

  abandonarGrupo() {
    this.messageBody = '¿Estás seguro de que quieres abandonar el grupo? Tendrás que volver unirte en un futuro.';
    this.modalService
      .open(new ModalConfirm(this.grupo.nombre, this.messageBody, ModalSize.Tiny))
      .onApprove(() => {
        console.log('User has accepted.');
        const members = this.grupo.researchers;
        const newMembers = new Array();
        const user = localStorage.getItem('uid_usuario');
        members.forEach(member => {
          if (member !== user) {
            newMembers.push(member);
          }
        });
        this.grupo.researchers = newMembers;
        this.groupsService.updateGroupData(this.grupo);

        this.dadoDeBaja.emit({dadoDeBaja: true});
      })
      .onDeny(() => {
        console.log('User said cancel.');
      });
  }

  cerrarGrupo() {
    this.messageBody = '¿Solo quedas tu en el grupo, si sales se eliminará, estás seguro?.';
    this.modalService
      .open(new ModalConfirm(this.grupo.nombre, this.messageBody, ModalSize.Tiny))
      .onApprove(() => {
        console.log('User has accepted.');
        this.groupsService.deleteGroup(this.grupo.key);
      })
      .onDeny(() => {
        console.log('User said cancel.');
      });
  }


  seleccionarGrupo() {
    this.messageBody = '¿Estás seguro de que quieres añadirte al grupo? Puedes abandonarlo cuando quieras.';
    this.modalService
      .open(new ModalConfirm(this.grupo.nombre, this.messageBody, ModalSize.Tiny))
      .onApprove(() => { // poner aquí la orde
