import { Link, useParams } from 'react-router-dom'
import { EvidenceBadge } from '../components/EvidenceBadge'
import { chips } from '../content/chips'
import { catalogSlug } from '../domain/slug'
import { NotFoundPage } from './NotFoundPage'

export function FamilyPage() {
  const { manufacturerSlug, familySlug } = useParams()
  const familyChips = chips.filter((chip) => catalogSlug(chip.manufacturer) === manufacturerSlug && catalogSlug(chip.family) === familySlug)
  if (!familyChips.length) return <NotFoundPage />

  const { manufacturer, family } = familyChips[0]
  const exactParts = familyChips.filter((chip) => chip.recordScope === 'exact-part')
  const seriesRecords = familyChips.filter((chip) => chip.recordScope === 'series')
  const sourceCount = new Set(familyChips.flatMap((chip) => chip.sources.map((source) => source.url))).size

  return (
    <article className="wiki-article wide-article">
      <header className="article-header"><p className="breadcrumb"><Link to="/">Ana sayfa</Link> / <Link to="/manufacturers">Üreticiler</Link> / <Link to={`/manufacturers/${catalogSlug(manufacturer)}`}>{manufacturer}</Link> / {family}</p><h1>{family}</h1><p className="lead">{manufacturer} ailesinin seri ve tam sipariş kodu düzeyindeki katalog kayıtları.</p></header>
      <div className="wiki-notice info"><strong>Kapsam:</strong> {seriesRecords.length} seri maddesi, {exactParts.length} tam parça maddesi ve {sourceCount} resmî kaynak.</div>
      <section id="records"><h2>Kayıtlar</h2><div className="table-scroll"><table className="wiki-table family-table"><thead><tr><th>Model</th><th>Kapsam</th><th>Flash / RAM</th><th>Paket</th><th>Secure boot</th></tr></thead><tbody>{[...seriesRecords, ...exactParts].map((chip) => <tr key={chip.id}><td><Link to={`/chips/${chip.id}`}><strong>{chip.model}</strong></Link>{chip.parentId && <small>Üst seri: {chips.find((item) => item.id === chip.parentId)?.model}</small>}</td><td>{chip.recordScope === 'series' ? 'Seri / ön eleme' : 'Tam parça'}</td><td>{chip.compute.flashKb === null ? 'Harici/değişken' : `${chip.compute.flashKb} KB`}<small>{chip.compute.ramKb === null ? 'RAM belirtilmedi' : `${chip.compute.ramKb} KB RAM`}</small></td><td>{chip.physical.packages.join(', ')}</td><td><EvidenceBadge evidence={chip.security.secureBoot} /></td></tr>)}</tbody></table></div></section>
      <section id="interpretation"><h2>Kayıt kapsamının yorumu</h2><p>Seri maddeleri ortak mimariyi tanımlar ve ön eleme içindir. Nihai donanım seçimi, üreticinin sipariş edilebilir tam parça kodu ile yapılmalıdır. Aynı ailedeki bellek, paket, GPIO, radyo gücü ve güvenlik seviyesi farklılıkları ayrı tam parça kayıtlarında gösterilir.</p></section>
      <aside className="page-toc"><strong>Bu sayfada</strong><a href="#records">Kayıtlar</a><a href="#interpretation">Kapsam yorumu</a></aside>
    </article>
  )
}
