import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Experiment } from '../../models/experiment';
import { ExperimentsService } from '../../app/experiments.service';
import {SuiModalService, TemplateModalConfig, ModalTemplate, ModalConfig, ModalSize} from 'ng2-semantic-ui';

export interface IContext {
  data:string;
}


@Component({
  selector: 'app-experiment-card',
  templateUrl: './experiment-card.component.html',
  styleUrls: ['./experiment-card.component.css']
})
export class ExperimentCardComponent implements OnInit {

  @Output() clickEvEm = new EventEmitter<any>();
  @Input() expe: any;
  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>

  @ViewChild('modalTemplateEdit')
  public modalTemplateEdit: ModalTemplate<IContext, string, string>

  isOwn: boolean;

  private clicked: boolean;

  constructor(public experimentService: ExperimentsService, public modalService: SuiModalService) {

  }

  ngOnInit() {
    console.log(this.expe);
    if (this.expe.uidPublisher == localStorage.getItem('uid_usuario')){
      this.isOwn = true;
    } else {
      this.isOwn = false;
    }

  }

  deleteExperDb(){
    if(this.isOwn){
      this.experimentService.deleteExperiment(this.expe.key);
    }
  }

  openModal() {
    this.clickEvEm.emit(this.expe);
  }

  deleteExperiment(dynamicContent: string = 'Desea eliminar el experimento ' + this.expe.title + '?') {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
    config.closeResult = 'Eliminado!';
    config.context = { data: dynamicContent };
    config.mustScroll = true;
    config.size = ModalSize.Tiny;
    this.modalService
        .open(config)
        .onApprove(result => { this.deleteExperDb(); })
          .onDeny(result => {});
  }

  editExperiment(){
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplateEdit);
    config.isFullScreen = true;
    config.closeResult = 'Editado!';
    config.mustScroll=true;
    config.size = ModalSize.Tiny;
    this.modalService
        .open(config)
        .onApprove(result => {})
          .onDeny(result => {});
  }

}
