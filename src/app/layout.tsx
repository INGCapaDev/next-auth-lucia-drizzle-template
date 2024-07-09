import Providers from '@/config/Providers';
import { fontMono, fontSans } from '@/config/fonts';
import { site } from '@/config/site';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased dark',
          fontSans.variable,
          fontMono.variable
        )}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
