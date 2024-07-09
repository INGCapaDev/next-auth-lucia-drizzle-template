'use client';
import { site } from '@/config/site';
import { cn } from '@/lib/utils';
import { Inbox, LinkIcon, ShellIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ICONS = {
  inbox: <Inbox className='h-4 w-4' />,
  default: <LinkIcon className='h-4 w-4' />,
} as const;

const Sidebar = () => {
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
            <ShellIcon className='h-6 w-6' />
            <span className=''>{site.title}</span>
          </Link>
        </div>
        <div className='flex-1'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
            {site.sidebar.links.map(({ href, label, icon }) => (
              <Link
                key={`sidebar-link-${href}`}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                  handleClass(href)
                )}>
                {ICONS[icon] || ICONS.default}
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
