import VerificationForm from '@/components/auth/VerificationForm';

export default async function VerificationPage() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
      <VerificationForm />
    </div>
  );
}
