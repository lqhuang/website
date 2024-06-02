export type SiteConfig = {
  name: string
  description: string
  url: string
  author: string
  keywords: string[]
  ogImage: string
  links: {
    twitter: string
    github: string
    telegram: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'Homepage of Lanqing Huang',
  description: 'My little corner',
  url: 'https://lqhuang.io',
  author: 'Lanqing Huang',
  keywords: [
    'lqhuang',
    'blog',
    'machine learning',
    'physics',
    'computing science',
  ],
  ogImage: 'https://lqhuang.io/og.jpg',
  links: {
    twitter: 'https://twitter.com/_lqhuang',
    github: 'https://github.com/lqhuang',
    telegram: 'https://t.me/lqhuang',
  },
}
