export default {
  footer: (
    <>
      <hr className="my-2" />
      <footer className="self-center">
        Science {'\u00d7'} Tech {'\u00d7'} Design © Lanqing Huang{' '}
        {new Date().getFullYear()}, Built with Nextra
      </footer>
    </>
  ),
  darkMode: true,
  navs: [
    { name: 'Blog', url: '/posts' },
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
