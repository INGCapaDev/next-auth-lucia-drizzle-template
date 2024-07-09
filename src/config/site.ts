export type SiteConfig = typeof site;
export const site = {
  title: 'App with NextJS, Lucia Auth and Drizzle',
  description: 'A fullstack app with NextJS, Lucia Auth and Drizzle.',
  sidebar: {
    links: [{ href: '/app', label: 'Home' }],
  },
  afterLoginRedirect: '/app',
};
