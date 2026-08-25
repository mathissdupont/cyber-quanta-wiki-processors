import { EvidenceBadge } from '../components/EvidenceBadge'
import { PageToc } from '../components/PageToc'
import type { FeatureEvidence } from '../domain/chip'

const examples: FeatureEvidence[] = [
  { support: 'supported', summary: 'Resmî üretici kaynağı özelliği açıkça doğrular.', sourceIds: [] },
  { support: 'conditional', summary: 'Özellik SKU, SDK, provisioning veya policy seçimine bağlıdır.', sourceIds: [] },
  { support: 'unknown', summary: 'İncelenen kaynaklarda yeterli kanıt bulunmamıştır.', sourceIds: [] },
  { support: 'not-supported', summary: 'Mimari veya resmî kaynak özelliğin bulunmadığını gösterir.', sourceIds: [] },
  { support: 'not-applicable', summary: 'Özellik bu parça sınıfına anlamlı biçimde uygulanmaz.', sourceIds: [] },
]

export function MethodologyPage() {
  return (
    <article className="wiki-article">
      <header className="article-header"><p className="breadcrumb">Ana sayfa / Proje</p><h1>Veri ve kaynak metodolojisi</h1><p className="lead">Katalog iddialarının nasıl modellendiği, doğrulandığı ve sınırlandırıldığı.</p></header>
      <section id="principles"><h2>Temel ilkeler</h2><ol><li>Öncelik üreticinin güncel ürün sayfası, datasheet, reference manual ve uygulama notlarındadır.</li><li>“Bilgi bulunamadı” ile “desteklenmiyor” aynı şey değildir.</li><li>Secure boot desteği, anti-rollback desteğini otomatik olarak kanıtlamaz.</li><li>Seri özelliği her sipariş koduna otomatik aktarılmaz.</li><li>Fiyat, stok ve tedarik süresi tarihsiz sabit veri olarak gösterilmez.</li></ol></section>
      <section id="evidence"><h2>Kanıt statüleri</h2><div className="table-scroll"><table className="wiki-table"><thead><tr><th>Statü</th><th>Anlam</th></tr></thead><tbody>{examples.map((example) => <tr key={example.support}><td><EvidenceBadge evidence={example} /></td><td>{example.summary}</td></tr>)}</tbody></table></div></section>
      <section id="records"><h2>Seri ve tam parça kayıtları</h2><p><code>series</code> kayıtları aileyi anlamak ve adayları daraltmak içindir. <code>exact-part</code> kayıtları belirli sipariş kodunun bellek, paket ve çevre birimlerini temsil eder. Seri kaydında farklılık varsa madde başında varyant uyarısı gösterilir.</p></section>
      <section id="validation"><h2>Otomatik doğrulama</h2><p>Her JSON kayıt uygulama başlarken Zod şemasından geçirilir. Geçersiz URL, eksik kaynak, bilinmeyen durum değeri veya zorunlu alan eksikliği build/test sırasında görünür hata üretir.</p></section>
      <section id="limitations"><h2>Mevcut sınırlamalar</h2><ul><li>Katalog henüz kapsamlı değildir.</li><li>İlk sürümde MPU/Linux kayıtları bulunmamaktadır.</li><li>Bazı güvenlik ayrıntıları üretici erişimi veya NDA gerektirebilir.</li><li>Kaynak kontrol tarihi güncellik garantisi değildir; periyodik tekrar inceleme gerekir.</li></ul></section>
      <PageToc items={[{id:'principles',label:'İlkeler'},{id:'evidence',label:'Kanıt statüleri'},{id:'records',label:'Kayıt kapsamı'},{id:'validation',label:'Doğrulama'},{id:'limitations',label:'Sınırlamalar'}]} />
    </article>
  )
}
