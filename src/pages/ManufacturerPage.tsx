import { Link, useParams } from 'react-router-dom'
import { chips, manufacturers } from '../content/chips'
import { catalogSlug } from '../domain/slug'
import { NotFoundPage } from './NotFoundPage'

export function ManufacturerPage() {
  const { manufacturerSlug } = useParams()
  const manufacturer = manufacturers.find((item) => catalogSlug(item) === manufacturerSlug)
  if (!manufacturer) return <NotFoundPage />

  const vendorChips = chips.filter((chip) => chip.manufacturer === manufacturer)
  const families = [...new Set(vendorChips.map((chip) => chip.family))].sort()

  return (
    <article className="wiki-article">
      <header className="article-header"><p className="breadcrumb"><Link to="/">Ana sayfa</Link> / <Link to="/manufacturers">Üreticiler</Link> / {manufacturer}</p><h1>{manufacturer}</h1><p className="lead">Katalogda yer alan aile ve parça kayıtlarının üretici dizini.</p></header>
      <div className="wiki-notice info"><strong>Katalog kapsamı:</strong> {families.length} aile, {vendorChips.filter((chip) => chip.recordScope === 'series').length} seri kaydı ve {vendorChips.filter((chip) => chip.recordScope === 'exact-part').length} tam parça kaydı.</div>
      <section><h2>Aileler</h2><div className="table-scroll"><table className="wiki-table"><thead><tr><th>Aile</th><th>Seri kayıtları</th><th>Tam parçalar</th><th>Katalog modelleri</th></tr></thead><tbody>{families.map((family) => {
        const familyChips = vendorChips.filter((chip) => chip.family === family)
        return <tr key={family}><td><Link to={`/families/${catalogSlug(manufacturer)}/${catalogSlug(family)}`}><strong>{family}</strong></Link></td><td>{familyChips.filter((chip) => chip.recordScope === 'series').length}</td><td>{familyChips.filter((chip) => chip.recordScope === 'exact-part').length}</td><td>{familyChips.map((chip) => <Link className="inline-record-link" key={chip.id} to={`/chips/${chip.id}`}>{chip.model}</Link>)}</td></tr>
      })}</tbody></table></div></section>
    </article>
  )
}
