'use server';

import { signInService } from '@/backend/services/authenticationService';
import { site } from '@/config/site';
import { setSession } from '@/lib/session';
import { SignInWithPasswordFormSchema } from '@/lib/validations/auth';
import { baseAction } from '@/lib/zsa-procedures';
import { redirect } from 'next/navigation';

export const signInAction = baseAction
  .input(SignInWithPasswordFormSchema)
  .handler(async ({ input }) => {
    const { email, password } = input;

    const { id } = await signInService(email, password);
    await setSession(id);
    redirect(site.afterLoginRedirect);
  });
