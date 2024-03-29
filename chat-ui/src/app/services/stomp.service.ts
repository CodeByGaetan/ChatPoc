import { Injectable } from '@angular/core';
import {
  Client,
  Stomp,
  StompHeaders,
  Message as StompMessage,
  StompSubscription,
} from '@stomp/stompjs';
import { Message } from '../models/Message';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  private client: Client | null = null;
  private connected = false;
  private connectionPromise: Promise<void> | null = null;

  constructor() {}

  public connect(user: User): void {
    this.connectionPromise = new Promise<void>((resolve, reject) => {
      this.client = Stomp.client('ws://localhost:8080/gs-guide-websocket');

      this.client.onConnect = () => {
        this.connected = true;
        resolve();
      };

      this.client.onDisconnect = () => {
        this.connected = false;
      };

      this.client.onStompError = () => {
        reject();
      };

      let connectHeaders: StompHeaders = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isCustomer: user.isCustomer.toString(),
      };

      this.client.connectHeaders = connectHeaders;

      this.client.activate();
    });
  }

  public async subscribe(
    topic: string,
    callback: (stompMessage: StompMessage) => void
  ): Promise<StompSubscription> {
    if (!this.connected) {
      await this.connectionPromise;
    }

    if (this.client === null) {
      throw new Error('Client is null.');
    }

    return this.client.subscribe(topic, callback);
  }

  public sendMessage(destination: string, message: Message): void {
    if (this.client === null) {
      throw new Error('Client is null.');
    }
    this.client.publish({
      destination: destination,
      body: JSON.stringify(message),
    });
  }

  public unsubscribe(subscription: StompSubscription): void {
    subscription.unsubscribe();
  }

  public disconnect(): void {
    if (this.client === null) {
      throw new Error('Client is null.');
    }
    this.client.deactivate();
  }
}

// private async ensureConnected(): Promise<void> {
//   if (!this.client || !this.client.connected) {
//     await this.connectionPromise;
//   }

//   if (this.client === null) {
//     throw new Error('Client is null.');
//   }
// }

// public connect(user: User): void {
//   this.connectionPromise = new Promise<void>((resolve, reject) => {
//     this.client = Stomp.client('ws://localhost:8080/gs-guide-websocket');

//     this.client.onConnect = () => {
//       resolve();
//     };

//     this.client.onStompError = () => {
//       reject();
//     };

//     let connectHeaders: StompHeaders = {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       isCustomer: user.isCustomer.toString(),
//     };

//     this.client.connectHeaders = connectHeaders;

//     this.client.activate();
//   });
// }

// public async subscribe(
//   topic: string,
//   callback: (stompMessage: StompMessage) => void
// ): Promise<StompSubscription> {
//   await this.ensureConnected();
//   return this.client.subscribe(topic, callback);
// }
