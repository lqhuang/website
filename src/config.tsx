import type { ThemeConfig, SiteConfig } from './theme/types'

export const buildTime = new Date().toISOString()

export const site: SiteConfig = {
  name: 'Lanqing Huang',
  nickname: 'lqhuang',
  url: 'https://lqhuang.io',
  meta: {
    title: 'lqhuang.io',
    description: "lqhuang's website to record digital life.",
    applicationName: "Lanqing's little corner",
    keywords: [
      'lqhuang',
      'Lanqing Huang',
      'blog',
      'developer',
      // 'researcher',
      'creator',
      // 'physics',
      // 'computing science',
      'design',
      // 'machine learning',
    ],
  },
  // ogImage: 'https://lqhuang.io/og.jpg',
  social: {
    x: 'https://x.com/_lqhuang',
    github: 'https://github.com/lqhuang',
    telegram: 'https://t.me/lqhuang',
    bluesky: 'https://bsky.app/profile/lqhuang.bsky.social',
  },
}

// const site = {
//   title: 'lqhuang.io',
//   author: 'Lanqing Huang',
//   nickname: 'lqhuang',
//   email: 'lqhuang@outlook.com',
//   description: '',
//   url: 'https://lqhuang.io/',
//   social: {
//     x: '_lqhuang',
//     github: 'lqhuang',
//     linkedin: 'lqhuang',
//     instgram: 'lanqing.huang',
//     bluesky: 'lqhuang',
//   },
// }

export const themeConfig: ThemeConfig = {
  darkMode: true,
  footer: (
    <>
      <footer className="flex flex-col my-3 gap-0.5 justify-center">
        <hr />
        <span className="prose dark:prose-invert text-center">
          Science {'\u00d7'} Tech {'\u00d7'} Design © Lanqing Huang{' '}
          {new Date().getFullYear()}
        </span>
        <span className="prose dark:prose-invert text-center">
          Last built at {new Date().toISOString()} with ❤️
        </span>
      </footer>
    </>
  ),
  navs: [
    // { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Writings', url: '/posts' },
    { name: 'Notes', url: '/notes' },
    { name: 'Projects', url: '/projects' },
    { name: 'Tags', url: '/tags' },
  ],
  readMore: 'Read More →',
}
