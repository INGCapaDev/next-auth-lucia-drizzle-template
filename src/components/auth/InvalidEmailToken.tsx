import CardWrapper from './CardWrapper';

import Link from 'next/link';
import { Button } from '../ui/button';

const InvalidTokenPage = () => {
  return (
    <CardWrapper
      label='We are sorry, but the verification token is invalid. Please generate another token'
      title='Invalid Verification Token'
      backButtonHref='/email-verification'
      backButtonLabel='Do you want to generate another token?'>
      <Button className='w-full' asChild>
        <Link href='/email-verification'>Generate token</Link>
      </Button>
    </CardWrapper>
  );
};

export default InvalidTokenPage;
