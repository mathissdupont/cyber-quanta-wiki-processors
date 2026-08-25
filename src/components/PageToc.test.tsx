import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { PageToc } from './PageToc'
import { scrollToSection } from './sectionNavigation'

describe('page table of contents', () => {
  it('renders buttons instead of hash links that replace the HashRouter route', () => {
    const markup = renderToStaticMarkup(<PageToc items={[{ id: 'security', label: 'Güvenlik' }]} />)
    expect(markup).toContain('<button')
    expect(markup).not.toContain('href=')
  })

  it('scrolls to an existing section without changing the route', () => {
    const scrollIntoView = vi.fn()
    vi.stubGlobal('document', { getElementById: vi.fn(() => ({ scrollIntoView })) })
    expect(scrollToSection('security')).toBe(true)
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
    vi.unstubAllGlobals()
  })
})
