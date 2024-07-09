import RegisterForm from '@/components/auth/RegisterForm';

export default async function LoginPage() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
      <RegisterForm />
    </div>
  );
}
