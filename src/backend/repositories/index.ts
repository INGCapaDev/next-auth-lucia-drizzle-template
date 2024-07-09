import { TursoDB } from '@/database/db';
import {
  EmailAccount,
  GoogleAccount,
  SelectAccount,
  SelectProfile,
  SelectResetToken,
  SelectUser,
  SelectVerificationToken,
  UpdateProfile,
  UpdateUser,
} from '@/database/types';
import { ResultSet } from '@libsql/client';

// The repository interface is a contract that defines the methods that must be implemented by the repository.
export interface IUsersRepository {
  getUser: (userID: string) => Promise<SelectUser | undefined>;
  createUser: (email: string, emailVerified?: Date) => Promise<SelectUser>;
  deleteUser: (userID: string) => Promise<void>;
  getUserByEmail: (email: string) => Promise<SelectUser | undefined>;
  updateUser: (userID: string, data: UpdateUser) => Promise<void>;
  verifyEmail: (userID: string) => Promise<void>;
}

export interface IAccountsRepository {
  createAccount: (
    userID: string,
    password: string,
    accountType: EmailAccount,
    salt: string
  ) => Promise<SelectAccount>;
  createAccountViaGoogle: (
    userID: string,
    googleID: string,
    accountType: GoogleAccount
  ) => Promise<void>;
  getAccountByUserID: (userID: string) => Promise<SelectAccount | undefined>;
  getAccountByGoogleID: (
    googleID: string
  ) => Promise<SelectAccount | undefined>;
  updatePassword: (
    userID: string,
    password: string,
    salt: string,
    trx?: TursoDB
  ) => Promise<void>;
  getPasswordAccountByUserID: (
    userID: string
  ) => Promise<SelectAccount | undefined>;
}

export interface IProfilesRepository {
  createProfile: (
    userID: string,
    name?: string,
    image?: string
  ) => Promise<SelectProfile>;
  updateProfile: (userID: string, data: UpdateProfile) => Promise<ResultSet>;
  getProfile: (userID: string) => Promise<SelectProfile | undefined>;
}

export interface IResetTokenRepository {
  createResetToken: (
    userID: string,
    token: string,
    tokenExpiresAt: Date
  ) => Promise<SelectResetToken>;
  getResetToken: (token: string) => Promise<SelectResetToken | undefined>;
  deleteResetToken: (token: string, trx?: TursoDB) => Promise<void>;
  deleteTokensByUserID: (userID: string) => Promise<void>;
}

export interface IVerifyTokenRepository {
  createVerificationToken: (
    userID: string,
    token: string,
    tokenExpiresAt: Date
  ) => Promise<SelectVerificationToken>;
  getVerificationToken: (
    token: string
  ) => Promise<SelectVerificationToken | undefined>;
  deleteVerificationToken: (token: string) => Promise<void>;
  deleteTokensByUserID: (userID: string) => Promise<void>;
}
