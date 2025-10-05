import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://yatharth-ventures.com'),
  title: 'Anandam City - Yatharth Ventures | Where Peace Meets Progress',
  description: 'Anandam City by Yatharth Ventures - A premium residential project where tranquility meets development. Discover your dream home in a peaceful environment with modern amenities. आपका अपना घर',
  keywords: 'Anandam City, Yatharth Ventures, Real Estate, Residential Plots, Property Investment, Dream Home',
  authors: [{ name: 'Yatharth Ventures' }],
  creator: 'Yatharth Ventures',
  publisher: 'Yatharth Ventures',
  robots: 'index, follow',
  openGraph: {
    title: 'Anandam City - Where Peace Meets Progress',
    description: 'Discover Anandam City by Yatharth Ventures - Your gateway to peaceful living with modern amenities.',
    url: '/',
    siteName: 'Yatharth Ventures',
    images: [
      {
        url: '/logo.jpg',
        width: 300,
        height: 150,
        alt: 'Yatharth Ventures Logo - Anandam City',
      },
    ],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anandam City - Where Peace Meets Progress',
    description: 'Discover your dream home at Anandam City by Yatharth Ventures',
    images: ['/logo.jpg'],
  },
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a2a6c',
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
