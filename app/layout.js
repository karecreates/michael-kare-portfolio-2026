import { DM_Sans } from 'next/font/google';
import '@/app/globals.css';
import SiteLoader from '@/components/SiteLoader';
import MediaGuard from '@/components/MediaGuard';

const themeBoot = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-dm-sans'
});

const siteTitle = 'Michael Kare';
const siteDescription =
  'Design and development portfolio — product and brand experiences, websites, creative work, and client projects.';

export const metadata = {
  metadataBase: new URL('https://michaelkare.com'),
  title: siteTitle,
  description: siteDescription,
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: '/',
    siteName: 'Michael Kare',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/site_sharing_thumbnail.png',
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
    images: ['/site_sharing_thumbnail.png']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body id="top">
        {children}
        <SiteLoader />
        <MediaGuard />
      </body>
    </html>
  );
}
