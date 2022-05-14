import { MetaHTMLAttributes } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

type MetaProps = MetaHTMLAttributes<HTMLMetaElement>

type DataProps = {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
      social: {
        twitter: string
      }
    }
  }
}

interface SEOProps {
  title: string
  author?: string
  description?: string
  lang?: string
  keywords?: string[]
  meta?: MetaProps[]
}

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        social {
          twitter
        }
      }
    }
  }
`

function SEO({
  title,
  author,
  description,
  lang = 'zh-cn',
  keywords = [],
  meta = [],
}: SEOProps) {
  const data = useStaticQuery<DataProps>(detailsQuery)
  const {
    title: siteTitle,
    author: siteAuthor,
    description: siteDescription,
    social,
  } = data.site.siteMetadata

  const metaDescription = description || siteDescription
  const metaAuthor = author || siteAuthor

  const defaultMeta: MetaProps[] = [
    {
      charSet: 'utf-8',
    },
    // For SEO of search engine
    // Google: https://developers.google.com/search/docs/advanced/appearance/snippet?hl=en
    {
      name: 'author',
      content: metaAuthor,
    },
    {
      name: 'description',
      content: metaDescription,
    },
    // For [Open Graph Data](https://ogp.me/)
    {
      name: 'og:title',
      content: title,
    },
    {
      name: 'og:description',
      content: metaDescription,
    },
    {
      name: 'og:type',
      content: 'website',
    },
    // {
    //   name: 'og:url',
    //   content: '???'
    // },
    // For [twitter card summary](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary)
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:site',
      content: `@${social.twitter}`,
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
  ]
  const concatMeta = defaultMeta
    .concat(
      keywords.length > 0
        ? {
            name: 'keywords',
            content: keywords.join(', '),
          }
        : [],
    )
    .concat(meta)

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      // defaultTitle
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
      meta={concatMeta}
    />
  )
}

export { SEO }
