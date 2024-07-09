import { Button } from '@/components/ui/button';
import { site } from '@/config/site';

import Link from 'next/link';

export default async function Landing() {
  return (
    <main className='flex items-center min-h-screen justify-center flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex flex-col items-center justify-center h-full gap-4'>
        <h1 className='text-4xl font-bold'>Welcome to {site.title}</h1>
        <p className='text-lg text-center'>{site.description}</p>
        <Button size='lg' asChild>
          <Link href={site.afterLoginRedirect}>Get Started</Link>
        </Button>
      </div>
    </main>
  );
}
