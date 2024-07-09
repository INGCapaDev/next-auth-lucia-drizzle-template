import ProfileDropdown from '@/components/auth/ProfileDropdown';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/session';
import Link from 'next/link';
import { Suspense } from 'react';

async function HeaderActions() {
  const user = await getCurrentUser();
  const isSignedIn = !!user;

  return (
    <>
      {isSignedIn ? (
        <>
          <div className='hidden md:block'>
            {/* { TODO: Implement Toggle Theme Button} */}
          </div>
          <Suspense
            fallback={
              <div className='h-8 w-8 rounded-full bg-gray-300 animate-pulse'></div>
            }>
            <ProfileDropdown />
          </Suspense>
          <div className='md:hidden'></div>
        </>
      ) : (
        <>
          {/* { TODO: Implement Toggle Theme Button} */}
          <Button asChild variant='secondary'>
            <Link href='/sign-in'>Sign In</Link>
          </Button>
        </>
      )}
    </>
  );
}

export default HeaderActions;
