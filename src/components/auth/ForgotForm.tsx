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

// import { forgetPassword } from '@/app/(auth)/forgot-password/actions';

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

const ForgotForm = () => {
  const { isPending, execute, error } = useServerAction(forgetPassword, {
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
    toast.loading('Sending email...');
    await execute(values);
    toast.dismiss();
  }

  return (
    <CardWrapper
      label='Send an email to reset your password'
      title='Reset Password'
      backButtonHref='/login'
      backButtonLabel='Remember your password? Go to login'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
              <AlertTitle>
                We couldn&apos;t send you the reset token.
              </AlertTitle>
              <AlertDescription>
                {error.message || 'An error occurred. Please try again later.'}
              </AlertDescription>
            </Alert>
          )}
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? 'Loading...' : 'Send Email'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ForgotForm;
