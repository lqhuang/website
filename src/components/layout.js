import React from 'react'

import { rhythm, scale } from 'src/utils/typography'
import Header from 'src/components/header'


const Layout = (props) => {
  const { location, title, children } = props
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <Header />
      <main>{children}</main>
      {/* eslint-disable */}
      <footer>
        Science {'\u00d7'} Tech {'\u00d7'} Design © {new Date().getFullYear()}
        , Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
      {/* eslint-enable */}
    </div>
  )
}

export default Layout
