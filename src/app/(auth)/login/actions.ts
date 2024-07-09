'use server';

import { ServiceLocator } from '@/backend/services/serviceLocator';
import { site } from '@/config/site';
import { setSession } from '@/lib/session';
import { SignInWithPasswordFormSchema } from '@/lib/validations/auth';
import { baseAction } from '@/lib/zsa-procedures';
import { redirect } from 'next/navigation';

export const signin = baseAction
  .input(SignInWithPasswordFormSchema)
  .handler(async ({ input }) => {
    const authenticationService = ServiceLocator.getService(
      'AuthenticationService'
    );
    const { email, password } = input;

    const { id } = await authenticationService.signIn(email, password);
    await setSession(id);
    redirect(site.afterLoginRedirect);
  });
