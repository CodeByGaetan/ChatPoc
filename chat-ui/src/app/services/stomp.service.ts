import { Injectable } from '@angular/core';
import { Client, Message, Stomp, StompSubscription } from '@stomp/stompjs';
import { MessageData } from '../models/MessageData';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  private client: Client | null = null;
  public connected = false;
  private connectionPromise: Promise<void> | null = null;

  constructor() {
    // this.connectionPromise = this.connect(user);
  }

  // connect(user: User): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     this.client = Stomp.client('ws://localhost:8080/gs-guide-websocket');

  //     this.client.onConnect = () => {
  //       resolve();
  //       this.connected = true;
  //     };

  //     this.client.onDisconnect = () => {
  //       this.connected = false;
  //     };

  //     this.client.onStompError = (frame) => {
  //       reject();
  //     };

  //     let connectHeaders = {
  //       name: user.name,
  //       id: user.id.toString(),
  //       'user-type': user.userType,
  //     };

  //     this.client.connectHeaders = connectHeaders;

  //     this.client.activate();
  //   });
  // }

  connect(user: User) {
    this.connectionPromise = new Promise<void>((resolve, reject) => {
      this.client = Stomp.client('ws://localhost:8080/gs-guide-websocket');

      this.client.onConnect = () => {
        this.connected = true;
        resolve();
      };

      this.client.onDisconnect = () => {
        this.connected = false;
      };

      this.client.onStompError = (frame) => {
        reject();
      };

      let connectHeaders = {
        name: user.name,
        id: user.id.toString(),
        'user-type': user.userType,
      };

      this.client.connectHeaders = connectHeaders;

      this.client.activate();
    });
  }

  // subscribe(
  //   topic: string,
  //   callback: (message: Message) => void
  // ): StompSubscription {
  //   if (this.client === null) {
  //     throw new Error('Client is null.');
  //   }
  //   return this.client.subscribe(topic, callback);
  // }

  async subscribe(
    topic: string,
    callback: (message: Message) => void
  ): Promise<StompSubscription> {
    if (!this.connected) {
      await this.connectionPromise;
    }

    if (this.client === null) {
      throw new Error('Client is null.');
    }

    return this.client.subscribe(topic, callback);
  }

  sendMessage(destination: string, body: MessageData): void {
    if (this.client === null) {
      throw new Error('Client is null.');
    }
    this.client.publish({
      destination: destination,
      body: JSON.stringify(body),
    });
  }

  disconnect(): void {
    if (this.client === null) {
      throw new Error('Client is null.');
    }
    this.client.deactivate();
  }
}
