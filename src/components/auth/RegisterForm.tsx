'use client';

import { signUpAction } from '@/app/(auth)/register/actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SignUpInputSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Terminal } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CardWrapper from './CardWrapper';

const REGISTER_FORM_STRINGS = {
  title: 'Register',
  label: 'Create an account',
  backButtonLabel: 'Already have an account? Login here.',
  successMessage: 'You have successfully registered',
  loadingMessage: 'Registering...',
  errorMessage: "We couldn't register you.",
  errorDescription: 'An error occurred while registering you.',
  emailFormLabel: 'Email',
  passwordFormLabel: 'Password',
  confirmPasswordFormLabel: 'Confirm Password',
  pendingButton: 'Loading...',
  submitButton: 'Register',
};

const RegisterForm = () => {
  const { isPending, execute, error } = useServerAction(signUpAction, {
    onError({ err }) {
      toast.error(err.message);
    },
    onSuccess() {
      toast.success(REGISTER_FORM_STRINGS.successMessage);
    },
  });

  const form = useForm({
    resolver: zodResolver(SignUpInputSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordWatcher = form.watch('password');
  const { confirmPassword } = form.getValues();

  useEffect(() => {
    if (confirmPassword) {
      form.setValue('confirmPassword', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordWatcher]);

  async function onSubmit(values: z.infer<typeof SignUpInputSchema>) {
    toast.loading(REGISTER_FORM_STRINGS.loadingMessage);
    await execute(values);
    toast.dismiss();
    form.reset();
  }

  return (
    <CardWrapper
      label={REGISTER_FORM_STRINGS.label}
      title={REGISTER_FORM_STRINGS.title}
      backButtonHref='/login'
      backButtonLabel={REGISTER_FORM_STRINGS.backButtonLabel}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{REGISTER_FORM_STRINGS.emailFormLabel}</FormLabel>
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
                  <FormLabel>
                    {REGISTER_FORM_STRINGS.passwordFormLabel}
                  </FormLabel>
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
                    {REGISTER_FORM_STRINGS.confirmPasswordFormLabel}
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
              <AlertTitle>{REGISTER_FORM_STRINGS.errorMessage}</AlertTitle>
              <AlertDescription>
                {error.message || REGISTER_FORM_STRINGS.errorDescription}
              </AlertDescription>
            </Alert>
          )}
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending
              ? REGISTER_FORM_STRINGS.pendingButton
              : REGISTER_FORM_STRINGS.submitButton}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
