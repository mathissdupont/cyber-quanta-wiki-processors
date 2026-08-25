import { Link } from 'react-router-dom'
import { chips } from '../content/chips'
import { applicationTagLabels } from '../domain/chip'
import { coreMarkBenchmark, coreMarkPerDollar, formatPrice, primaryPrice } from '../domain/value'

const pricedChips = chips.filter((chip) => primaryPrice(chip))

export function ValuePage() {
  return (
    <article className="wiki-article wide-article">
      <header className="article-header">
        <p className="breadcrumb">Ana sayfa / Araçlar / Fiyat ve değer</p>
        <h1>Fiyat ve performans karşılaştırması</h1>
        <p className="lead">Tam sipariş kodları için tarihli fiyat anlık görüntülerini, teknik bağlamı ve karşılaştırılabilir olduğu yerde CoreMark/USD hesabını gösterir.</p>
      </header>

      <div className="wiki-notice warning">
        <strong>Satın alma teklifi değildir.</strong> Fiyatlar stok, ülke, vergi, navlun, tarife ve adede göre değişir. MPU fiyatlarına DDR, depolama, PMIC, PCB ve lisans maliyetleri dahil değildir.
      </div>

      <div className="table-scroll">
        <table className="wiki-table value-table">
          <thead><tr><th>Parça</th><th>Tür / etiketler</th><th>Fiyat</th><th>İşlem bağlamı</th><th>CoreMark</th><th>CoreMark / USD</th></tr></thead>
          <tbody>{pricedChips.map((chip) => {
            const price = primaryPrice(chip)
            const benchmark = coreMarkBenchmark(chip)
            const ratio = coreMarkPerDollar(chip)
            const source = price ? chip.sources.find(({ id }) => id === price.sourceId) : undefined
            return <tr key={chip.id}>
              <td><Link to={`/chips/${chip.id}`}><strong>{chip.model}</strong></Link><small>{chip.manufacturer}</small></td>
              <td>{chip.category}<div className="tag-list">{chip.applicationTags?.map(({ tag }) => <span className="tag-pill" key={tag}>{applicationTagLabels[tag]}</span>)}</div></td>
              <td>{price && <><strong>{formatPrice(price.unitPrice, price.currency)}</strong><small>{price.quantity} adet · {price.seller}<br />Kontrol: {price.checkedAt}</small>{source && <a className="source-link" href={source.url} target="_blank" rel="noreferrer">Fiyat kaynağı</a>}</>}</td>
              <td>{chip.compute.cpu}<small>{chip.compute.maxClockMhz} MHz · {chip.compute.flashKb === null ? 'Harici Flash' : `${chip.compute.flashKb} KB Flash`} · {chip.compute.ramKb === null ? 'Harici RAM' : `${chip.compute.ramKb} KB RAM`}</small></td>
              <td>{benchmark ? <>{benchmark.value}<small>{benchmark.context}</small></> : 'Ortak benchmark yok'}</td>
              <td>{ratio === null ? 'Hesaplanmadı' : <strong>{ratio.toFixed(1)}</strong>}</td>
            </tr>
          })}</tbody>
        </table>
      </div>

      <section>
        <h2>Hesap yöntemi ve sınır</h2>
        <p><code>CoreMark / USD = üreticinin yayımladığı CoreMark skoru ÷ 1 adet USD fiyatı</code>. Bu oran yalnızca aynı benchmarkın açıkça yayımlandığı MCU kayıtlarında hesaplanır. Çift çekirdekli bir parçanın tek çekirdek skoru ikiyle çarpılmaz; gerçek ölçeklenme iş yüküne bağlıdır.</p>
        <p>MPU’lar için GHz/USD gibi yapay bir skor üretilmez. Linux desteği, GPU/NPU, Ethernet, gerçek zamanlı yardımcı çekirdek, harici bellek ve toplam BOM birlikte değerlendirilmelidir. Bu nedenle MPU satırları fiyat ve platform bağlamı sağlar, tek bir “kazanan” ilan etmez.</p>
      </section>
    </article>
  )
}
