import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/models/Chat';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/User';
import { ChatService } from 'src/app/services/chat.service';
import { StompService } from '../../services/stomp.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  @Input() user!: User;

  chat$!: Observable<Chat | undefined>;

  messageContent = '';

  constructor(
    private stompService: StompService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chat$ = this.chatService.getMainChat();
  }

  public sendMessage(chatId: number): void {
    const message: Message = {
      content: this.messageContent,
      toCustomer: !this.user.isCustomer,
    };
    const path = `/app/chat/${chatId}`;
    this.stompService.sendMessage(path, message);
    this.messageContent = '';
  }
}
