import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';

const aquire = localFont({
  src: [
    {
      path: '../../font/AquireLight-YzE0o.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../font/Aquire-BW0ox.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../font/AquireBold-8Ma60.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-aquire',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: 'Likith S A | Portfolio',
  description: 'Futuristic portfolio — AI, Full-Stack Engineering & Automation',
  keywords: 'Likith, portfolio, software engineer, AI, full-stack, futuristic',
  openGraph: {
    title: 'Likith S A | Portfolio',
    description: 'Futuristic portfolio — AI, Full-Stack Engineering & Automation',
    type: 'website',
  },
};

import SmoothScroll from '@/components/SmoothScroll';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${aquire.variable} ${inter.variable} ${orbitron.variable} antialiased bg-black text-white overflow-x-hidden`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
