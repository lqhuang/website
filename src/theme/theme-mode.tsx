'use client'

import { useTheme } from 'next-themes'
import { useMounted } from 'nextra/hooks'
import { MoonIcon, SunIcon } from 'nextra/icons'

export const ThemeMode = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const mounted = useMounted()
  const isDark = resolvedTheme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <span
      role="button"
      aria-label="Toggle Dark Mode"
      className="cursor-pointer p-2 text-current"
      onClick={toggleTheme}
      onKeyDown={e => {
        if (e.key === 'Enter') toggleTheme()
      }}
    >
      {mounted && isDark ? <MoonIcon /> : <SunIcon />}
    </span>
  )
}
