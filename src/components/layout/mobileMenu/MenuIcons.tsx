import { FilePlus2, Inbox, LinkIcon } from 'lucide-react';

export const MENU_ICONS = {
  inbox: <Inbox className='h-4 w-4' />,
  posts: <FilePlus2 className='h-4 w-4' />,
  default: <LinkIcon className='h-4 w-4' />,
} as const;
