# Markdown in NextJS

MDX is great, but I just want to use markdown files for now.

- [NextJS App Router: Markdown and MDX](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- [MDX Packages](https://mdxjs.com/packages/)
- [hashicorp/next-mdx-remote](https://github.com/hashicorp/next-mdx-remote): Load MDX content from anywhere
- [emanuelefavero/nextjs-app-router-blog](https://github.com/emanuelefavero/nextjs-app-router-blog): A simple blog built with NextJS 13 App Router and Typescript to show its features <https://nextjs-blog-typescript-rho.vercel.app/>
- 🌟 [Next.js 15 static first MDX starterkit | chris.lu](https://chris.lu/web_development/tutorials/next-js-static-first-mdx-starterkit)
  - [Optimizing images in MDX using next/image | chris.lu](https://chris.lu/web_development/tutorials/next-js-static-first-mdx-starterkit/optimizing-using-next-image)
    - [remcohaszing/rehype-mdx-import-media](https://github.com/remcohaszing/rehype-mdx-import-media): An MDX rehype plugin for turning media paths into imports.
- [contentlayerdev/contentlayer](https://github.com/contentlayerdev/contentlayer): Contentlayer turns your content into data - making it super easy to import MD(X) and CMS content in your app <https://www.contentlayer.dev>
  - last release: 2023-06-29 ... Project isn't being maintained
  - [State of the project #429](https://github.com/contentlayerdev/contentlayer/issues/429)
  - [timlrx/contentlayer2](https://github.com/timlrx/contentlayer2): Contentlayer turns your content into data - making it super easy to import MD(X) and CMS content in your app <https://contentlayer.dev>
  - [datopian/markdowndb](https://github.com/datopian/markdowndb): JS library to turn markdown files into structured, queryable data. Build markdown-powered docs, blogs, sites and more quickly and reliably. <https://markdowndb.com>
  - [zce/velite](https://github.com/zce/velite): Turns Markdown / MDX, YAML, JSON, or others into app's data layer with Zod schema. <http://velite.js.org>
  - [souporserious/mdxts](https://github.com/souporserious/mdxts): The Content and Documentation SDK for React <https://mdxts.dev>
    - [mdxts/loader](https://www.mdxts.dev/packages/loader)
  - [sdorra/content-collections](https://github.com/sdorra/content-collections): Transform your content into type-safe data collections <https://content-collections.dev>
  - [hashicorp/next-mdx-remote](https://github.com/hashicorp/next-mdx-remote): Load MDX content from anywhere

## Frontmatter

- gray-matter
- [vfile/vfile-matter](https://github.com/vfile/vfile-matter): utility to parse the YAML front matter in a vfile <https://unifiedjs.com>

## Plugins

Remark

- [remarkjs/remark-images](https://github.com/remarkjs/remark-images): plugin to add a simpler image syntax <https://remark.js.org/>
- [remcohaszing/remark-mermaidjs](https://github.com/remcohaszing/remark-mermaidjs): A remark plugin to render mermaid diagrams using playwright
- [remcohaszing/rehype-mermaid](https://github.com/remcohaszing/rehype-mermaid): A rehype plugin to render mermaid diagrams
- [alvinometric/remark-inline-svg](https://github.com/alvinometric/remark-inline-svg): Plugin that inlines SVG images from markdown and optimises them with svgo
- [benrbray/remark-cite](https://github.com/benrbray/remark-cite): Adds support for pandoc-style citations to the Markdown syntax for the remark and micromark parsers.
- [tats-u/markdown-cjk-friendly](https://github.com/tats-u/markdown-cjk-friendly): Make CommonMark more friendly for Japanese/Chinese/Korean (CommonMark next specification draft)—plugins & patched packages

How to write a remark plugin

- [Create a remark plugin - unified](https://unifiedjs.com/learn/guide/create-a-remark-plugin/): Guide that shows how to create a remark plugin
- 🌟 [Transforming Markdown with Remark & Rehype | ryanfiller.com](https://www.ryanfiller.com/blog/remark-and-rehype-plugins): Writing custom plugins to give extra powers to Markdown syntax using the Unified ecosystem.

Rehype

- [rehypejs/rehype-slug](https://github.com/rehypejs/rehype-slug): plugin to add `id` attributes to headings <https://unifiedjs.com>
- [rehypejs/rehype-autolink-headings](https://github.com/rehypejs/rehype-autolink-headings): plugin to add links to headings in HTML <https://unifiedjs.com>
- [PrinOrange/rehype-graphviz-diagram](https://github.com/PrinOrange/rehype-graphviz-diagram): This is the Unified/Rehype plugin that transform Graphviz codes into SVG diagrams for html content. <https://www.npmjs.com/package/rehype-graphviz-diagram>

Misc

- [goblindegook/littlefoot](https://github.com/goblindegook/littlefoot): Footnotes without the footprint. <https://littlefoot.js.org>
- [Enhance TypeScript Code Samples with Compiler Diagnostic](https://fatihkalifa.com/blog/typescript-twoslash): Build-time Type Annotation and Syntax Highlighting using Twoslash and Shiki
- [micromark/micromark-extension-gfm-footnote](https://github.com/micromark/micromark-extension-gfm-footnote): micromark extension to support GFM footnotes <https://unifiedjs.com>

- [Syntax highlighting for MDX](https://itsbruno.dev/blog/syntax-highlighting-for-mdx): Easily adding syntax highlighting to MDX files in Next.js.

## NextJS for Cloudflare pages

- [cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages): CLI to build and develop Next.js apps for Cloudflare Pages <https://www.npmjs.com/package/@cloudflare/next-on-pages>
  - [Next-on-pages Next-Dev](https://github.com/cloudflare/next-on-pages/tree/main/internal-packages/next-dev)

## Image serving

- [The modern way of serving images](https://kurtextrem.de/posts/modern-way-of-img)

## RSC markdown

- [code-hike/bright](https://github.com/code-hike/bright): React Server Component for syntax highlighting <https://bright.codehike.org>
- [facebook/docusaurus - Support React Server Components #9089](https://github.com/facebook/docusaurus/issues/9089)
- looks like only MDX has support for RSC for now (2024-06-06 😭)
  - [hashicorp/next-mdx-remote](https://github.com/hashicorp/next-mdx-remote): Load MDX content from anywhere
  - [ipikuka/next-mdx-remote-client](https://github.com/ipikuka/next-mdx-remote-client): A wrapper of the `@mdx-js/mdx` for the `nextjs` applications in order to load MDX content. It is a fork of `next-mdx-remote`. <https://demo-next-mdx-remote-client.vercel.app/>
  - [MDX - Components](https://mdxjs.com/table-of-components/)
- [Portfolio Blog Starter](https://github.com/vercel/examples/tree/main/solutions/blog)

## Other solutions

- [11ty/eleventy](https://github.com/11ty/eleventy): A simpler site generator. Transforms a directory of templates (of varying types) into HTML. <https://www.11ty.dev/>
- [Astro Docs: Content Collections](https://docs.astro.build/en/guides/content-collections/)
  - https://github.com/withastro/astro/tree/main/packages/astro/src/content

## Inspirations

- [shuding/nextra](https://github.com/shuding/nextra): Simple, powerful and flexible site generation framework with everything you love from Next.js. <https://nextra.site>
- [Note: A nice way to render Markdown in React apps](https://jordaneldredge.com/notes/208ba2e8-436d-438e-a3c9-1380e7d7df75/)
  - https://github.com/captbaritone/jordaneldredge.com/blob/master/lib/components/Markdown.js
- [franky47/francoisbest.com](https://github.com/franky47/francoisbest.com): Homepage & blog <https://francoisbest.com>
- [Innei/Shiro](https://github.com/Innei/Shiro): 📜 A minimalist personal website embodying the purity of paper and freshness of snow. <https://innei.in>
- rsc
  - [Syntax Highlighting with Shiki, React Server Components, and Next.js](https://www.luckymedia.dev/blog/syntax-highlighting-with-shiki-react-server-components-and-next-js)
  - [为什么是 RSC (一）](https://innei.in/posts/tech/why-react-server-component-1)
  - [Building a blog with Next.js 14 and React Server Components](https://maxleiter.com/blog/build-a-blog-with-nextjs-13)
    - [MaxLeiter/maxleiter.com](https://github.com/MaxLeiter/maxleiter.com): My personal site and playground, built with next.js <https://maxleiter.com>
    - Generating an RSS Feed
- [ChangoMan/nextjs-mdx-blog](https://github.com/ChangoMan/nextjs-mdx-blog): UPDATED to Next.js App Router! Starter template built with Contentlayer, MDX, shadcn-ui, and Tailwind CSS. <https://nextjs-typescript-mdx-blog.vercel.app>
