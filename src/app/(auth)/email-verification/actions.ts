'use server';
import { ServiceLocator } from '@/backend/services/serviceLocator';
import { env } from '@/config/env';
import { VerificationEmailSchema } from '@/lib/validations/auth';
import { baseAction } from '@/lib/zsa-procedures';

export const getVerificationToken = baseAction
  .input(VerificationEmailSchema)
  .handler(async ({ input }) => {
    const AuthenticationService = ServiceLocator.getService(
      'AuthenticationService'
    );
    const token = await AuthenticationService.getVerificationToken(input.email);
    return {
      message: 'Verification token has been sent to your email',
      emailLink: `${env.HOST_NAME}/api/login/verify-email?token=${token}`,
    };
  });
