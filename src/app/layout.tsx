import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'

import Head from 'next/head'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import { Header } from 'src/theme/header'

import { siteConfig } from 'src/site'
import { themeConfig } from 'src/theme-config'

import 'src/styles/normalize.css'
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

export function generateViewport() {
  return viewport
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
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
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
  const { footer, navs, site, logo } = themeConfig

  return (
    <html lang="en" suppressHydrationWarning>
      {/*
      <head />
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      */}
      <body className={fontSans.className}>
        <ThemeProvider>
          <div className="dark:prose-dark prose mx-auto flex flex-col">
            <Header logo={logo} navs={navs} site={site} />
            {children}
            {footer}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
