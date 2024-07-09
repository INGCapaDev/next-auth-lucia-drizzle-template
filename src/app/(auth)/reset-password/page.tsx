import ResetForm from '@/components/auth/ResetForm';

export default async function LoginPage() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
      <ResetForm />
    </div>
  );
}
