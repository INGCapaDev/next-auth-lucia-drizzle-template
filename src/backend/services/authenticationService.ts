import { getSalt } from '@/lib/constants/crypto';
import { createTransactions } from '@/lib/database-utils';
import {
  AlreadyVerifiedError,
  EmailInUseError,
  ExpiredTokenError,
  InvalidTokenError,
  LoginError,
  MissingAccountError,
  UnverifiedAccountError,
} from '@/lib/errors';
import { GoogleUser } from '@/lib/types/auth';
import { hashPassword } from '@/lib/utils';
import {
  createAccount,
  createAccountViaGoogle,
  getAccountByGoogleID,
  getPasswordAccountByUserID,
  updatePassword,
} from '../repositories/accountsRepository';
import { createProfile, getProfile } from '../repositories/profilesRepository';
import {
  createUser,
  getUserByEmail,
  verifyEmail,
} from '../repositories/usersRepository';
import {
  createResetTokenService,
  createVerificationTokenService,
  deleteResetTokenService,
  deleteVerificationTokenService,
  getResetTokenService,
  getVerificationTokenService,
} from './tokenService';

export async function registerUserService(email: string, _password: string) {
  let user = await getUserByEmail(email);

  if (!user) {
    user = await createUser(email);
  }

  const existingAccount = await getPasswordAccountByUserID(user.id);
  if (existingAccount) throw new EmailInUseError();

  const salt = getSalt();
  const password = await hashPassword(_password, salt);

  await createAccount(user.id, password, 'email', salt);
  await createProfile(user.id);
  return { id: user.id };
}

export async function forgotPasswordService(email: string) {
  const user = await getUserByEmail(email);
  if (!user) throw new MissingAccountError();

  const existingAccount = await getPasswordAccountByUserID(user.id);
  if (!existingAccount) throw new MissingAccountError();

  const token = await createResetTokenService(user.id);
  return token;
}

export async function getVerificationTokenByEmailService(email: string) {
  const user = await getUserByEmail(email);
  if (!user) throw new MissingAccountError();

  const existingAccount = await getPasswordAccountByUserID(user.id);
  if (!existingAccount) throw new MissingAccountError();

  if (user.emailVerified) throw new AlreadyVerifiedError();

  const token = await createVerificationTokenService(user.id);
  return token;
}

export async function verifyEmailService(token: string) {
  const existingToken = await getVerificationTokenService(token);

  if (!existingToken) throw new InvalidTokenError();
  const expirationTime = existingToken.tokenExpiresAt as unknown as number;
  if (expirationTime < new Date().getTime()) {
    await deleteVerificationTokenService(token);
    throw new ExpiredTokenError();
  }

  const userID = existingToken.userID;
  await createTransactions(async (trx) => {
    await deleteVerificationTokenService(token, trx);
    await verifyEmail(userID, trx);
  });
}

export async function changePasswordService(
  newPassword: string,
  token: string
) {
  const existingToken = await getResetTokenService(token);

  if (!existingToken) throw new InvalidTokenError();
  const expirationTime = existingToken.tokenExpiresAt as unknown as number;
  if (expirationTime < new Date().getTime()) {
    await deleteResetTokenService(token);
    throw new ExpiredTokenError();
  }

  const userID = existingToken.userID;
  const salt = getSalt();
  const password = await hashPassword(newPassword, salt);
  await createTransactions(async (trx) => {
    await deleteResetTokenService(token, trx);
    await updatePassword(userID, password, salt, trx);
  });
}

async function _verifyPassword(plainTextPassword: string, userID: string) {
  const account = await getPasswordAccountByUserID(userID);
  if (!account) return false;
  const { salt, password } = account;
  if (!salt || !password) return false;

  const hashedPassword = await hashPassword(plainTextPassword, salt);
  return hashedPassword == password;
}

export async function signInService(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) throw new MissingAccountError();

  const isCorrectPassword = await _verifyPassword(password, user.id);
  if (!isCorrectPassword) throw new LoginError();
  if (!user.emailVerified) throw new UnverifiedAccountError();
  return { id: user.id };
}

export async function createGoogleUserService(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);
  if (!existingUser) {
    existingUser = await createUser(googleUser.email);
  }

  await createAccountViaGoogle(existingUser.id, googleUser.sub, 'google');
  await createProfile(existingUser.id, googleUser.name, googleUser.picture);
  return { id: existingUser.id };
}

export async function getAccountByGoogleIdService(googleId: string) {
  return getAccountByGoogleID(googleId);
}

export async function getProfileUserService(userID: string) {
  return await getProfile(userID);
}
