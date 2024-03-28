import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/models/Chat';
import { MessageData } from 'src/app/models/MessageData';
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
    this.chat$ = this.chatService.getSelectedChat();
  }

  sendMessage(chatId: number) {
    const messageData: MessageData = {
      content: this.messageContent,
      chatId: chatId,
      sender: this.user,
    };

    console.log('chatId', messageData.chatId);

    this.stompService.sendMessage('/app/chat', messageData);
    this.messageContent = '';
  }
}
