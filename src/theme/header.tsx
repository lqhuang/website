import type { ThemeConfig } from './types'

import Link from 'next/link'

import { ThemeMode } from './theme-mode'

export const Navigation = ({ navs }: { navs: ThemeConfig['navs'] }) => {
  return (
    <nav className="flex flex-grow space-x-4">
      {navs?.map(({ name, url }) => {
        return (
          <Link
            className="text-gray-500 no-underline hover:text-black dark:text-gray-300 dark:hover:text-white"
            key={name}
            href={url}
          >
            <span>{name}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export const Header = ({
  site,
  logo,
  navs,
}: {
  site: ThemeConfig['site']
  logo: ThemeConfig['logo']
  navs: ThemeConfig['navs']
}) => {
  const title = site?.title ?? 'Unknown'
  return (
    <>
      <header className="bottom-3">
        <div className="my-3">
          {logo ? logo : <></>}
          <Link
            className="no-underline"
            href="/"
            aria-label={`${title} - Back to home`}
          >
            <span className="font-logo text-5xl text-black dark:text-white">
              {title}
            </span>
          </Link>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Navigation navs={navs} />
          <ThemeMode />
        </div>
        <hr className="my-2" />
      </header>
    </>
  )
}
