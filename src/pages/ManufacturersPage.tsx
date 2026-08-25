import { Link } from 'react-router-dom'
import { chips, manufacturers } from '../content/chips'
import { catalogSlug } from '../domain/slug'

export function ManufacturersPage() {
  return (
    <article className="wiki-article">
      <header className="article-header"><p className="breadcrumb">Ana sayfa / Üreticiler</p><h1>Üreticiler ve işlemci aileleri</h1><p className="lead">Katalog kapsamının üretici ve aile düzeyindeki dizini.</p></header>
      <div className="alphabet-index">{manufacturers.map((manufacturer) => <Link key={manufacturer} to={`/manufacturers/${catalogSlug(manufacturer)}`}>{manufacturer}</Link>)}</div>
      {manufacturers.map((manufacturer) => {
        const vendorChips = chips.filter((chip) => chip.manufacturer === manufacturer)
        const families = [...new Set(vendorChips.map((chip) => chip.family))].sort()
        return <section key={manufacturer} id={catalogSlug(manufacturer)}><h2><Link to={`/manufacturers/${catalogSlug(manufacturer)}`}>{manufacturer}</Link></h2><div className="table-scroll"><table className="wiki-table"><thead><tr><th>Aile</th><th>Seri</th><th>Tam parça</th><th>Örnek kayıtlar</th></tr></thead><tbody>{families.map((family) => {
          const familyChips = vendorChips.filter((chip) => chip.family === family)
          return <tr key={family}><td><Link to={`/families/${catalogSlug(manufacturer)}/${catalogSlug(family)}`}>{family}</Link></td><td>{familyChips.filter((chip) => chip.recordScope === 'series').length}</td><td>{familyChips.filter((chip) => chip.recordScope === 'exact-part').length}</td><td>{familyChips.slice(0, 3).map((chip) => <Link className="inline-record-link" key={chip.id} to={`/chips/${chip.id}`}>{chip.model}</Link>)}</td></tr>
        })}</tbody></table></div></section>
      })}
    </article>
  )
}
