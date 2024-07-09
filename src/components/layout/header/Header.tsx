import MobileMenu from '@/components/layout/mobileMenu/MobileMenu';
import { protectedRoute } from '@/lib/session';
import HeaderActions from './HeaderActions';

const Header = async () => {
  await protectedRoute();
  return (
    <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between md:justify-end '>
      <MobileMenu />
      <div className='flex items-center justify-between'>
        <HeaderActions />
      </div>
    </header>
  );
};

export default Header;
