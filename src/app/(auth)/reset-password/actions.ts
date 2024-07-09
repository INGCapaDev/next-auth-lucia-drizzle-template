'use server';

import { ServiceLocator } from '@/backend/services/serviceLocator';
import { ResetPasswordSchema } from '@/lib/validations/auth';
import { baseAction } from '@/lib/zsa-procedures';

export const resetPassword = baseAction
  .input(ResetPasswordSchema)
  .handler(async ({ input }) => {
    const authenticationService = ServiceLocator.getService(
      'AuthenticationService'
    );

    await authenticationService.changePassword(input.password, input.token);
  });
