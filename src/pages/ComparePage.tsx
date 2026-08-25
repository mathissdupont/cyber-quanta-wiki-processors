import { useState } from 'react'
import { EvidenceBadge } from '../components/EvidenceBadge'
import { chips, chipById } from '../content/chips'
import type { Chip } from '../domain/chip'
import { applicationTagLabels, sectorFitEvidenceLabels } from '../domain/chip'
import { coreMarkBenchmark, coreMarkPerDollar, formatPrice, primaryPrice } from '../domain/value'

const securityRows: Array<[keyof Chip['security'], string]> = [
  ['secureBoot', 'Secure boot'], ['secureUpdate', 'Güvenli güncelleme'],
  ['antiRollback', 'Anti-rollback'], ['hardwareRootOfTrust', 'Güven kökü'],
  ['isolation', 'İzolasyon'], ['flashEncryption', 'Bellek şifreleme'],
  ['secureDebug', 'Güvenli debug'], ['secureKeyStorage', 'Anahtar saklama'],
]

export function ComparePage() {
  const [ids, setIds] = useState([chips[0]?.id ?? '', chips[1]?.id ?? '', ''])
  const selected = ids.map((id) => chipById.get(id)).filter((chip): chip is Chip => Boolean(chip))

  const update = (index: number, id: string) => setIds((current) => current.map((value, itemIndex) => itemIndex === index ? id : value))

  return (
    <article className="wiki-article wide-article">
      <header className="article-header"><p className="breadcrumb">Ana sayfa / Araçlar / Karşılaştırma</p><h1>Çip karşılaştırma tablosu</h1><p className="lead">En fazla üç katalog kaydını ortak teknik ve güvenlik alanlarında yan yana inceleyin.</p></header>
      <div className="compare-selectors">{ids.map((id, index) => <label key={index}><span>{index + 1}. kayıt</span><select value={id} onChange={(event) => update(index, event.target.value)}><option value="">Seçilmedi</option>{chips.map((chip) => <option key={chip.id} value={chip.id}>{chip.model} — {chip.manufacturer}</option>)}</select></label>)}</div>
      <div className="table-scroll"><table className="wiki-table compare-table"><thead><tr><th>Alan</th>{selected.map((chip) => <th key={chip.id}>{chip.model}</th>)}</tr></thead><tbody>
        <tr><th>Üretici/aile</th>{selected.map((chip) => <td key={chip.id}>{chip.manufacturer}<small>{chip.family}</small></td>)}</tr>
        <tr><th>CPU</th>{selected.map((chip) => <td key={chip.id}>{chip.compute.cpu}</td>)}</tr>
        <tr><th>Frekans</th>{selected.map((chip) => <td key={chip.id}>{chip.compute.maxClockMhz === null ? 'Yayımlanmamış' : `${chip.compute.maxClockMhz} MHz`}</td>)}</tr>
        <tr><th>Flash / RAM</th>{selected.map((chip) => <td key={chip.id}>{chip.compute.flashKb === null ? 'Harici / yayımlanmamış' : `${chip.compute.flashKb} KB`} / {chip.compute.ramKb === null ? 'Yayımlanmamış' : `${chip.compute.ramKb} KB`}</td>)}</tr>
        <tr><th>Paket içi PSRAM</th>{selected.map((chip) => <td key={chip.id}>{chip.compute.psramKb === undefined ? 'Kaydedilmedi' : chip.compute.psramKb === null ? 'Varyanta bağlı' : chip.compute.psramKb === 0 ? 'Yok' : `${chip.compute.psramKb} KB`}</td>)}</tr>
        <tr><th>Linux</th>{selected.map((chip) => <td key={chip.id}>{chip.compute.linuxCapable ? 'Evet' : 'Hayır'}</td>)}</tr>
        <tr><th>Uygulama etiketleri</th>{selected.map((chip) => <td key={chip.id}><div className="tag-list">{chip.applicationTags?.map(({ tag }) => <span className="tag-pill" key={tag}>{applicationTagLabels[tag]}</span>) ?? 'Kaydedilmedi'}</div></td>)}</tr>
        <tr><th>Somut ürün adaylığı</th>{selected.map((chip) => <td key={chip.id}>{chip.sectorFits?.length ? <ul className="compact-list">{chip.sectorFits.map((fit) => <li key={`${fit.sector}-${fit.product}`}><strong>{fit.product}</strong><small>{sectorFitEvidenceLabels[fit.evidenceLevel]}</small></li>)}</ul> : 'Kaydedilmedi'}</td>)}</tr>
        <tr><th>Fiyat anlık görüntüsü</th>{selected.map((chip) => { const price = primaryPrice(chip); return <td key={chip.id}>{price ? <>{formatPrice(price.unitPrice, price.currency)}<small>{price.quantity} adet · {price.seller} · {price.checkedAt}</small></> : 'Kaydedilmedi'}</td> })}</tr>
        <tr><th>CoreMark</th>{selected.map((chip) => { const benchmark = coreMarkBenchmark(chip); return <td key={chip.id}>{benchmark ? <>{benchmark.value}<small>{benchmark.context}</small></> : 'Karşılaştırılabilir veri yok'}</td> })}</tr>
        <tr><th>CoreMark / USD</th>{selected.map((chip) => { const value = coreMarkPerDollar(chip); return <td key={chip.id}>{value === null ? 'Hesaplanmadı' : value.toFixed(1)}<small>Yalnızca 1 adet USD fiyatı ve aynı CoreMark metriği varsa.</small></td> })}</tr>
        <tr><th>Endüstriyel kalifikasyon</th>{selected.map((chip) => <td key={chip.id}>{chip.industrial ? <><EvidenceBadge evidence={chip.industrial.qualification} /><small>{chip.industrial.qualification.summary}</small></> : 'Kaydedilmedi'}</td>)}</tr>
        <tr><th>Fonksiyonel güvenlik</th>{selected.map((chip) => <td key={chip.id}>{chip.industrial ? <><EvidenceBadge evidence={chip.industrial.functionalSafety} /><small>{chip.industrial.functionalSafety.summary}</small></> : 'Kaydedilmedi'}</td>)}</tr>
        <tr><th>Ürün ömrü</th>{selected.map((chip) => <td key={chip.id}>{chip.industrial ? <><EvidenceBadge evidence={chip.industrial.longevity} /><small>{chip.industrial.longevity.summary}</small></> : 'Kaydedilmedi'}</td>)}</tr>
        {securityRows.map(([key, label]) => <tr key={key}><th>{label}</th>{selected.map((chip) => { const evidence = chip.security[key]; return <td key={chip.id}>{Array.isArray(evidence) ? '—' : <><EvidenceBadge evidence={evidence} /><small>{evidence.summary}</small></>}</td> })}</tr>)}
        <tr><th>Bağlantı</th>{selected.map((chip) => <td key={chip.id}>{chip.connectivity.join(', ')}</td>)}</tr>
        <tr><th>Sıcaklık</th>{selected.map((chip) => <td key={chip.id}>{chip.physical.temperature}</td>)}</tr>
        <tr><th>Sınırlamalar</th>{selected.map((chip) => <td key={chip.id}><ul>{chip.limitations.map((item) => <li key={item}>{item}</li>)}</ul></td>)}</tr>
      </tbody></table></div>
    </article>
  )
}
