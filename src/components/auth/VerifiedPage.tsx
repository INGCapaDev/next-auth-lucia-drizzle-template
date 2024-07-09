import CardWrapper from './CardWrapper';

import Link from 'next/link';
import { Button } from '../ui/button';

const VERIFIED_STRINGS = {
  title: 'Email Verified',
  label:
    'Your email has been verified successfully! you can now login into your account.',
  backButtonLabel: 'Do you want to login into your account?',
  linkLabel: 'Go to login page',
};

const VerifiedPage = () => {
  return (
    <CardWrapper
      label={VERIFIED_STRINGS.label}
      title={VERIFIED_STRINGS.title}
      backButtonHref='/login'
      backButtonLabel={VERIFIED_STRINGS.backButtonLabel}>
      <Button className='w-full' asChild>
        <Link href='/login'>{VERIFIED_STRINGS.linkLabel}</Link>
      </Button>
    </CardWrapper>
  );
};

export default VerifiedPage;
