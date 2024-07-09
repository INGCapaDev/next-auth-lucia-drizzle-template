import { roleEnum } from '../constants/database';

export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}
export type UserRole = (typeof roleEnum)[number];
export interface DatabaseUserAttributes {
  id: string;
  role: UserRole;
  email: string;
}
