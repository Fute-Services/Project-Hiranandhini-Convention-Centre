import type { Metadata } from 'next'
import { Instrument_Sans, Marcellus } from 'next/font/google'
import './globals.css'

const instrument = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-instrument' })
const marcellus = Marcellus({ subsets: ['latin'], weight: '400', variable: '--font-marcellus' })

export const metadata: Metadata = { title: 'Hiranandhini Convention Centre | Interactive Master Plan' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${marcellus.variable}`}>
      <body>{children}</body>
    </html>
  )
}
