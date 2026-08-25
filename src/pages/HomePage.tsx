import { Link } from 'react-router-dom'
import { chips, manufacturers } from '../content/chips'
import { PageToc } from '../components/PageToc'

export function HomePage() {
  const sourceCount = new Set(chips.flatMap((chip) => chip.sources.map((source) => source.url))).size

  return (
    <article className="wiki-article home-article">
      <header className="article-header">
        <p className="breadcrumb">Ana sayfa</p>
        <h1>Cyber Quanta İşlemci Wiki</h1>
        <p className="lead">Gömülü işlemciler, güvenlik yetenekleri, yazılım ekosistemleri ve ürün seçiminde kullanılan teknik ölçütler için kaynaklı bilgi tabanı.</p>
        <p className="revision">Son katalog incelemesi: 25 Ağustos 2026</p>
      </header>

      <div className="wiki-notice info">
        <strong>Kapsam:</strong> Wiki şu anda {manufacturers.length} üreticiden {chips.length} başlangıç kaydı ve {sourceCount} denetlenen kaynak içerir. Katalog aşamalı olarak genişletilmektedir.
      </div>

      <section id="purpose">
        <h2>Bu wiki ne sağlar?</h2>
        <p>Üreticiler aynı güvenlik kavramlarını farklı adlarla sunar. Bu wiki; işlemci, bellek ve bağlantı özelliklerinin yanında secure boot, güvenli güncelleme, anti-rollback, anahtar saklama ve donanımsal izolasyon gibi kavramları ortak başlıklar altında inceler.</p>
        <p>Bir özellik hakkında yeterli resmî kanıt yoksa destekleniyor varsayılmaz. Seri seviyesindeki kayıtlar ile tam sipariş kodları birbirinden ayrılır.</p>
      </section>

      <section id="browse">
        <h2>İçeriğe göz at</h2>
        <div className="wiki-link-grid">
          <Link to="/chips"><strong>Çip kataloğu</strong><span>Model, aile, bağlantı ve güvenlik özelliklerine göre ara.</span></Link>
          <Link to="/manufacturers"><strong>Üreticiler ve aileler</strong><span>Kataloğu üretici → aile → model hiyerarşisinde incele.</span></Link>
          <Link to="/guides/secure-boot"><strong>Secure boot kılavuzu</strong><span>Güven kökü, imza doğrulama ve anti-rollback farklarını öğren.</span></Link>
          <Link to="/guides/chip-selection"><strong>İşlemci seçim kılavuzu</strong><span>Gereksinimleri MCU, MPU ve bağlantı mimarisine dönüştür.</span></Link>
          <Link to="/compare"><strong>Karşılaştırma tablosu</strong><span>En fazla üç kaydı ortak alanlar üzerinden yan yana getir.</span></Link>
          <Link to="/tools/selector"><strong>Gereksinim seçici</strong><span>Zorunlu kriterleri doğrulanmış katalog kanıtlarıyla eşleştir.</span></Link>
          <Link to="/tools/value"><strong>Fiyat ve performans</strong><span>Tarihli fiyatları ve karşılaştırılabilir MCU benchmarklarını incele.</span></Link>
          <Link to="/methodology"><strong>Veri metodolojisi</strong><span>Kaynak, kanıt seviyesi ve varyant kurallarını gör.</span></Link>
        </div>
      </section>

      <section id="recent">
        <h2>Başlangıç katalog maddeleri</h2>
        <div className="table-scroll"><table className="wiki-table">
          <thead><tr><th>Model/seri</th><th>Üretici</th><th>Tür</th><th>İşlemci</th></tr></thead>
          <tbody>{chips.map((chip) => <tr key={chip.id}><td><Link to={`/chips/${chip.id}`}>{chip.model}</Link></td><td>{chip.manufacturer}</td><td>{chip.category}</td><td>{chip.compute.cpu}</td></tr>)}</tbody>
        </table></div>
      </section>

      <PageToc items={[{id:'purpose',label:'Amaç'},{id:'browse',label:'İçeriğe göz at'},{id:'recent',label:'Katalog maddeleri'}]} />
    </article>
  )
}
