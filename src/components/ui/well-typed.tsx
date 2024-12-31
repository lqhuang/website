import type { FC, ComponentProps } from 'react'

export const WellTyped: FC<ComponentProps<'div'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`prose dark:prose-invert ${className}`} {...props}>
      {children}
    </div>
  )
}
