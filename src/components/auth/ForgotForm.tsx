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

import { forgotPasswordAction } from '@/app/(auth)/forgot-password/actions';

import { ForgotPasswordSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Terminal } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const FORGOT_FORM_STRINGS = {
  title: 'Reset Password',
  label: 'Send an email to reset your password',
  backButtonLabel: 'Remember your password? Go to login',
  successMessage: 'We have sent you an email with the reset link',
  loadingMessage: 'Sending email...',
  errorMessage: "We couldn't send you the reset token.",
  errorDescription: 'An error occurred. Please try again later.',
  emailFormLabel: 'Email',
  pendingButton: 'Sending email...',
  submitButton: 'Send Email',
};

const ForgotForm = () => {
  const { isPending, execute, error } = useServerAction(forgotPasswordAction, {
    onError: ({ err }) => {
      toast.error(err.message);
    },
    onSuccess: ({ data }) => {
      toast.message(data.message, {
        description: data.emailLink,
      });
      redirect('/login');
    },
  });

  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    toast.loading(FORGOT_FORM_STRINGS.loadingMessage);
    await execute(values);
    toast.dismiss();
  }

  return (
    <CardWrapper
      label={FORGOT_FORM_STRINGS.label}
      title={FORGOT_FORM_STRINGS.title}
      backButtonHref='/login'
      backButtonLabel={FORGOT_FORM_STRINGS.backButtonLabel}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{FORGOT_FORM_STRINGS.emailFormLabel}</FormLabel>
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
          </div>
          {error && (
            <Alert variant='destructive'>
              <Terminal className='h-4 w-4' />
              <AlertTitle>{FORGOT_FORM_STRINGS.errorMessage}</AlertTitle>
              <AlertDescription>
                {error.message || FORGOT_FORM_STRINGS.errorDescription}
              </AlertDescription>
            </Alert>
          )}
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending
              ? FORGOT_FORM_STRINGS.pendingButton
              : FORGOT_FORM_STRINGS.submitButton}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ForgotForm;
