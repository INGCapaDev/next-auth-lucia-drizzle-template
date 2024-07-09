export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export enum ERROR_MESSAGES {
  GenericError = 'Something went wrong',
  AuthenticationError = 'You must be logged in to view this content',
  InvalidTokenError = 'The token is missing or invalid',
  ExpiredTokenError = 'The token has expired',
  EmailInUseError = 'Email is already in use',
  NotFoundError = 'Resource not found',
  MissingAccountError = 'Account not found',
  LoginError = 'Invalid email or password',
  UnverifiedAccountError = 'Account is not verified, please check your email for the verification link',
  AlreadyVerifiedError = 'Account is already verified',
}

export class AuthenticationError extends PublicError {
  constructor() {
    super(ERROR_MESSAGES.AuthenticationError);
    this.name = 'AuthenticationError';
  }
}

export class InvalidTokenError extends PublicError {
  constructor() {
    super(ERROR_MESSAGES.InvalidTokenError);
    this.name = 'InvalidTokenError';
  }
}

export class ExpiredTokenError extends PublicError {
  constructor() {
    super(ERROR_MESSAGES.ExpiredTokenError);
    this.name = 'ExpiredTokenError';
  }
}

export class EmailInUseError extends PublicError {
  constructor() {
    super(ERROR_MESSAGES.EmailInUseError);
    this.name = 'EmailInUseError';
  }
}

export class NotFoundError extends PublicError {
  constructor() {
    super(ERROR_MESSAGES.NotFoundError);
    this.name = 'NotFoundError';
  }
}

export class MissingAccountError extends PublicError {
  constructor() {
    super(ERROR_MESSAGES.MissingAccountError);
    this.name = 'MissingAccountError';
  }
}

export class LoginError extends PublicError {
  constructor() {
    super(ERROR_MESSAGES.LoginError);
    this.name = 'LoginError';
  }
}

export class UnverifiedAccountError extends PublicError {
  constructor() {
    super(ERROR_MESSAGES.UnverifiedAccountError);
    this.name = 'UnverifiedAccountError';
  }
}

export class AlreadyVerifiedError extends PublicError {
  constructor() {
    super(ERROR_MESSAGES.AlreadyVerifiedError);
    this.name = 'AlreadyVerifiedError';
  }
}
