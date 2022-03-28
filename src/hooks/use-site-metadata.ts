import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = (): {
  title: string
  author: string
  siteUrl: string
} => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          siteUrl
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export { useSiteMetadata }
