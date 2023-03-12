import type { NextraThemeConfig } from './types'

import Link from 'next/link'

export const Navigation = ({ navs }: { navs: NextraThemeConfig['navs'] }) => {
  return (
    <nav className="flex-grow">
      {navs?.map(({ name, url }) => (
        <Link key={name} href={url} passHref>
          <span key={name}>{name}</span>
        </Link>
      ))}
    </nav>
  )
}

export const Header = ({
  site,
  navs,
}: {
  site: NextraThemeConfig['site']
  navs: NextraThemeConfig['navs']
}) => {
  const title = site?.title ?? 'Unknow'
  return (
    <header className="bottom-1">
      <div>
        <Link href="/" aria-label={`${title} - Back to home`}>
          <span>{title}</span>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-between">
        <Navigation navs={navs} />
        <span>Dark Button</span>
        {/* <ColormodeButton isDark={isDark} toggle={toggleColorMode} /> */}
      </div>
    </header>
  )
}
