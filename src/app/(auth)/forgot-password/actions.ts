'use server';
import { ServiceLocator } from '@/backend/services/serviceLocator';
import { env } from '@/config/env';
import { ForgotPasswordSchema } from '@/lib/validations/auth';
import { baseAction } from '@/lib/zsa-procedures';

export const forgetPassword = baseAction
  .input(ForgotPasswordSchema)
  .handler(async ({ input }) => {
    const AuthenticationService = ServiceLocator.getService(
      'AuthenticationService'
    );
    const token = await AuthenticationService.forgotPassword(input.email);
    return {
      message: 'Password reset token has been sent to your email',
      emailLink: `${env.HOST_NAME}/reset-password?token=${token}`,
    };
  });
