import {IBase} from '@/types/base.types.ts';

export interface IUser extends IBase {
  UserName: string;
  Email: string;
  PhoneNumber: string;
  Verification: boolean;
  LockoutEnd: Date;
  LockoutEnabled: boolean;
  AccessFailedCount: number;
  EmailConfirmed: boolean;
  PhoneNumberConfirmed: boolean;
  TwoFactorEnabled: boolean;
  SecurityStamp: string;
}
