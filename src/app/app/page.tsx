import { protectedRoute } from '@/lib/session';

const InboxView = async () => {
  await protectedRoute();

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <h1 className='text-4xl font-bold'>Home</h1>
    </main>
  );
};

export default InboxView;
