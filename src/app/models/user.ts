export interface User{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  authorityNames: string[];
  creationDate: Date;
  isActive: boolean;
  }
