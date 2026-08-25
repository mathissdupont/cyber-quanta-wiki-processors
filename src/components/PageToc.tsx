import { scrollToSection } from './sectionNavigation'

export interface PageTocItem {
  id: string
  label: string
}

export function PageToc({ items }: { items: PageTocItem[] }) {
  return (
    <aside className="page-toc" aria-label="Bu sayfada">
      <strong>Bu sayfada</strong>
      {items.map((item) => (
        <button key={item.id} type="button" onClick={() => scrollToSection(item.id)}>
          {item.label}
        </button>
      ))}
    </aside>
  )
}
