export interface User {
  name: string;
  id: number;
  userType: UserType;
}

export enum UserType {
  employee = 'employee',
  customer = 'customer',
  automate = 'automate',
}
