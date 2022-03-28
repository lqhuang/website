/** @jsxImportSource theme-ui */
import { Fragment, FC } from 'react'
import { Container } from 'theme-ui'

import Header from 'src/components/header'

const Layout: FC = (props) => {
  const { children } = props

  return (
    <Fragment>
      {/* <Seo /> */}
      <Container
        sx={{
          paddingX: 4,
          maxWidth: ['100%', '100%', '61.8%', '50%'],
        }}
      >
        <Header sx={{ mb: [3, 4] }} />
        <main>{children}</main>
        {/* <hr /> */}
        {/* eslint-disable */}
        <footer sx={{ mt: [3, 4], mb: [2, 3] }}>
          Science {'\u00d7'} Tech {'\u00d7'} Design © {new Date().getFullYear()}
          , Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
        {/* eslint-enable */}
      </Container>
    </Fragment>
  )
}

export default Layout
