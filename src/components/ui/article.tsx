import type { ComponentProps, FC } from 'react'

export const Article: FC<ComponentProps<'article'>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <article className={`prose dark:prose-invert ${className}`} {...props}>
      {children}
    </article>
  )
}
