/** @jsx jsx */
import { jsx, css, Container } from 'theme-ui'
import { Fragment } from 'react'
import { Global } from '@emotion/core'

import Header from 'src/components/header'

const Normalize = () => (
  <Global
    styles={css({
      '*': {
        boxSizing: 'inherit',
      },
      'body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        textRendering: 'optimizeLegibility',
      },
      '::selection': {
        backgroundColor: 'primary',
        color: 'white',
      },
      hr: {
        boxSizing: 'content-box',
        height: 0,
        overflow: 'visible',
      },
      table: {
        // whiteSpace: 'normal',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        margin: '0 auto',
      },
      a: {
        transition: 'all 0.3s ease-in-out',
        color: 'text',
      },
    })}
  />
)

const Layout = (props) => {
  const { location, title, children } = props
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    // eslint-disable-next-line react/jsx-fragments
    <Fragment>
      <Normalize />
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
