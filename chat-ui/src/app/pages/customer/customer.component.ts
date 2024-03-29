import { Component, HostListener } from '@angular/core';
import { Message as StompMessage, StompSubscription } from '@stomp/stompjs';
import { Chat, Status } from 'src/app/models/Chat';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/User';
import { ChatService } from 'src/app/services/chat.service';
import { RandomService } from 'src/app/services/random.service';
import { StompService } from 'src/app/services/stomp.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
  public user: User = this.randomService.generateFakeCustomer();

  private mainSubscription!: StompSubscription;

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

  async ngOnInit(): Promise<void> {
    this.stompService.connect(this.user);

    this.mainSubscription = await this.stompService.subscribe(
      '/topic/customer',
      (stompMessage: StompMessage) => {
        this.handleMainSubscription(stompMessage);
      }
    );
  }

  private handleMainSubscription(stompMessage: StompMessage): void {
    const chat: Chat = JSON.parse(stompMessage.body);

    // Check if the chat is for this user
    if (chat.customer.email !== this.user.email) {
      return;
    }

    this.chatService.addToChats(chat);
    this.chatService.setMainChatById(chat.id);

    if (chat.status === Status.OPENED) {
      this.subscribeToChat(chat);
    }

    this.stompService.unsubscribe(this.mainSubscription);
  }

  private subscribeToChat(chat: Chat): void {
    this.stompService.subscribe(
      `/topic/chat/${chat.id}`,
      (stompMessage: StompMessage) => {
        const message: Message = JSON.parse(stompMessage.body);
        this.chatService.addMessageToMainChat(message);
      }
    );
  }

  ngOnDestroy(): void {
    this.stompService.disconnect();
  }
}
