import { DM_Sans } from 'next/font/google';
import '@/app/globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-dm-sans'
});

const siteTitle = 'Michael Kare — Portfolio 2026';
const siteDescription =
  'Design and development portfolio — product and brand experiences, websites, creative work, and client projects.';

export const metadata = {
  metadataBase: new URL('https://michaelkare.com'),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: '/',
    siteName: 'Michael Kare',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Michael Kare portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-image.png']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
