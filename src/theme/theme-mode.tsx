'use client'

import { useTheme } from 'next-themes'
import { useMounted } from 'src/hooks/use-mounted'
// import { MoonIcon, SunIcon } from 'nextra/icons'
import { MoonIcon, SunIcon } from './icons'

export const ThemeMode = () => {
  const mounted = useMounted()
  const { setTheme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  if (!mounted) {
    return null
  }

  return (
    <button
      type="button"
      className="h-full cursor-pointer"
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
