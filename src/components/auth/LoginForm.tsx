'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import CardWrapper from './CardWrapper';

// import { signin } from '@/app/(auth)/login/actions';
import { ERROR_MESSAGES } from '@/lib/errors';
import { cn } from '@/lib/utils';
import { SignInWithPasswordFormSchema } from '@/lib/validations/auth';
import { getDevOnlyErrorMsg } from '@/lib/zsa-procedures';
import { zodResolver } from '@hookform/resolvers/zod';
import { Terminal } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button, buttonVariants } from '../ui/button';
import { Input } from '../ui/input';
import BackButton from './BackButton';
import GoogleIcon from './icons/GoogleIcon';

const LOGIN_FORM_STRINGS = {
  title: 'Login',
  label: 'Login to your account',
  backButtonLabel: "Don't have an account? Register here.",
  successMessage: 'You have successfully logged in',
  loadingMessage: 'Logging you in...',
  errorMessage: "We couldn't log you in.",
  errorDescription: 'An error occurred while logging you in.',
  unverifiedMessage:
    'Your account is not verified. Please check your email for the verification link.',
  emailFormLabel: 'Email',
  passwordFormLabel: 'Password',
  forgotPasswordLabel: 'Forgot password?',
  resendVerificationLabel: 'Resend verification email',
  resendVerificationCountdown: 'Resend verification email in',
  googleLogin: 'Login with Google',
  pendingButton: 'Loading...',
  submitButton: 'Login',
};

const DEFAULT_COUNT = 30;

const LoginForm = () => {
  const [isUnverified, setIsUnverified] = useState(false);
  const [count, setCount] = useState(DEFAULT_COUNT);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (!startCount) return;
    const timer = setInterval(() => {
      if (count === 0) {
        setStartCount(false);
        return clearInterval(timer);
      }
      setCount((prevCount) => prevCount - 1);
      console.log(count);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [startCount, count]);

  const { isPending, execute, error } = useServerAction(signin, {
    onError({ err }) {
      toast.error(err.message);
      if (
        err?.message == ERROR_MESSAGES.UnverifiedAccountError ||
        err?.message ==
          getDevOnlyErrorMsg(ERROR_MESSAGES.UnverifiedAccountError)
      ) {
        setIsUnverified(true);
        setStartCount(true);
      }
    },
    onSuccess() {
      toast.success(LOGIN_FORM_STRINGS.successMessage);
    },
  });

  const form = useForm({
    resolver: zodResolver(SignInWithPasswordFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const resetUnverified = () => {
    setIsUnverified(false);
    setStartCount(false);
    setCount(DEFAULT_COUNT);
  };

  async function onSubmit(
    values: z.infer<typeof SignInWithPasswordFormSchema>
  ) {
    resetUnverified();
    toast.loading(LOGIN_FORM_STRINGS.loadingMessage);
    await execute(values);
    toast.dismiss();
  }

  return (
    <CardWrapper
      label={LOGIN_FORM_STRINGS.label}
      title={LOGIN_FORM_STRINGS.title}
      backButtonHref='/register'
      backButtonLabel={LOGIN_FORM_STRINGS.backButtonLabel}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{LOGIN_FORM_STRINGS.emailFormLabel}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      placeholder='johndoe@gmail.com'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center justify-between'>
                    <FormLabel>
                      {LOGIN_FORM_STRINGS.passwordFormLabel}
                    </FormLabel>
                    <BackButton
                      isInline
                      href='/forgot-password'
                      label={LOGIN_FORM_STRINGS.forgotPasswordLabel}
                    />
                  </div>

                  <FormControl>
                    <Input {...field} type='password' placeholder='******' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isUnverified && (
            <div className='text-center'>
              <p className='text-sm text-muted-foreground'>
                {LOGIN_FORM_STRINGS.unverifiedMessage}
              </p>
              <BackButton
                href='/email-verification'
                label={
                  count > 0
                    ? `${LOGIN_FORM_STRINGS.resendVerificationCountdown} ${count}s`
                    : LOGIN_FORM_STRINGS.resendVerificationLabel
                }
                isInline
                disabled={isPending || count > 0}
              />
            </div>
          )}
          {error && (
            <Alert variant='destructive'>
              <Terminal className='h-4 w-4' />
              <AlertTitle>{LOGIN_FORM_STRINGS.errorMessage}</AlertTitle>
              <AlertDescription>
                {error.message || LOGIN_FORM_STRINGS.errorDescription}
              </AlertDescription>
            </Alert>
          )}
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending
              ? LOGIN_FORM_STRINGS.pendingButton
              : LOGIN_FORM_STRINGS.submitButton}
          </Button>
          <Link
            href='/api/login/google'
            className={cn(
              buttonVariants({
                variant: 'secondary',
              }),
              'w-full'
            )}>
            <GoogleIcon className='stroke-white mr-2 h-5 w-5' />
            {LOGIN_FORM_STRINGS.googleLogin}
          </Link>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
