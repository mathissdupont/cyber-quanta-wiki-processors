import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { chips } from '../content/chips'
import {
  securityRequirementLabels,
  selectChips,
  type SecurityRequirement,
  type SelectionCriteria,
} from '../engine/selector'

const connectivityOptions = ['Wi-Fi', 'Bluetooth', '802.15.4', 'NFC', 'Ethernet', 'CAN']
const securityOptions = Object.entries(securityRequirementLabels) as Array<[SecurityRequirement, string]>

const initialCriteria: SelectionCriteria = {
  category: '',
  requireLinux: false,
  requireIndustrialQualification: false,
  requireFunctionalSafety: false,
  minClockMhz: 0,
  requiredConnectivity: [],
  requiredSecurity: [],
}

function toggleValue<T>(values: T[], value: T): T[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

export function SelectorPage() {
  const [criteria, setCriteria] = useState(initialCriteria)
  const results = useMemo(() => selectChips(chips, criteria), [criteria])
  const eligibleCount = results.filter((result) => result.eligible).length
  const seriesCount = results.filter((result) => result.status === 'series-reference').length

  return (
    <article className="wiki-article wide-article">
      <header className="article-header">
        <p className="breadcrumb">Ana sayfa / Araçlar / Gereksinim seçici</p>
        <h1>Gereksinime göre çip seçimi</h1>
        <p className="lead">Zorunlu teknik gereksinimleri işaretleyin; araç doğrulanmış katalog kanıtlarına göre adayları ve eleme nedenlerini göstersin.</p>
      </header>

      <div className="wiki-notice warning"><strong>Karar desteği:</strong> Bu araç satın alma veya sertifikasyon kararı vermez. Koşullu ve belirsiz kanıtlar zorunlu kriteri karşılamış sayılmaz.</div>

      <section className="selector-panel" aria-label="Seçim gereksinimleri">
        <label><span>Çip türü</span><select value={criteria.category} onChange={(event) => setCriteria({ ...criteria, category: event.target.value })}><option value="">Tümü</option><option>MCU</option><option>Wireless MCU</option><option>SoC</option><option>MPU</option><option>Secure Element</option><option>NFC Controller</option></select></label>
        <label><span>En düşük saat frekansı</span><select value={criteria.minClockMhz} onChange={(event) => setCriteria({ ...criteria, minClockMhz: Number(event.target.value) })}><option value={0}>Sınır yok</option><option value={100}>100 MHz</option><option value={150}>150 MHz</option><option value={200}>200 MHz</option><option value={400}>400 MHz</option></select></label>
        <label className="inline-check"><input type="checkbox" checked={criteria.requireLinux} onChange={(event) => setCriteria({ ...criteria, requireLinux: event.target.checked })} /> Linux gerekli</label>
        <label className="inline-check"><input type="checkbox" checked={criteria.requireIndustrialQualification} onChange={(event) => setCriteria({ ...criteria, requireIndustrialQualification: event.target.checked })} /> Endüstriyel kalifikasyon doğrulanmış</label>
        <label className="inline-check"><input type="checkbox" checked={criteria.requireFunctionalSafety} onChange={(event) => setCriteria({ ...criteria, requireFunctionalSafety: event.target.checked })} /> Fonksiyonel güvenlik doğrulanmış</label>
        <fieldset><legend>Zorunlu bağlantılar</legend>{connectivityOptions.map((item) => <label className="inline-check" key={item}><input type="checkbox" checked={criteria.requiredConnectivity.includes(item)} onChange={() => setCriteria({ ...criteria, requiredConnectivity: toggleValue(criteria.requiredConnectivity, item) })} /> {item}</label>)}</fieldset>
        <fieldset><legend>Zorunlu güvenlik</legend>{securityOptions.map(([key, label]) => <label className="inline-check" key={key}><input type="checkbox" checked={criteria.requiredSecurity.includes(key)} onChange={() => setCriteria({ ...criteria, requiredSecurity: toggleValue(criteria.requiredSecurity, key) })} /> {label}</label>)}</fieldset>
        <button className="secondary-button" type="button" onClick={() => setCriteria(initialCriteria)}>Filtreleri temizle</button>
      </section>

      <p className="result-count">{eligibleCount} tam parça adayı · {seriesCount} seri ön eleme kaydı · {results.length - eligibleCount - seriesCount} elenen kayıt</p>
      <div className="table-scroll"><table className="wiki-table selector-results"><thead><tr><th>Sonuç</th><th>Model</th><th>Tür</th><th>Karşılanan gereksinimler</th><th>Engeller / doğrulama ihtiyacı</th></tr></thead><tbody>{results.map((result) => {
        const label = result.status === 'eligible' ? 'ADAY' : result.status === 'series-reference' ? 'ÖN ELEME' : 'ELENDİ'
        const stateClass = result.status === 'eligible' ? 'result-pass' : result.status === 'series-reference' ? 'result-reference' : 'result-blocked'
        return <tr key={result.chip.id} className={result.eligible ? 'eligible-row' : undefined}><td><span className={`result-state ${stateClass}`}>{label}</span></td><td><Link to={`/chips/${result.chip.id}`}><strong>{result.chip.model}</strong></Link><small>{result.chip.manufacturer} · {result.chip.recordScope === 'exact-part' ? 'Tam parça' : 'Seri'}</small></td><td>{result.chip.category}</td><td>{result.matchedRequirements.join(', ') || 'Ek zorunlu kriter seçilmedi'}</td><td>{[...result.blockers, ...result.notes].join('; ') || 'Zorunlu kriter engeli yok'}</td></tr>
      })}</tbody></table></div>

      <section><h2>Sonucu nasıl okumalı?</h2><p><strong>Aday</strong>, tam sipariş koduna ait kaydın seçilen katalog alanlarında engel taşımadığını belirtir. <strong>Ön eleme</strong>, yalnızca seri düzeyinde uyum gösterir ve satın alınabilir parça seçimi değildir. Paket, sıcaklık, çevre birimi sayısı, tedarik, fiyat, lisans, errata ve sertifikasyon yine güncel üretici belgelerinde doğrulanmalıdır.</p></section>
    </article>
  )
}
