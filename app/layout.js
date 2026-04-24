import { DM_Sans } from 'next/font/google';
import '@/app/globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-dm-sans'
});

export const metadata = {
  title: 'Michael Kare — Portfolio 2026',
  description:
    'A clean, editorial portfolio template inspired by full-width product and brand design portfolios.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
