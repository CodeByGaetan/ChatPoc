import { Component, HostListener } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { MessageData } from 'src/app/models/MessageData';
import { User, UserType } from 'src/app/models/User';
import { ChatService } from 'src/app/services/chat.service';
import { RandomService } from 'src/app/services/random.service';
import { StompService } from 'src/app/services/stomp.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
  public user: User = {
    name: this.randomService.genererPrenom(),
    id: this.randomService.genererId(),
    userType: UserType.customer,
  };

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    const confirmationMessage =
      'Êtes-vous sûr de vouloir quitter cette page ? Tous les messages seront perdus.';
    $event.returnValue = confirmationMessage;
    return confirmationMessage;
  }

  constructor(
    private randomService: RandomService,
    private stompService: StompService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatService.setSelectedChat(this.user.id);

    this.stompService.connect(this.user);

    this.stompService.subscribe(
      `/topic/chat/${this.user.id}`,
      (message: Message) => {
        const messageData: MessageData = JSON.parse(message.body);
        this.chatService.addMessageToChat(this.user.id, messageData);
      }
    );
  }

  ngOnDestroy(): void {
    this.stompService.disconnect();
  }
}
