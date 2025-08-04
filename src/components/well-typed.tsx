import type { FC, ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'

export const WellTyped: FC<ComponentProps<'div'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        `prose dark:prose-invert prose-h1:my-1 prose-h1:pt-4 prose-h1:text-[1.45em]`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
