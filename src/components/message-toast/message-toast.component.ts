import { Component, OnInit } from '@angular/core';
import { MessageToast } from '../../models/message-toast';

@Component({
  selector: 'app-message-toast',
  templateUrl: './message-toast.component.html',
  styleUrls: ['./message-toast.component.css']
})
export class MessageToastComponent {
  messages: MessageToast[];

  constructor() { 
    this.messages = [];
  }

  pushMessage(message: MessageToast){
    this.messages.push(message);
  }

}
