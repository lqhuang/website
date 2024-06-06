import type { FC } from 'react'
import { highlighter, shikiDarkTheme, shikiLightTheme } from 'src/lib/shiki'

export const HighlightedCode: FC<{
  code: string
  lang: string
  // children?: ReactNode
}> = async ({ code, lang }) => {
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: highlighter.codeToHtml(code, {
            lang,
            themes: {
              light: shikiLightTheme,
              dark: shikiDarkTheme,
            },
          }),
        }}
      />
    </div>
  )
}
