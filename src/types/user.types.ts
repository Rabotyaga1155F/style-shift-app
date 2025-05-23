export interface IUser {
  userID: string;
  username: string;
  email: string;
  roles: string[];
  verification: boolean;
  balance: number;
}
