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
import { AccountsRepository } from '../repositories/accountsRepository';
import { ProfilesRepository } from '../repositories/profilesRepository';
import { UsersRepository } from '../repositories/usersRepository';
import { TokenService } from './tokenService';

export class AuthenticationService {
  private _usersRepository: UsersRepository;
  private _profilesRepository: ProfilesRepository;
  private _accountsRepository: AccountsRepository;
  private _TokenService: TokenService;

  constructor(
    usersRepository: UsersRepository,
    profilesRepository: ProfilesRepository,
    accountsRepository: AccountsRepository,
    tokenService: TokenService
  ) {
    this._usersRepository = usersRepository;
    this._profilesRepository = profilesRepository;
    this._accountsRepository = accountsRepository;
    this._verifyPassword;
    this._TokenService = tokenService;
  }

  async registerUser(email: string, _password: string) {
    let user = await this._usersRepository.getUserByEmail(email);

    if (!user) {
      user = await this._usersRepository.createUser(email);
    }

    const existingAccount =
      await this._accountsRepository.getPasswordAccountByUserID(user.id);
    if (existingAccount) throw new EmailInUseError();

    const salt = getSalt();
    const password = await hashPassword(_password, salt);

    await this._accountsRepository.createAccount(
      user.id,
      password,
      'email',
      salt
    );
    await this._profilesRepository.createProfile(user.id);
    return { id: user.id };
  }

  async forgotPassword(email: string) {
    const user = await this._usersRepository.getUserByEmail(email);
    if (!user) throw new MissingAccountError();

    const existingAccount =
      await this._accountsRepository.getPasswordAccountByUserID(user.id);
    if (!existingAccount) throw new MissingAccountError();

    const token = await this._TokenService.createResetToken(user.id);
    return token;
  }

  async getVerificationToken(email: string) {
    const user = await this._usersRepository.getUserByEmail(email);
    if (!user) throw new MissingAccountError();

    const existingAccount =
      await this._accountsRepository.getPasswordAccountByUserID(user.id);
    if (!existingAccount) throw new MissingAccountError();

    if (user.emailVerified) throw new AlreadyVerifiedError();

    const token = await this._TokenService.createVerificationToken(user.id);
    return token;
  }

  async verifyEmail(token: string) {
    const existingToken = await this._TokenService.getVerificationToken(token);
    console.log('existingToken', existingToken);

    if (!existingToken) throw new InvalidTokenError();
    const expirationTime = existingToken.tokenExpiresAt as unknown as number;
    if (expirationTime < new Date().getTime()) {
      await this._TokenService.deleteVerificationToken(token);
      throw new ExpiredTokenError();
    }
    console.log('last check');

    const userID = existingToken.userID;
    await createTransactions(async (trx) => {
      await this._TokenService.deleteVerificationToken(token, trx);
      await this._usersRepository.verifyEmail(userID, trx);
    });
  }

  async changePassword(newPassword: string, token: string) {
    const existingToken = await this._TokenService.getResetToken(token);

    if (!existingToken) throw new InvalidTokenError();
    const expirationTime = existingToken.tokenExpiresAt as unknown as number;
    if (expirationTime < new Date().getTime()) {
      await this._TokenService.deleteResetToken(token);
      throw new ExpiredTokenError();
    }

    const userID = existingToken.userID;
    const salt = getSalt();
    const password = await hashPassword(newPassword, salt);
    await createTransactions(async (trx) => {
      await this._TokenService.deleteResetToken(token, trx);
      await this._accountsRepository.updatePassword(
        userID,
        password,
        salt,
        trx
      );
    });
  }

  private async _verifyPassword(plainTextPassword: string, userID: string) {
    const account = await this._accountsRepository.getPasswordAccountByUserID(
      userID
    );
    if (!account) return false;
    const { salt, password } = account;
    if (!salt || !password) return false;

    const hashedPassword = await hashPassword(plainTextPassword, salt);
    return hashedPassword == password;
  }

  async signIn(email: string, password: string) {
    const user = await this._usersRepository.getUserByEmail(email);
    if (!user) throw new MissingAccountError();

    const isCorrectPassword = await this._verifyPassword(password, user.id);
    if (!isCorrectPassword) throw new LoginError();
    if (!user.emailVerified) throw new UnverifiedAccountError();
    return { id: user.id };
  }

  async createGoogleUser(googleUser: GoogleUser) {
    let existingUser = await this._usersRepository.getUserByEmail(
      googleUser.email
    );
    if (!existingUser) {
      existingUser = await this._usersRepository.createUser(googleUser.email);
    }

    await this._accountsRepository.createAccountViaGoogle(
      existingUser.id,
      googleUser.sub,
      'google'
    );
    await this._profilesRepository.createProfile(
      existingUser.id,
      googleUser.name,
      googleUser.picture
    );
    return { id: existingUser.id };
  }

  async getAccountByGoogleId(googleId: string) {
    return this._accountsRepository.getAccountByGoogleID(googleId);
  }

  async getProfileUser(userID: string) {
    return await this._profilesRepository.getProfile(userID);
  }
}
