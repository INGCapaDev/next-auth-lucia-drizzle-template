import LoginForm from '@/components/auth/LoginForm';

export default async function LoginPage() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
      <LoginForm />
    </div>
  );
}
