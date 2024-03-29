import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Unread } from '../models/Unread';

@Injectable({
  providedIn: 'root',
})
export class UnreadService {
  private unreads = new BehaviorSubject<Unread[]>([]);

  constructor() {}

  public incrementUnreadForChat(chatId: number): void {
    const unread = this.findUnreadByChatId(chatId);
    if (unread) {
      unread.count++;
    } else {
      this.unreads.value.push({ chatId, count: 1 });
    }
    this.unreads.next(this.unreads.value);
  }

  private findUnreadByChatId(chatId: number): Unread | undefined {
    return this.unreads.value.find((u) => u.chatId === chatId);
  }

  public resetUnreadForChat(chatId: number): void {
    const unread = this.findUnreadByChatId(chatId);
    if (unread) {
      unread.count = 0;
    }
    this.unreads.next(this.unreads.value);
  }

  public getUnreads(): Observable<Unread[]> {
    return this.unreads.asObservable();
  }
}
