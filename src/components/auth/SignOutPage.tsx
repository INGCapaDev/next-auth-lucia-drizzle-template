'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import CardWrapper from './CardWrapper';

const SIGN_OUT_STRINGS = {
  title: 'Sign Out',
  label: 'You are now signed out',
  backButtonLabel: 'Do you want to login into your account?',
  linkLabel: 'Go to main page',
};

const SignOutPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <CardWrapper
      label={SIGN_OUT_STRINGS.label}
      title={SIGN_OUT_STRINGS.title}
      backButtonHref='/login'
      backButtonLabel={SIGN_OUT_STRINGS.backButtonLabel}>
      <Button className='w-full' asChild>
        <Link href='/'>{SIGN_OUT_STRINGS.linkLabel}</Link>
      </Button>
    </CardWrapper>
  );
};

export default SignOutPage;
