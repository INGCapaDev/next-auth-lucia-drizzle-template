'use server';
import { getVerificationTokenByEmailService } from '@/backend/services/authenticationService';
import { env } from '@/config/env';
import { VerificationEmailSchema } from '@/lib/validations/auth';
import { baseAction } from '@/lib/zsa-procedures';

export const getVerificationTokenAction = baseAction
  .input(VerificationEmailSchema)
  .handler(async ({ input }) => {
    const token = await getVerificationTokenByEmailService(input.email);
    return {
      message: 'Verification token has been sent to your email',
      emailLink: `${env.HOST_NAME}/api/login/verify-email?token=${token}`,
    };
  });
