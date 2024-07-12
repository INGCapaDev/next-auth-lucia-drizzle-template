import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';

type MenuElementProps = {
  children: React.ReactNode;
  isActive?: boolean;
  href: string;
  isHidden?: boolean;
};

const MenuElement: FC<MenuElementProps> = ({
  children,
  isActive,
  href,
  isHidden,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        isActive ? 'text-foreground bg-muted' : 'text-muted-foreground',
        'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground',
        isHidden && 'hidden'
      )}>
      {children}
    </Link>
  );
};

export default MenuElement;
