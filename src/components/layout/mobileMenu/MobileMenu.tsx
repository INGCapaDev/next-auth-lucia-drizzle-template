'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { site } from '@/config/site';
import { Inbox, LinkIcon, Menu, ShellIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuElement from './MenuElement';

const MOBILE_MENU_ICONS = {
  inbox: <Inbox className='h-5 w-5' />,
  default: <LinkIcon className='h-5 w-5' />,
};

const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col'>
        <nav className='grid gap-2 text-lg font-medium'>
          <Link
            href='/'
            className=' flex items-center gap-4 rounded-xl  py-4 text-muted-foreground'>
            <ShellIcon className='h-7 w-7' />
            {site.title}
          </Link>

          {site.mobileMenu.links.map(({ href, label, icon }) => (
            <MenuElement
              key={`mobile-menu-link-${href}`}
              isActive={pathname == href}
              href={href}>
              {MOBILE_MENU_ICONS[icon] || MOBILE_MENU_ICONS.default}
              {label}
            </MenuElement>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
