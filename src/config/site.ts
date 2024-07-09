import { Metadata } from 'next';

enum SIDEBAR_ICONS {
  Inbox = 'inbox',
}

enum MOBILE_MENU_ICONS {
  Inbox = 'inbox',
}

export const site = {
  title: 'FTA App',
  description: 'A fullstack app with NextJS, Lucia Auth and Drizzle.',
  lang: 'en',
  sidebar: {
    links: [{ href: '/app', label: 'Home', icon: SIDEBAR_ICONS.Inbox }],
  },
  mobileMenu: {
    links: [{ href: '/app', label: 'Home', icon: MOBILE_MENU_ICONS.Inbox }],
  },
  afterLoginRedirect: '/app',
} as const;
export type SiteConfig = typeof site;

export const customMetadata: Metadata = {
  title: site.title,
  description: site.description,
};
