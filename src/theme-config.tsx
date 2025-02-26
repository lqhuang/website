import type { ThemeConfig } from './theme/types'

export const themeConfig: ThemeConfig = {
  darkMode: true,
  site: {
    title: 'lqhuang.io',
    author: 'Lanqing Huang',
    nickname: 'lqhuang',
    email: 'lqhuang@outlook.com',
    description: 'A website to record digital life',
    url: 'https://lqhuang.io/',
    social: {
      twitter: '_lqhuang',
      github: 'lqhuang',
      linkedin: 'lqhuang',
      instgram: 'lanqing.huang',
      bluesky: 'lqhuang',
    },
  },
  footer: (
    <>
      <footer className="flex flex-col">
        <hr className="my-2" />
        <div className="self-center">
          Science {'\u00d7'} Tech {'\u00d7'} Design © Lanqing Huang{' '}
          {new Date().getFullYear()} Build with ❤️
        </div>
      </footer>
    </>
  ),
  navs: [
    { name: 'Home', url: '/' },
    // { name: 'Blog', url: '/posts' },
    { name: 'Notes', url: '/notes' },
    { name: 'Projects', url: '/projects' },
    // { name: 'About', url: '/about' },
  ],
  head: ({ title, meta }) => (
    <>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
    </>
  ),
  readMore: 'Read More →',
}
