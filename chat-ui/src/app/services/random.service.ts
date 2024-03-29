import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  firstNames: string[] = [
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

  lastNames: string[] = [
    'Martin',
    'Bernard',
    'Dubois',
    'Thomas',
    'Robert',
    'Richard',
    'Petit',
    'Durand',
    'Leroy',
    'Moreau',
    'Simon',
    'Laurent',
    'Lefebvre',
    'Michel',
    'Garcia',
  ];

  private generateFirstName(): string {
    const index = Math.floor(Math.random() * this.firstNames.length);
    return this.firstNames[index];
  }

  private generateLastName(): string {
    const index = Math.floor(Math.random() * this.lastNames.length);
    return this.lastNames[index];
  }

  private makeEmail(firstName: string, lastName: string): string {
    const firstNameLower = firstName.toLowerCase();
    const lastNameLower = lastName.toLowerCase();
    return `${firstNameLower}.${lastNameLower}@gmail.com`;
  }

  public generateFakeCustomer(): User {
    const firstName = this.generateFirstName();
    const lastName = this.generateLastName();
    const email = this.makeEmail(firstName, lastName);
    return {
      firstName,
      lastName,
      email,
      isCustomer: true,
    };
  }
}
