import type { ThemeConfig, SiteConfig } from './types'

import Link from 'next/link'

import { ThemeMode } from './theme-mode'

export const Navigation = ({ navs }: { navs: ThemeConfig['navs'] }) => {
  return (
    <nav
      className="overflow-x-scroll"
      style={{
        scrollbarWidth: 'none',
      }}
    >
      <ul className="flex space-x-4 ">
        {navs?.map(({ name, url }) => {
          return (
            <li
              key={name}
              // aria-current="page" // TODO: set active link, but how??
            >
              <Link
                className="text-gray-500 no-underline hover:text-black dark:text-gray-300 dark:hover:text-white"
                href={url}
              >
                {name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export const Header = ({
  site,
  logo,
  navs,
  className,
}: {
  site: SiteConfig
  logo: ThemeConfig['logo']
  navs: ThemeConfig['navs']
  className?: string
}) => {
  const title = site.meta.title
  return (
    <header className={'flex flex-col flex-none my-3' + (className ?? '')}>
      <div className="mb-3">
        {logo ?? <></>}
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
      <hr />
    </header>
  )
}
