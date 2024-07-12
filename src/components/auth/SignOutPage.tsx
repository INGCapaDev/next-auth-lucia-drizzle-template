import CardWrapper from './CardWrapper';

import Link from 'next/link';
import { Button } from '../ui/button';

const SIGN_OUT_STRINGS = {
  title: 'Sign Out',
  label: 'You are now signed out',
  backButtonLabel: 'Do you want to login into your account?',
  linkLabel: 'Go to main page',
};

const SignOutPage = () => {
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
