'use client';

import SignedOutPageComponent from '@/components/auth/SignOutPage';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignedOutPage() {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
      <SignedOutPageComponent />
    </div>
  );
}
