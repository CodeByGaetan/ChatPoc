import { MessageData } from './MessageData';

export interface Chat {
  id: number;
  messages: MessageData[];
  unread: number;
}
