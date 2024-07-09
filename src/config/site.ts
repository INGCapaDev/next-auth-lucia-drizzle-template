enum SIDEBAR_ICONS {
  Inbox = 'inbox',
}

enum MOBILE_MENU_ICONS {
  Inbox = 'inbox',
}

export const site = {
  title: 'FTA App',
  description: 'A fullstack app with NextJS, Lucia Auth and Drizzle.',
  sidebar: {
    links: [{ href: '/app', label: 'Home', icon: SIDEBAR_ICONS.Inbox }],
  },
  mobileMenu: {
    links: [{ href: '/app', label: 'Home', icon: MOBILE_MENU_ICONS.Inbox }],
  },
  afterLoginRedirect: '/app',
} as const;
export type SiteConfig = typeof site;
