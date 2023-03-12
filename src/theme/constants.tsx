import type { NextraThemeConfig } from './types'

export const DEFAULT_THEME: NextraThemeConfig = {
  footer: (
    <footer className="nx-mt-32 nx-block">
      Science {'\u00d7'} Tech {'\u00d7'} Design © Lanqing Huang{' '}
      {new Date().getFullYear()}, Built with Nextra
    </footer>
  ),
  readMore: 'Read More →',
}
