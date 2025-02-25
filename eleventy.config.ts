import 'tsx/esm'
import { renderToStaticMarkup } from 'react-dom/server'

import type { EleventyConfig, UserConfig } from '@11ty/eleventy'

export const config: Partial<EleventyConfig> = {
  templateFormats: ['njk', '11ty.tsx'],
  htmlTemplateEngine: 'njk',
  markdownTemplateEngine: 'njk',
  dir: {
    input: 'src/content',
    data: '../_data',
    layouts: '../_layouts',
    includes: '../_includes',
    output: '_site',
  },
}

export default async function (eleventyConfig: UserConfig) {
  eleventyConfig.addPassthroughCopy({
    'public/': '/',
  })
  // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  // We can add support for JSX too, at the same time:
  eleventyConfig.addExtension(['11ty.ts', '11ty.tsx'], {
    key: '11ty.js',
    compile: function () {
      // NOTE: arrow functions do not have access to `this`
      return async function (data: any) {
        // @ts-expect-error from official 11ty docs
        let content = await this.defaultRenderer(data)
        return renderToStaticMarkup(content)
      }
    },
  })

  // Run Eleventy when these files change:
  // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

  // Watch images for the image pipeline.
  eleventyConfig.addWatchTarget('content/**/*.{svg,webp,png,jpg,jpeg,gif}')

  // // Official plugins
  // eleventyConfig.addPlugin(pluginSyntaxHighlight, {
  //   preAttributes: { tabindex: 0 },
  // })
  // eleventyConfig.addPlugin(pluginNavigation)
  // eleventyConfig.addPlugin(HtmlBasePlugin)
  // eleventyConfig.addPlugin(InputPathToUrlTransformPlugin)

  // eleventyConfig.addPlugin(feedPlugin, {
  //   type: 'atom', // or "rss", "json"
  //   outputPath: '/feed/feed.xml',
  //   stylesheet: 'pretty-atom-feed.xsl',
  //   templateData: {
  //     eleventyNavigation: {
  //       key: 'Feed',
  //       order: 4,
  //     },
  //   },
  //   collection: {
  //     name: 'posts',
  //     limit: 10,
  //   },
  //   metadata: {
  //     language: 'en',
  //     title: 'Blog Title',
  //     subtitle: 'This is a longer description about your blog.',
  //     base: 'https://example.com/',
  //     author: {
  //       name: 'Your Name',
  //     },
  //   },
  // })

  // // Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
  // eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
  //   // Output formats for each image.
  //   formats: ['avif', 'webp', 'auto'],

  //   // widths: ["auto"],

  //   failOnError: false,
  //   htmlOptions: {
  //     imgAttributes: {
  //       // e.g. <img loading decoding> assigned on the HTML tag will override these values.
  //       loading: 'lazy',
  //       decoding: 'async',
  //     },
  //   },

  //   sharpOptions: {
  //     animated: true,
  //   },
  // })

  // // Filters
  // eleventyConfig.addPlugin(pluginFilters)

  // eleventyConfig.addPlugin(IdAttributePlugin, {
  //   // by default we use Eleventy’s built-in `slugify` filter:
  //   // slugify: eleventyConfig.getFilter("slugify"),
  //   // selector: "h1,h2,h3,h4,h5,h6", // default
  // })

  // eleventyConfig.addShortcode('currentBuildDate', () => {
  //   return new Date().toISOString()
  // })

  // Features to make your build faster (when you need them)

  // If your passthrough copy gets heavy and cumbersome, add this line
  // to emulate the file copy on the dev server. Learn more:
  // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve
}
