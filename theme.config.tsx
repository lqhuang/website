export default {
  footer: (
    <footer className="mt-3 self-center">
      Science {'\u00d7'} Tech {'\u00d7'} Design © Lanqing Huang{' '}
      {new Date().getFullYear()}, Built with Nextra
    </footer>
  ),
  darkMode: true,
  navs: [
    { name: 'Blog', url: '/blog' },
    { name: 'Digest', url: '/snapshots' },
    { name: 'About', url: '/about' },
  ],
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
}
