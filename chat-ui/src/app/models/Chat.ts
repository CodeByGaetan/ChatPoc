import { Message } from './Message';
import { User } from './User';

export interface Chat {
  id: number;
  customer: User;
  employee: User;
  messages: Message[];
  status: Status;
}

export enum Status {
  OPENED = 'OPENED',
  CLOSED = 'CLOSED',
  REFUSED = 'REFUSED',
}
