import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chats = new BehaviorSubject<Chat[]>([]);
  private mainChatId = new BehaviorSubject<number | undefined>(undefined);

  constructor() {}

  // OK
  public setMainChatById(chatId: number): void {
    const chat = this.findChatById(chatId);
    if (!chat) {
      throw new Error('Chat not found.');
    }
    this.mainChatId.next(chatId);
  }

  private findChatById(chatId: number): Chat | undefined {
    return this.chats.value.find((c) => c.id === chatId);
  }

  // OK
  public addMessageToMainChat(message: Message) {
    const chat = this.getMainChatValue();
    if (chat) {
      chat.messages.push(message);
      this.updateChat(chat);
    }
  }

  private getMainChatValue(): Chat | undefined {
    if (!this.mainChatId.value) {
      return undefined;
    }
    return this.findChatById(this.mainChatId.value);
  }

  private updateChat(chat: Chat) {
    const chats = this.chats.value;
    const index = chats.findIndex((c) => c.id === chat.id);
    if (index === -1) {
      throw new Error('Chat not found.');
    }
    chats[index] = chat;
    this.chats.next(chats);
  }

  // OK
  public getMainChat(): Observable<Chat | undefined> {
    return this.mainChatId.pipe(
      switchMap((chatId) => {
        if (chatId) {
          return of(this.findChatById(chatId));
        } else {
          return of(undefined);
        }
      })
    );
  }

  // OK
  public addToChats(chat: Chat): void {
    if (this.findChatById(chat.id)) {
      throw new Error('Chat already exists in the list.');
    }

    this.chats.next([...this.chats.value, chat]);
  }

  // OK
  removeFromChats(chat: Chat) {
    if (chat.id === this.mainChatId.value) {
      this.mainChatId.next(undefined);
    }
    this.chats.next(this.chats.value.filter((c) => c.id !== chat.id));
  }

  // OK
  public getMainChatId(): number | undefined {
    return this.mainChatId.value;
  }

  // OK
  public addMessageToChat(id: number, message: Message) {
    const chat = this.findChatById(id);
    if (chat) {
      chat.messages.push(message);
      this.updateChat(chat);
    }
  }

  // OK
  public getChats(): Observable<Chat[]> {
    return this.chats.asObservable();
  }
}
