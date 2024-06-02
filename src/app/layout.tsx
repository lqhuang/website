import type { Metadata, Viewport } from 'next'

import { ReactNode } from 'react'

import { Inter } from 'next/font/google'

import { ThemeProvider } from 'src/components/theme-provider'
import { siteConfig } from 'src/config/site'

import 'src/styles/globals.css'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: 'TypeF LLC',
      url: 'https://typef.io',
    },
  ],
  creator: 'Chaos Monkey AI',
  // openGraph: {
  //   type: 'website',
  //   locale: 'en_US',
  //   url: siteConfig.url,
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   siteName: siteConfig.name,
  // },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  // manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={fontSans.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
