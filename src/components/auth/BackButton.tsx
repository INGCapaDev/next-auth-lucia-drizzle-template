import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '../ui/button';

interface BackButtonProps {
  label: string;
  href: string;
  isInline?: boolean;
  disabled?: boolean;
}

const BackButton = ({
  label,
  href,
  isInline = false,
  disabled = false,
}: BackButtonProps) => {
  return (
    <Button
      disabled={disabled}
      variant='link'
      className={cn(
        isInline ? 'font-normal' : 'w-full font-normal',
        disabled && 'cursor-not-allowed text-muted-foreground'
      )}
      size='sm'
      asChild>
      {disabled ? <span>{label}</span> : <Link href={href}>{label}</Link>}
    </Button>
  );
};

export default BackButton;
