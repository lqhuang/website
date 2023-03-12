import type { PageMapItem, MdxFile } from 'nextra'
import type { NextraThemeConfig } from './types'

import Link from 'next/link'

import { ThemeMode } from './theme-mode'
import { useBlogContext } from './blog-context'

export const Navigation = ({ navs }: { navs: NextraThemeConfig['navs'] }) => {
  const { opts, config } = useBlogContext()

  return (
    <nav className="flex flex-grow space-x-4">
      {navs?.map(({ name, url }) => {
        const active = opts.route.includes(url.toLowerCase().trim())

        if (active) {
          return (
            <span className="font-semibold text-black" key={name}>
              {name}
            </span>
          )
        } else {
          return (
            <Link
              className="text-gray-500 hover:text-black"
              key={name}
              href={url}
            >
              <span>{name}</span>
            </Link>
          )
        }
      })}
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
    <>
      <header className="bottom-3">
        <div className="my-3 not-prose">
          <Link href="/" aria-label={`${title} - Back to home`}>
            <span className="text-5xl font-logo">{title}</span>
          </Link>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Navigation navs={navs} />
          <ThemeMode />
        </div>
      </header>
      <hr className="my-3" />
    </>
  )
}
