import { Component } from '@angular/core';
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  faTimes: IconDefinition = faTimes;

  constructor(public messagesService: MessagesService) {}
}
