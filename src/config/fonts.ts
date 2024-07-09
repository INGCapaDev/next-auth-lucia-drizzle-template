import { Inter as FontSans, Geologica } from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = Geologica({
  subsets: ['latin'],
  variable: '--font-mono',
});
