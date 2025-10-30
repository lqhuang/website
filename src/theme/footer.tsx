import type { ThemeConfig, SiteConfig } from './types'
import { formatRFC3339 } from 'date-fns/formatRFC3339'

export const Footer = ({
  footer,
  className,
}: {
  site: SiteConfig
  footer: ThemeConfig['footer']
  className?: string
}) => {
  return (
    <footer className={'flex flex-col my-3' + (className ?? '')}>
      <hr />
      {footer.children}
      {footer.lastBuilt && (
        <span className="prose dark:prose-invert text-center">
          Last built at {formatRFC3339(new Date())} with ❤️
        </span>
      )}
    </footer>
  )
}
