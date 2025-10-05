import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Anandam City - Yatharth Ventures',
  description: 'Where Peace Meets Progress - आपका अपना घर',
}

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}