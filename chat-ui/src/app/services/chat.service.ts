import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chat } from '../models/Chat';
import { MessageData } from '../models/MessageData';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chats = new BehaviorSubject<Chat[]>([]);
  private selectedChat = new BehaviorSubject<Chat | undefined>(undefined);

  constructor() {}

  public getChats(): Observable<Chat[]> {
    return this.chats.asObservable();
  }

  public createChat(chatId: number): Chat {
    const chat: Chat = {
      id: chatId,
      messages: [],
      unread: 0,
    };
    this.chats.next([...this.chats.value, chat]);
    return chat;
  }

  public getOrCreateChat(chatId: number): Chat {
    const chat = this.chats.value.find((c) => c.id === chatId);
    if (chat) {
      return chat;
    } else {
      return this.createChat(chatId);
    }
  }

  public addMessageToChat(chatId: number, message: MessageData): void {
    const chat = this.getOrCreateChat(chatId);
    chat.messages.push(message);

    if (chat != this.selectedChat.value) {
      chat.unread++;
    }

    this.chats.next(this.chats.value);
  }

  public removeChat(chatId: number): void {
    this.chats.next(this.chats.value.filter((c) => c.id !== chatId));

    if (this.selectedChat.value?.id === chatId) {
      this.selectedChat.next(undefined);
    }
  }

  public setSelectedChat(chatId: number): void {
    const chat = this.getOrCreateChat(chatId);
    chat.unread = 0;
    this.selectedChat.next(chat);
    this.chats.next(this.chats.value);
  }

  public getSelectedChat(): Observable<Chat | undefined> {
    console.log('getSelectedChat');

    return this.selectedChat.asObservable();
  }
}
