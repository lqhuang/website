import type { MDXComponents } from 'mdx/types'

import { useComponents } from 'src/theme/components'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...useComponents(),
  }
}
