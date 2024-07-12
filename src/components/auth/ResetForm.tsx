'use client';

import { resetPasswordAction } from '@/app/(auth)/reset-password/actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ResetPasswordSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Terminal } from 'lucide-react';
import { redirect, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CardWrapper from './CardWrapper';

const RESET_FORM_STRINGS = {
  title: 'Reset Password',
  label: 'Update your password',
  backButtonLabel: 'Remember your password? Go to login',
  successMessage: 'Password has been changed successfully',
  loadingMessage: 'Changing password...',
  errorMessage: "We couldn't change your password.",
  errorDescription: 'An error occurred. Please try again later.',
  passwordFormLabel: 'Password',
  confirmPasswordFormLabel: 'Confirm Password',
  pendingButton: 'Loading...',
  submitButton: 'Change Password',
};

const ResetForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const { isPending, execute, error } = useServerAction(resetPasswordAction, {
    onError: ({ err }) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.message(RESET_FORM_STRINGS.successMessage);
      redirect('/login');
    },
  });
  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token,
      password: '',
      confirmPassword: '',
    },
  });

  if (!token || token === '') {
    redirect('/login');
  }

  async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    toast.loading(RESET_FORM_STRINGS.loadingMessage);
    await execute(values);
    toast.dismiss();
  }

  return (
    <CardWrapper
      label={RESET_FORM_STRINGS.label}
      title={RESET_FORM_STRINGS.title}
      backButtonHref='/login'
      backButtonLabel={RESET_FORM_STRINGS.backButtonLabel}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{RESET_FORM_STRINGS.passwordFormLabel}</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='******' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {RESET_FORM_STRINGS.confirmPasswordFormLabel}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='******' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && (
            <Alert variant='destructive'>
              <Terminal className='h-4 w-4' />
              <AlertTitle>{RESET_FORM_STRINGS.errorMessage}</AlertTitle>
              <AlertDescription>
                {error.message || RESET_FORM_STRINGS.errorDescription}
              </AlertDescription>
            </Alert>
          )}
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending
              ? RESET_FORM_STRINGS.pendingButton
              : RESET_FORM_STRINGS.submitButton}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
