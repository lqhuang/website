import type { ThemeConfig } from './theme/types'

export const themeConfig: ThemeConfig = {
  darkMode: true,
  site: {
    title: 'lqhuang.io',
    author: 'Lanqing Huang',
    nickname: 'lqhuang',
    email: 'lqhuang@outlook.com',
    description: 'A blog to record coding life',
    url: 'https://lqhuang.io/',
    social: {
      twitter: '_lqhuang',
      github: 'lqhuang',
      linkedin: 'lqhuang',
      instgram: 'lanqing.huang',
    },
  },
  footer: (
    <>
      <hr className="my-2" />
      <footer className="self-center">
        Science {'\u00d7'} Tech {'\u00d7'} Design © Lanqing Huang{' '}
        {
          new Date().getFullYear() //, Built with ❤️
        }
      </footer>
    </>
  ),
  navs: [
    { name: 'Home', url: '/' },
    { name: 'Posts', url: '/posts' },
    { name: 'Digests', url: '/digests' },
    { name: 'About', url: '/about' },
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
