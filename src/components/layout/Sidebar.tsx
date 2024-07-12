'use client';
import { site } from '@/config/site';
import { cn } from '@/lib/utils';
import { LeafIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { MENU_ICONS } from './mobileMenu/MenuIcons';

type SidebarProps = {
  isUserAdmin: boolean;
};

const Sidebar: FC<SidebarProps> = ({ isUserAdmin }) => {
  const pathname = usePathname();
  const handleClass = (path: string) => {
    return path === pathname
      ? 'bg-muted text-primary'
      : 'text-muted-foreground';
  };
  return (
    <aside className='hidden border-r bg-muted/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link href='/' className='flex items-center gap-2 font-semibold'>
            <LeafIcon className='h-6 w-6 text-primary' />
            <span className=''>{site.title}</span>
          </Link>
        </div>
        <div className='flex-1'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
            {site.menus.links.map(({ href, label, icon, admin }) => (
              <Link
                key={`sidebar-link-${href}`}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                  handleClass(href),
                  !isUserAdmin && admin && 'hidden'
                )}>
                {MENU_ICONS[icon] || MENU_ICONS.default}
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
