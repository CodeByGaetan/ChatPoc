import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/models/Chat';
import { Customer } from 'src/app/models/Customer';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss'],
})
export class ConnectionsComponent {
  @Input() connections: Customer[] = [];
  chats$!: Observable<Chat[]>;
  selectedChat$!: Observable<Chat | undefined>;

  constructor(private chatService: ChatService) {
    this.chats$ = this.chatService.getChats();
    this.selectedChat$ = this.chatService.getSelectedChat();
  }

  public setChatId(id: number): void {
    this.chatService.setSelectedChat(id);
  }
}
