'use client';
import { Toaster } from '@/components/ui/sonner';
import { FC } from 'react';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default Providers;
