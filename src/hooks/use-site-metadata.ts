import { graphql, useStaticQuery } from 'gatsby'

import type { SiteMetadata } from 'src/types'

const useSiteMetadata = (): SiteMetadata => {
  const data = useStaticQuery<{
    site: { siteMetadata: SiteMetadata }
  }>(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          nickname
          description
          email
          url
          social {
            twitter
            github
            linkedin
            instagram
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export { useSiteMetadata }
