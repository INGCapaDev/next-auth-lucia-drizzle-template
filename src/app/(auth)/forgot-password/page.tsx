import ForgotForm from '@/components/auth/ForgotForm';

export default async function ForgotPasswordPage() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
      <ForgotForm />
    </div>
  );
}
