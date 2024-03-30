import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/models/Chat';
import { Unread } from 'src/app/models/Unread';
import { ChatService } from 'src/app/services/chat.service';
import { UnreadService } from 'src/app/services/unread.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss'],
})
export class ConnectionsComponent {
  public chats$!: Observable<Chat[]>;
  public mainChat$!: Observable<Chat | undefined>;
  public unreads$!: Observable<Unread[]>;

  constructor(
    private chatService: ChatService,
    private unreadService: UnreadService
  ) {
    this.chats$ = this.chatService.getChats();
    this.mainChat$ = this.chatService.getMainChat();
    this.unreads$ = this.unreadService.getUnreads();
  }

  public setChatId(id: number): void {
    this.chatService.setMainChatById(id);
    this.unreadService.resetUnreadForChat(id);
  }
}
