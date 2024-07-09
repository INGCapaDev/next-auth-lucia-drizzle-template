import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import { FC } from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const LayoutAuth: FC<AuthLayoutProps> = async ({ children }) => {
  const user = await getCurrentUser();

  if (user) {
    redirect('/app');
  }

  return <>{children}</>;
};

export default LayoutAuth;
