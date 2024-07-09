import { getCurrentProfile } from '@/lib/authenticated-utils';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const PROFILE_STRINGS = {
  signOut: 'Sign Out',
};

async function ProfileAvatar(
  { userIMG }: { userIMG?: string } = { userIMG: 'user.webp' }
) {
  return (
    <Avatar className='h-8 w-8'>
      <AvatarImage src={userIMG} />
      <AvatarFallback>
        <User className='w-6 h-6' />
      </AvatarFallback>
    </Avatar>
  );
}

async function ProfileDropdown() {
  const profile = await getCurrentProfile();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileAvatar userIMG={profile?.image ?? undefined} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='space-y-2 mx-4 my-2'>
        <DropdownMenuLabel>{profile.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link className='flex items-center' href={'/api/sign-out'}>
            <LogOut className='w-4 h-4 mr-2' />
            {PROFILE_STRINGS.signOut}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
