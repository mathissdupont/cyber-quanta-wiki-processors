import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function preferredTheme(): Theme {
  const saved = localStorage.getItem('cq-wiki-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(preferredTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('cq-wiki-theme', theme)
  }, [theme])

  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <button className="theme-toggle" type="button" onClick={() => setTheme(nextTheme)} aria-label={`${nextTheme === 'dark' ? 'Koyu' : 'Açık'} temaya geç`} title={`${nextTheme === 'dark' ? 'Koyu' : 'Açık'} temaya geç`}>
      <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
      <span>{theme === 'light' ? 'Koyu' : 'Açık'}</span>
    </button>
  )
}
