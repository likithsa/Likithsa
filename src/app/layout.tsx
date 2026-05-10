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
  metadataBase: new URL('https://likithsa.vercel.app'),
  title: {
    default: 'Likith S A | likithsa | Portfolio',
    template: '%s | Likith S A',
  },
  description: 'Likith S A (likithsa) - Futuristic Software Engineer specializing in AI, Full-Stack Development, and Automation. Explore my portfolio and projects.',
  keywords: ['Likith S A', 'likithsa', 'Likith', 'Software Engineer', 'Portfolio', 'AI Engineer', 'Full-Stack Developer', 'Next.js Portfolio'],
  authors: [{ name: 'Likith S A' }],
  creator: 'Likith S A',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://likithsa.vercel.app',
    title: 'Likith S A | likithsa | Portfolio',
    description: 'Futuristic Portfolio of Likith S A (likithsa). Exploring the intersection of AI and Software Engineering.',
    siteName: 'Likith S A Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Likith S A | likithsa | Portfolio',
    description: 'Futuristic Portfolio of Likith S A (likithsa). Exploring the intersection of AI and Software Engineering.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
