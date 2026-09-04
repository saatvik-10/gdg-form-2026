import type { Metadata, Viewport } from 'next';
import { Google_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers';

const googleSans = Google_Sans({
  variable: '--font-google-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GDG MIT-WPU Recruitment Form',
  description:
    'Apply to join GDG on Campus at MIT-WPU. Fill out the recruitment form to embark on your journey.',
  icons: { icon: '/assets/gdg-logo.png' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='h-full antialiased'>
      <body
        className={`${googleSans.variable} min-h-full flex flex-col bg-slate-950`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
