'use server';
import {
  getVerificationTokenByEmailService,
  registerUserService,
} from '@/backend/services/authenticationService';
import { SignUpInputSchema } from '@/lib/validations/auth';
import { baseAction } from '@/lib/zsa-procedures';
import { redirect } from 'next/navigation';

export const signUpAction = baseAction
  .input(SignUpInputSchema)
  .handler(async ({ input }) => {
    await registerUserService(input.email, input.password);

    await getVerificationTokenByEmailService(input.email);
    // TODO: Send email with verification token

    return redirect('/login');
  });
