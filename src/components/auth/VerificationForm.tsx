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

// import { getVerificationToken } from '@/app/(auth)/email-verification/actions';
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

const VERIFICATION_FORM_STRINGS = {
  title: 'Verify Account',
  label: 'Send an email to verify your account',
  backButtonLabel: 'Do you already verified your account? Go to login',
  successMessage: 'Email sent successfully',
  loadingMessage: 'Sending email...',
  errorMessage: "We couldn't send you the verification token.",
  errorDescription: 'An error occurred. Please try again later.',
  emailFormLabel: 'Email',
  pendingButton: 'Sending...',
  submitButton: 'Send Email',
};

const VerificationForm = () => {
  const { isPending, execute, error } = useServerAction(getVerificationToken, {
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
    toast.loading(VERIFICATION_FORM_STRINGS.loadingMessage);
    await execute(values);
    toast.dismiss();
  }

  return (
    <CardWrapper
      label={VERIFICATION_FORM_STRINGS.label}
      title={VERIFICATION_FORM_STRINGS.title}
      backButtonHref='/login'
      backButtonLabel={VERIFICATION_FORM_STRINGS.backButtonLabel}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {VERIFICATION_FORM_STRINGS.emailFormLabel}
                  </FormLabel>
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
              <AlertTitle>{VERIFICATION_FORM_STRINGS.errorMessage}</AlertTitle>
              <AlertDescription>
                {error.message || VERIFICATION_FORM_STRINGS.errorDescription}
              </AlertDescription>
            </Alert>
          )}
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending
              ? VERIFICATION_FORM_STRINGS.pendingButton
              : VERIFICATION_FORM_STRINGS.submitButton}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default VerificationForm;
