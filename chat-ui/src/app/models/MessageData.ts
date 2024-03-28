import { User } from './User';

export interface MessageData {
  content: string;
  chatId: number;
  sender: User;
}
