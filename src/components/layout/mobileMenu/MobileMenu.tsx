'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { site } from '@/config/site';
import { Menu, ShellIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import MenuElement from './MenuElement';
import { MENU_ICONS } from './MenuIcons';

type MobileMenuProps = {
  isUserAdmin: boolean;
};

const MobileMenu: FC<MobileMenuProps> = ({ isUserAdmin }) => {
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

          {site.menus.links.map(({ href, label, icon, admin }) => (
            <MenuElement
              key={`mobile-menu-link-${href}`}
              isActive={pathname == href}
              isHidden={!isUserAdmin && admin}
              href={href}>
              {MENU_ICONS[icon] || MENU_ICONS.default}
              {label}
            </MenuElement>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
