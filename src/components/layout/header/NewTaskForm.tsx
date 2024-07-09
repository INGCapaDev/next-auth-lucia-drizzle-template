'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { createNewTaskAction } from '@/services/todos/actions';
import { FilePlus2 } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';

const NewTaskForm = ({
  userID,
  isSignedIn,
}: {
  isSignedIn: boolean;
  userID: string;
}) => {
  const ref = useRef<HTMLFormElement>(null);
  const createNewTaskActionWithID = createNewTaskAction.bind(
    null,
    userID as string
  );

  const formAction = async (formData: FormData) => {
    ref.current?.reset();
    const { error, message, newTask } = await createNewTaskActionWithID(
      formData
    );
    return toast(error ? 'Something went wrong' : newTask ?? 'New task', {
      description: message,
    });
  };

  return isSignedIn ? (
    <section className='w-full flex-1 h-9'>
      <form
        ref={ref}
        className='flex gap-2 items-center justify-center md:justify-start h-full'
        action={formAction}>
        <Input
          type='text'
          name='title'
          placeholder='New task...'
          className='w-2/3 appearance-none bg-background  shadow-none md:w-2/3 lg:w-1/3 focus-visible:ring-0 focus-visible:ring-offset-transparent focus-visible:ring-offset-0 focus-visible:border-zinc-700 '
        />
        <Button
          type='submit'
          variant={'secondary'}
          className='flex items-center gap-2 w-auto px-3 h-full'>
          <FilePlus2 className='h-4 w-4' />
          <span className='sr-only'>Add new task</span>
        </Button>
      </form>
    </section>
  ) : (
    <section className='w-full flex-1 h-9'>
      <div className='flex gap-2 items-center justify-center md:justify-start h-full'>
        <Skeleton className='w-2/3 h-9 lg:w-1/3' />
        <Skeleton className='w- h-9' />
      </div>
    </section>
  );
};

export default NewTaskForm;
