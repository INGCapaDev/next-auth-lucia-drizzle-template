'use server';
import { ServiceLocator } from '@/backend/services/serviceLocator';
import { SignUpInputSchema } from '@/lib/validations/auth';
import { baseAction } from '@/lib/zsa-procedures';
import { redirect } from 'next/navigation';

export const signup = baseAction
  .input(SignUpInputSchema)
  .handler(async ({ input }) => {
    const authenticationService = ServiceLocator.getService(
      'AuthenticationService'
    );

    await authenticationService.registerUser(input.email, input.password);

    await authenticationService.getVerificationToken(input.email);
    // TODO: Send email with verification token

    return redirect('/login');
  });
