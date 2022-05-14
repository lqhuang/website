/** @jsxImportSource theme-ui */
import { MouseEvent, ComponentPropsWithRef } from 'react'
import { useColorMode, Themed } from 'theme-ui'
import { Link } from 'gatsby'

import { useSiteMetadata } from 'src/hooks/use-site-metadata'
import { ColormodeButton } from './colormode-button'

const Navigation = () => (
  <nav
    sx={{
      'a:not(:last-of-type)': { mr: 3 },
      fontSize: 2,
      '.active': { color: 'heading' },
    }}
  >
    <Themed.a key="blog" as={Link} href="/blog" rel="blog posts">
      Blog
    </Themed.a>
    <Themed.a key="digest" as={Link} href="/snapshots" rel="notes posts">
      Digest
    </Themed.a>
    {/* <A key="photograph" as={Link} to="/photograph" rel="photos">
      Photograph
    </A> */}
    <Themed.a key="about" as={Link} href="/about" rel="about">
      About
    </Themed.a>
  </nav>
)

function Header(props: ComponentPropsWithRef<'header'>) {
  const { title: siteTitle } = useSiteMetadata()
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === 'dark'
  const { children, ...remainProps } = props

  const toggleColorMode = (event: MouseEvent) => {
    event.preventDefault()
    setColorMode(isDark ? 'light' : 'dark')
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <header {...remainProps}>
      <div sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          to="/"
          aria-label={`${siteTitle} - Back to home`}
          sx={{ color: 'heading', textDecoration: 'none' }}
        >
          <Themed.h1 sx={{ my: 2, fontWeight: 'medium' }}>
            {siteTitle}
          </Themed.h1>
        </Link>
      </div>
      <div
        sx={{
          display: 'flex',
          variant: 'dividers.bottom',
          justifyContent: 'space-between',
          flexDirection: 'row',
          // mt: 0,
          // mb: 2,
          pt: 1,
          pb: 2,
          color: 'toggleIcon',
          a: { color: 'toggleIcon', ':hover': { color: 'heading' } },
        }}
      >
        <Navigation />
        <ColormodeButton isDark={isDark} toggle={toggleColorMode} />
      </div>
    </header>
  )
}

export { Header }
