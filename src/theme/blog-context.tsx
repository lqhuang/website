import type { ReactElement, ReactNode } from 'react'
import type { LayoutProps } from './types'

import { createContext, useContext } from 'react'

const BlogContext = createContext<LayoutProps | null>(null)

export const BlogProvider = ({
  config,
  children,
  opts,
}: LayoutProps & { children: ReactNode }): ReactElement => {
  const { date } = opts.frontMatter

  return (
    <BlogContext.Provider value={{ config, opts }}>
      {children}
    </BlogContext.Provider>
  )
}

export const useBlogContext = () => {
  const value = useContext(BlogContext)
  if (!value) {
    throw new Error('useBlogContext must be used within a BlogProvider')
  }
  return value
}
