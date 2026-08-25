import { Link, useParams } from 'react-router-dom'
import { EvidenceBadge } from '../components/EvidenceBadge'
import { chipById } from '../content/chips'
import type { Chip } from '../domain/chip'
import { catalogSlug } from '../domain/slug'
import { NotFoundPage } from './NotFoundPage'

const securityRows: Array<[keyof Chip['security'], string]> = [
  ['secureBoot', 'Secure boot'],
  ['secureUpdate', 'Güvenli firmware güncelleme'],
  ['antiRollback', 'Anti-rollback'],
  ['hardwareRootOfTrust', 'Hardware Root of Trust'],
  ['isolation', 'Donanımsal izolasyon'],
  ['flashEncryption', 'Flash/bellek şifreleme'],
  ['secureDebug', 'Güvenli debug'],
  ['secureKeyStorage', 'Güvenli anahtar saklama'],
  ['tamperResistance', 'Tamper dayanımı'],
]

export function ChipPage() {
  const { chipId } = useParams()
  const chip = chipId ? chipById.get(chipId) : undefined
  if (!chip) return <NotFoundPage />

  return (
    <article className="wiki-article chip-article">
      <header className="article-header">
        <p className="breadcrumb"><Link to="/">Ana sayfa</Link> / <Link to={`/manufacturers/${catalogSlug(chip.manufacturer)}`}>{chip.manufacturer}</Link> / <Link to={`/families/${catalogSlug(chip.manufacturer)}/${catalogSlug(chip.family)}`}>{chip.family}</Link> / {chip.model}</p>
        <h1>{chip.model}</h1>
        <p className="lead">{chip.summary}</p>
        <p className="revision">Kayıt kapsamı: {chip.recordScope === 'exact-part' ? 'tam parça' : 'ürün serisi'} · İnceleme: {chip.reviewedAt}</p>
      </header>

      <aside className="chip-infobox">
        <h2>{chip.model}</h2>
        <dl>
          <div><dt>Üretici</dt><dd>{chip.manufacturer}</dd></div>
          <div><dt>Aile</dt><dd>{chip.family}</dd></div>
          <div><dt>Tür</dt><dd>{chip.category}</dd></div>
          <div><dt>Durum</dt><dd>{chip.lifecycle}</dd></div>
          <div><dt>CPU</dt><dd>{chip.compute.cpu}</dd></div>
          <div><dt>Çekirdek</dt><dd>{chip.compute.cores ?? 'Yayımlanmamış'}</dd></div>
          <div><dt>Frekans</dt><dd>{chip.compute.maxClockMhz === null ? 'Yayımlanmamış' : `${chip.compute.maxClockMhz} MHz`}</dd></div>
          <div><dt>Flash</dt><dd>{chip.compute.flashKb === null ? 'Harici/varyanta bağlı' : `${chip.compute.flashKb} KB`}</dd></div>
          <div><dt>RAM</dt><dd>{chip.compute.ramKb === null ? 'Belirsiz' : `${chip.compute.ramKb} KB`}</dd></div>
          {chip.compute.psramKb !== undefined && <div><dt>Paket içi PSRAM</dt><dd>{chip.compute.psramKb === null ? 'Varyanta bağlı' : chip.compute.psramKb === 0 ? 'Yok' : `${chip.compute.psramKb} KB`}</dd></div>}
          <div><dt>Linux</dt><dd>{chip.compute.linuxCapable ? 'Desteklenebilir' : 'Uygun değil'}</dd></div>
        </dl>
      </aside>

      {chip.variantNote && <div className="wiki-notice warning"><strong>Varyant uyarısı:</strong> {chip.variantNote}</div>}
      {chip.parentId && <div className="wiki-notice info"><strong>Üst seri kaydı:</strong> <Link to={`/chips/${chip.parentId}`}>{chipById.get(chip.parentId)?.model ?? chip.parentId}</Link>. Bu madde yalnızca tam sipariş koduna özgü farkları üst seriyle birleştirir.</div>}

      <section id="overview"><h2>Genel bakış</h2><p>{chip.summary}</p><p>Başlıca kullanım alanları: {chip.useCases.join(', ')}.</p></section>

      <section id="compute">
        <h2>İşlemci ve bellek mimarisi</h2>
        <div className="table-scroll"><table className="wiki-table definition-table"><tbody>
          <tr><th>İşlemci</th><td>{chip.compute.cpu}{chip.compute.cores === null ? '' : `, ${chip.compute.cores} çekirdek`}{chip.compute.maxClockMhz === null ? '' : `, en fazla ${chip.compute.maxClockMhz} MHz`}</td></tr>
          <tr><th>Program belleği</th><td>{chip.compute.flashKb === null ? 'Harici bellek veya tam varyant seçimine bağlıdır.' : `${chip.compute.flashKb} KB dahili Flash`}</td></tr>
          <tr><th>Çalışma belleği</th><td>{chip.compute.ramKb === null ? 'Yayımlanmamış veya kullanıcıya açık değil' : `${chip.compute.ramKb} KB RAM`}</td></tr>
          {chip.compute.psramKb !== undefined && <tr><th>Paket içi PSRAM</th><td>{chip.compute.psramKb === null ? 'Varyanta bağlı' : chip.compute.psramKb === 0 ? 'Yok' : `${chip.compute.psramKb} KB`}</td></tr>}
          <tr><th>Hızlandırıcılar</th><td>{chip.compute.accelerators.join(', ') || 'Kaydedilmedi'}</td></tr>
          <tr><th>Yazılım ortamları</th><td>{chip.compute.operatingSystems.join(', ')}</td></tr>
        </tbody></table></div>
      </section>

      <section id="interfaces"><h2>Bağlantı ve çevre birimleri</h2><h3>Bağlantı</h3><ul className="columns-list">{chip.connectivity.map((item) => <li key={item}>{item}</li>)}</ul><h3>Çevre birimleri</h3><ul className="columns-list">{chip.peripherals.map((item) => <li key={item}>{item}</li>)}</ul></section>

      <section id="security">
        <h2>Güvenlik özellikleri</h2>
        <p>Aşağıdaki statüler yalnızca bağlantılı resmî kaynakların açıkça desteklediği kapsamı gösterir.</p>
        <div className="table-scroll"><table className="wiki-table security-table"><thead><tr><th>Özellik</th><th>Durum</th><th>Açıklama</th></tr></thead><tbody>
          {securityRows.map(([key, label]) => { const value = chip.security[key]; if (Array.isArray(value)) return null; return <tr key={key}><th>{label}</th><td><EvidenceBadge evidence={value} /></td><td>{value.summary}</td></tr> })}
          <tr><th>Kriptografi</th><td colSpan={2}>{chip.security.cryptography.join(', ')}</td></tr>
          <tr><th>Sertifikalar</th><td colSpan={2}>{chip.security.certifications.join(', ') || 'Bu kayıtta belirtilmedi'}</td></tr>
        </tbody></table></div>
      </section>

      <section id="physical"><h2>Elektriksel ve fiziksel özellikler</h2><div className="table-scroll"><table className="wiki-table definition-table"><tbody><tr><th>Besleme</th><td>{chip.physical.supplyVoltage}</td></tr><tr><th>Sıcaklık</th><td>{chip.physical.temperature}</td></tr><tr><th>Paketler</th><td>{chip.physical.packages.join(', ')}</td></tr></tbody></table></div></section>

      {chip.industrial && <section id="industrial"><h2>Endüstriyel uygunluk</h2><p>Bu bölüm, genel kullanım söylemi yerine üretici belgelerinde doğrulanabilen endüstriyel karar ölçütlerini gösterir.</p><div className="table-scroll"><table className="wiki-table security-table"><thead><tr><th>Ölçüt</th><th>Durum</th><th>Açıklama</th></tr></thead><tbody><tr><th>Endüstriyel kalifikasyon</th><td><EvidenceBadge evidence={chip.industrial.qualification} /></td><td>{chip.industrial.qualification.summary}</td></tr><tr><th>Fonksiyonel güvenlik</th><td><EvidenceBadge evidence={chip.industrial.functionalSafety} /></td><td>{chip.industrial.functionalSafety.summary}</td></tr><tr><th>Ürün ömrü taahhüdü</th><td><EvidenceBadge evidence={chip.industrial.longevity} /></td><td>{chip.industrial.longevity.summary}</td></tr><tr><th>Gerçek zamanlı çalışma</th><td><EvidenceBadge evidence={chip.industrial.realTime} /></td><td>{chip.industrial.realTime.summary}</td></tr><tr><th>Endüstriyel arayüzler</th><td colSpan={2}>{chip.industrial.industrialInterfaces.join(', ') || 'Bu kayıtta belirtilmedi'}</td></tr><tr><th>Güvenilirlik özellikleri</th><td colSpan={2}>{chip.industrial.reliabilityFeatures.join(', ') || 'Bu kayıtta belirtilmedi'}</td></tr></tbody></table></div></section>}

      <section id="development"><h2>Geliştirme ekosistemi</h2><ul>{chip.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></section>
      <section id="assessment"><h2>Değerlendirme notları</h2><div className="assessment-grid"><div><h3>Güçlü yönler</h3><ul>{chip.strengths.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>Sınırlamalar</h3><ul>{chip.limitations.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>

      <section id="sources"><h2>Kaynakça</h2><ol className="references">{chip.sources.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>. {source.publisher}. Erişim/kontrol: {source.checkedAt}.</li>)}</ol></section>

      <aside className="page-toc" aria-label="Bu sayfada"><strong>Bu sayfada</strong><a href="#overview">Genel bakış</a><a href="#compute">İşlemci ve bellek</a><a href="#interfaces">Bağlantı</a><a href="#security">Güvenlik</a><a href="#physical">Fiziksel özellikler</a>{chip.industrial && <a href="#industrial">Endüstriyel uygunluk</a>}<a href="#development">Geliştirme</a><a href="#assessment">Değerlendirme</a><a href="#sources">Kaynakça</a></aside>
    </article>
  )
}
