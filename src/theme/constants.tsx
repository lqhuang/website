import type { NextraThemeConfig } from './types'

export const DEFAULT_THEME: NextraThemeConfig = {
  footer: (
    <footer className="mt-3 self-center">
      {new Date().getFullYear()}, Built with Nextra
    </footer>
  ),
  head: ({ title, meta }) => (
    <>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
    </>
  ),
  readMore: 'Read More →',
}
