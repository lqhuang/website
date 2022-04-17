import { graphql, useStaticQuery } from 'gatsby'

interface SiteProps {
  site: { siteMetadata: SiteMetadataProps }
}

interface SiteMetadataProps {
  title: string
  author: string
  description: string
  email: string
  url: string
  social: {
    twitter?: string
    github?: string
    linkedin?: string
    instagram?: string
  }
}

const useSiteMetadata = (): SiteMetadataProps => {
  const data = useStaticQuery<SiteProps>(graphql`
    query {
      site {
        siteMetadata {
          title
          author
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
