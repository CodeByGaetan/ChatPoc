import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  prenoms: string[] = [
    'Emma',
    'Lucas',
    'Léa',
    'Gabriel',
    'Manon',
    'Louis',
    'Jade',
    'Adam',
    'Camille',
    'Hugo',
    'Chloé',
    'Jules',
    'Sarah',
    'Nathan',
    'Inès',
  ];

  public genererPrenom(): string {
    const index = Math.floor(Math.random() * this.prenoms.length);
    return this.prenoms[index];
  }

  public genererId(): number {
    return Math.floor(Math.random() * 10000);
  }
}
