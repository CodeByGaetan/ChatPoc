import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  prenoms: string[] = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Emma',
    'Jacques',
    'Grace',
    'Henry',
    'Ivy',
    'Jack',
  ];

  genererPrenom(): string {
    const index = Math.floor(Math.random() * this.prenoms.length);
    return this.prenoms[index];
  }

  genererId(): number {
    return Math.floor(Math.random() * 10000);
  }
}
