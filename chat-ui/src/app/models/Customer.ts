export interface Customer {
  name: string;
  id: number;
  employeeId: number;
  status: CustomerStatus;
}

export enum CustomerStatus {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
}
