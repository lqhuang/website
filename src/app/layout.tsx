import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'

import { Inter, Zilla_Slab, IBM_Plex_Mono } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import { env } from 'src/env/client'

import { ThemeProvider } from 'next-themes'

import { Header } from 'src/theme/header'

import { siteConfig } from 'src/site'
import { themeConfig } from 'src/theme-config'

import 'src/styles/globals.css'

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const fontZillaSlab = Zilla_Slab({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-zilla-slab',
  display: 'swap',
})

const fontPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-plex-mono',
  display: 'swap',
})

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

export const dynamicParams = false
export const dynamic = 'force-static'

export default function RootLayout({ children }: { children: ReactNode }) {
  const { footer, navs, site, logo } = themeConfig

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontZillaSlab.variable} ${fontInter.variable} ${fontPlexMono.variable}`}
    >
      <body>
        <ThemeProvider attribute="class">
          {/*
           ** `65ch` comes from tailwindcss-typography
           ** ref: https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
           */}
          <div className="container mx-auto flex max-w-[65ch] flex-col px-6">
            <Header logo={logo} navs={navs} site={site} />
            <main>{children}</main>
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
