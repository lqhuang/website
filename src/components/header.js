/** @jsx jsx */
import { jsx, useColorMode, Styled } from 'theme-ui'
import { Link } from 'gatsby'
import { Flex } from '@theme-ui/components'

import { useSiteMetadata } from 'src/hooks/use-site-metadata'
import ColormodeButton from './colormode-button'


const Navigation = () => (
  <nav sx={{ 'a:not(:last-of-type)': { mr: 3 }, fontSize: 2, '.active': { color: 'heading' } }}>
    <Styled.a key="blog" as={Link} to="/blog" rel="blog posts">
      Blog
    </Styled.a>
    <Styled.a key="reading notes" as={Link} to="/notes" rel="notes posts">
      Digest
    </Styled.a>
    <Styled.a key="photograph" as={Link} to="/photograph" rel="photos">
      Photograph
    </Styled.a>
    <Styled.a key="about" as={Link} to="/about" rel="about">
      About
    </Styled.a>
  </nav>
)


function Header() {
  const { title: siteTitle } = useSiteMetadata()
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === 'dark'

  const toggleColorMode = (event) => {
    event.preventDefault()
    setColorMode(isDark ? 'light' : 'dark')
  }

  return (
    <header sx={{ marginBottom: [3, 4] }}>
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          to="/"
          aria-label={`${siteTitle} - Back to home`}
          sx={{ color: 'heading', textDecoration: 'none' }}
        >
          <h1 sx={{ my: 0, fontWeight: 'medium', fontSize: [4, 5] }}>{siteTitle}</h1>
        </Link>
      </Flex>
      <Flex
        sx={{
          variant: 'dividers.bottom',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 2,
          mb: 2,
          paddingBottom: 2,
          color: 'secondary',
          a: { color: 'secondary', ':hover': { color: 'heading' } },
          flexFlow: 'wrap',
        }}
      >
        <Navigation />
        <ColormodeButton isDark={isDark} toggle={toggleColorMode} />
      </Flex>
    </header>
  )
}


export default Header
