import type { NextraThemeLayoutProps } from 'nextra'

import { MDXProvider } from 'nextra/mdx'

// import { Header } from 'src/components/header'

const Layout = ({ children, pageOpts }: NextraThemeLayoutProps) => {
  const { title, frontMatter, headings } = pageOpts

  return (
    <div>
      <div>
        {/* <Header /> */}

        {/*
         * It accepts a `children` prop, which is the MDX content of the current page, and wraps some other elements around the content.
         */}
        <main>{children}</main>

        <footer>
          Science {'\u00d7'} Tech {'\u00d7'} Design © {new Date().getFullYear()}
          , Built with Nextra
        </footer>
        {/* eslint-enable */}
      </div>
    </div>
  )
}

export default Layout
