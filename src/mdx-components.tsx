import type { MDXComponents } from 'mdx/types'

import { defaultComponents } from 'src/theme/components'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...defaultComponents, ...components }
}
