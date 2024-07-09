import { AccountsRepository } from '../repositories/accountsRepository';
import { ProfilesRepository } from '../repositories/profilesRepository';
import { ResetTokensRepository } from '../repositories/resetTokensRepository';
import { UsersRepository } from '../repositories/usersRepository';
import { VerifyTokensRepository } from '../repositories/verifyTokensRepository';

import { AuthenticationService } from './authenticationService';
import { TokenService } from './tokenService';

interface ServiceMap {
  AuthenticationService: AuthenticationService;
  TokenService: TokenService;
}

interface RepositoryMap {
  UsersRepository: UsersRepository;
  ProfilesRepository: ProfilesRepository;
  AccountsRepository: AccountsRepository;
  ResetTokensRepository: ResetTokensRepository;
  VerifyTokensRepository: VerifyTokensRepository;
}

export class ServiceLocator {
  private static _serviceCache: Partial<Record<keyof ServiceMap, any>> = {};
  private static _repositoryCache: Partial<Record<keyof RepositoryMap, any>> =
    {};

  private static _serviceFactory: {
    [K in keyof ServiceMap]: () => ServiceMap[K];
  } = {
    AuthenticationService: () => {
      const usersRepository =
        ServiceLocator.getOrCreateRepository('UsersRepository');
      const profilesRepository =
        ServiceLocator.getOrCreateRepository('ProfilesRepository');
      const accountsRepository =
        ServiceLocator.getOrCreateRepository('AccountsRepository');
      return new AuthenticationService(
        usersRepository,
        profilesRepository,
        accountsRepository,
        ServiceLocator.getService('TokenService')
      );
    },
    TokenService: () => {
      const verifyTokensRepository = ServiceLocator.getOrCreateRepository(
        'VerifyTokensRepository'
      );
      const resetTokensRepository = ServiceLocator.getOrCreateRepository(
        'ResetTokensRepository'
      );
      return new TokenService(verifyTokensRepository, resetTokensRepository);
    },
  };

  private static _repositoryFactory: {
    [K in keyof RepositoryMap]: () => RepositoryMap[K];
  } = {
    AccountsRepository: () => new AccountsRepository(),
    ProfilesRepository: () => new ProfilesRepository(),
    UsersRepository: () => new UsersRepository(),
    ResetTokensRepository: () => new ResetTokensRepository(),
    VerifyTokensRepository: () => new VerifyTokensRepository(),
  };

  private static getOrCreateRepository<T extends keyof RepositoryMap>(
    name: T
  ): RepositoryMap[T] {
    const repository = this._repositoryCache[name];

    if (repository) {
      console.log(
        `${name} repository is cached! Returning the cached version.`
      );
      return repository;
    }

    console.log(`Creating ${name} repository...`);
    const newRepository = this._repositoryFactory[name]();

    console.log(`Caching ${name} repository...`);
    this._repositoryCache[name] = newRepository;
    return newRepository;
  }

  static getService<T extends keyof ServiceMap>(name: T): ServiceMap[T] {
    const service = this._serviceCache[name];

    if (service) {
      console.log(`${name} service is cached! Returning the cached version.`);
      return service;
    }

    console.log(`Creating ${name} service...`);
    const createdService = this._serviceFactory[name]();

    console.log(`Caching ${name} service...`);
    this._serviceCache[name] = createdService;
    return createdService;
  }
}
