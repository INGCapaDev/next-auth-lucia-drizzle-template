'use server';

import { changePasswordService } from '@/backend/services/authenticationService';
import { ResetPasswordSchema } from '@/lib/validations/auth';
import { baseAction } from '@/lib/zsa-procedures';

export const resetPasswordAction = baseAction
  .input(ResetPasswordSchema)
  .handler(async ({ input }) => {
    await changePasswordService(input.password, input.token);
  });
