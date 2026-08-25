import { type FormEvent, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'
import { chips } from '../content/chips'

const navClass = ({ isActive }: { isActive: boolean }) => isActive ? 'active' : undefined

export function WikiLayout() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    const normalized = query.trim().toLocaleLowerCase('tr')
    if (!normalized) return
    const directMatch = chips.find((chip) =>
      `${chip.model} ${chip.family} ${chip.manufacturer}`.toLocaleLowerCase('tr').includes(normalized),
    )
    navigate(directMatch ? `/chips/${directMatch.id}` : `/chips?q=${encodeURIComponent(query.trim())}`)
    setQuery('')
  }

  const navigation = (
    <>
      <section>
        <h2>Başlangıç</h2>
        <NavLink to="/" end className={navClass}>Ana sayfa</NavLink>
        <NavLink to="/chips" className={navClass}>Çip kataloğu</NavLink>
        <NavLink to="/manufacturers" className={navClass}>Üreticiler ve aileler</NavLink>
      </section>
      <section>
        <h2>Kılavuzlar</h2>
        <NavLink to="/guides/secure-boot" className={navClass}>Secure boot temelleri</NavLink>
        <NavLink to="/guides/chip-selection" className={navClass}>İşlemci seçim kılavuzu</NavLink>
      </section>
      <section>
        <h2>Araçlar</h2>
        <NavLink to="/tools/selector" className={navClass}>Gereksinime göre seçim</NavLink>
        <NavLink to="/compare" className={navClass}>Çip karşılaştırma</NavLink>
        <NavLink to="/tools/value" className={navClass}>Fiyat ve performans</NavLink>
      </section>
      <section>
        <h2>Proje</h2>
        <NavLink to="/methodology" className={navClass}>Veri metodolojisi</NavLink>
      </section>
    </>
  )

  return (
    <>
      <header className="wiki-header">
        <Link className="wiki-brand" to="/"><span>CQ</span><strong>Processor Wiki</strong></Link>
        <form className="global-search" onSubmit={submitSearch} role="search">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Wiki içinde ara" aria-label="Wiki içinde ara" />
          <button type="submit">Ara</button>
        </form>
        <div className="header-actions"><ThemeToggle /><Link className="header-link" to="/methodology">Hakkında</Link></div>
      </header>
      <details className="mobile-navigation"><summary>İçerik menüsü</summary>{navigation}</details>
      <div className="wiki-layout">
        <aside className="wiki-sidebar">{navigation}</aside>
        <div className="wiki-content"><Outlet /></div>
      </div>
      <footer className="wiki-footer">
        <p>Cyber Quanta Processor Wiki — resmî kaynaklara dayalı açık teknik kılavuz.</p>
        <p>İçerikler nihai mühendislik doğrulamasının yerine geçmez.</p>
      </footer>
    </>
  )
}
