import { graphql, useStaticQuery } from 'gatsby'

interface SiteDataProps {
  site: { siteMetadata: SiteMetadataProps }
}

interface SiteMetadataProps {
  title: string
  author: string
  description: string
  email: string
  siteUrl: string
  social: {
    twitter?: string
    github?: string
    linkedin?: string
    instagram?: string
  }
}

const useSiteMetadata = (): SiteMetadataProps => {
  const data = useStaticQuery<SiteDataProps>(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          description
          email
          siteUrl
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
