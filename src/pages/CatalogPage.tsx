import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { EvidenceBadge } from '../components/EvidenceBadge'
import { chips, manufacturers } from '../content/chips'
import { filterChips, type CatalogFilters } from '../engine/catalog'

export function CatalogPage() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState<CatalogFilters>({
    query: searchParams.get('q') ?? '',
    manufacturer: '',
    category: '',
    secureBootOnly: false,
    wirelessOnly: false,
  })
  const result = useMemo(() => filterChips(chips, filters), [filters])

  return (
    <article className="wiki-article wide-article">
      <header className="article-header">
        <p className="breadcrumb">Ana sayfa / Katalog</p>
        <h1>Çip kataloğu</h1>
        <p className="lead">MCU, kablosuz MCU, SoC, MPU, NFC denetleyicisi ve güvenli eleman kayıtlarını ortak teknik alanlar üzerinden tarayın.</p>
      </header>

      <div className="catalog-filters">
        <label><span>Metin araması</span><input value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} placeholder="Model, aile, özellik…" /></label>
        <label><span>Üretici</span><select value={filters.manufacturer} onChange={(event) => setFilters({ ...filters, manufacturer: event.target.value })}><option value="">Tümü</option>{manufacturers.map((manufacturer) => <option key={manufacturer}>{manufacturer}</option>)}</select></label>
        <label><span>Tür</span><select value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}><option value="">Tümü</option><option>MCU</option><option>Wireless MCU</option><option>SoC</option><option>MPU</option><option>Secure Element</option><option>NFC Controller</option></select></label>
        <label className="inline-check"><input type="checkbox" checked={filters.secureBootOnly} onChange={(event) => setFilters({ ...filters, secureBootOnly: event.target.checked })} /> Secure boot doğrulanmış</label>
        <label className="inline-check"><input type="checkbox" checked={filters.wirelessOnly} onChange={(event) => setFilters({ ...filters, wirelessOnly: event.target.checked })} /> Dahili kablosuz</label>
      </div>

      <p className="result-count">{result.length} kayıt bulundu.</p>
      <div className="table-scroll">
        <table className="wiki-table catalog-table">
          <thead><tr><th>Model/seri</th><th>Üretici ve aile</th><th>CPU</th><th>Bellek</th><th>Secure boot</th><th>Bağlantı özeti</th></tr></thead>
          <tbody>
            {result.map((chip) => (
              <tr key={chip.id}>
                <td><Link to={`/chips/${chip.id}`}><strong>{chip.model}</strong></Link><small>{chip.recordScope === 'series' ? 'Seri kaydı' : 'Tam parça'}</small></td>
                <td>{chip.manufacturer}<small>{chip.family}</small></td>
                <td>{chip.compute.cpu}<small>{chip.compute.maxClockMhz === null ? 'Yayımlanmamış' : `${chip.compute.maxClockMhz} MHz`}</small></td>
                <td>{chip.compute.flashKb === null ? 'Harici / yayımlanmamış' : `${chip.compute.flashKb} KB Flash`}<small>{chip.compute.ramKb === null ? 'RAM: yayımlanmamış' : `${chip.compute.ramKb} KB RAM`}{chip.compute.psramKb !== undefined && <>{` · Paket içi PSRAM: ${chip.compute.psramKb === null ? 'varyanta bağlı' : `${chip.compute.psramKb} KB`}`}</>}</small></td>
                <td><EvidenceBadge evidence={chip.security.secureBoot} /></td>
                <td>{chip.connectivity.slice(0, 4).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!result.length && <div className="wiki-notice warning"><strong>Sonuç bulunamadı.</strong> Filtreleri azaltın veya bu ailenin kataloğa eklenmesi için yeni kayıt hazırlayın.</div>}
    </article>
  )
}
