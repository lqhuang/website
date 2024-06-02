import { ReactNode } from 'react'

import { TopNav } from 'src/components/top-nav'
import { SiteFooter } from 'src/components/site-footer'
import { mainNavConfig } from './nav-config'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

import 'src/styles/normalize.css'
import 'src/styles/globals.css'

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav mainNavConfig={mainNavConfig} />
      <main className="flex-1">
        <div>
          {/* User Section */}
          {/* Developer Section */}
          {/* Enterprise Section */}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
