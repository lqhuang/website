/** @jsxImportSource theme-ui */
import { MouseEvent, ComponentPropsWithRef } from 'react'
import { useColorMode, Themed, Flex } from 'theme-ui'
import { Link } from 'gatsby'

import { useSiteMetadata } from 'src/hooks/use-site-metadata'
import { ColormodeButton } from './colormode-button'

const Navigation = () => (
  <nav
    sx={{
      'a:not(:last-of-type)': { mr: 3 },
      fontSize: 2,
      a: { color: 'toggleIcon', ':hover': { color: 'heading' } },
    }}
  >
    <Themed.a key="blog" as={Link} to="/blog" href="/blog" rel="blog posts">
      Blog
    </Themed.a>
    <Themed.a
      key="digest"
      as={Link}
      to="/snapshots"
      href="/snapshots"
      rel="notes posts"
    >
      Digest
    </Themed.a>
    {/* <A key="photograph" as={Link} href="/photograph" to="/photograph" rel="photos">
      Photograph
    </A> */}
    <Themed.a key="about" as={Link} to="/about" href="/about" rel="about">
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
      <div sx={{ alignItems: 'center' }}>
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
      <Flex
        sx={{
          variant: 'dividers.bottom',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          // pt: 1,
          pb: 1,
        }}
      >
        <Navigation />
        <ColormodeButton isDark={isDark} toggle={toggleColorMode} />
      </Flex>
    </header>
  )
}

export { Header }
