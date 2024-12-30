import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'

import { Inter, Fira_Code } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import { env } from 'src/env/client'

import { ThemeProvider } from 'next-themes'

import { Header } from 'src/theme/header'

import { siteConfig } from 'src/site'
import { themeConfig } from 'src/theme-config'

import 'src/styles/globals.css'

// const fontInter = Inter({
//   subsets: ['latin'],
//   variable: '--font-inter',
// })

// export const viewport: Viewport = {
//   themeColor: [
//     { media: '(prefers-color-scheme: light)', color: 'white' },
//     { media: '(prefers-color-scheme: dark)', color: 'black' },
//   ],
// }

export const generateViewport = (): Viewport => {
  return {
    width: 'device-width',
    initialScale: 1.0,
  }
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
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
      <body>
        <ThemeProvider attribute="class">
          {/*
           ** `65ch` comes from tailwindcss-typography
           ** ref: https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
           */}
          <div className="container mx-auto flex max-w-[65ch] flex-col">
            <Header logo={logo} navs={navs} site={site} />
            <main className="prose prose-neutral dark:prose-invert">
              {children}
            </main>
            {footer}
          </div>
        </ThemeProvider>
      </body>
      {env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  )
}
