import { Link } from 'react-router-dom'
import { PageToc } from '../components/PageToc'

export function SecureBootGuidePage() {
  return (
    <article className="wiki-article">
      <header className="article-header"><p className="breadcrumb">Ana sayfa / Kılavuzlar</p><h1>Secure boot temelleri</h1><p className="lead">Bir cihazın yalnızca yetkili yazılımı çalıştırmasını sağlayan güven zincirinin temel kavramları.</p></header>
      <div className="wiki-notice info"><strong>Kısa tanım:</strong> Secure boot, açılışta çalıştırılacak değiştirilebilir yazılımın bütünlüğünü ve kaynağını değiştirilemez veya daha önce güvenilmiş bir bileşenden başlayarak doğrular.</div>
      <section id="chain"><h2>Güven zinciri</h2><p>İlk güvenilen kod genellikle ROM veya üretimde kilitlenen bir güven köküdür. Bu kod bir sonraki bootloader aşamasını, bootloader da işletim sistemi ya da uygulama imajını doğrular.</p><pre className="text-diagram">ROM / Root of Trust{`\n`}        ↓ doğrular{`\n`}Bootloader{`\n`}        ↓ doğrular{`\n`}Firmware veya işletim sistemi</pre></section>
      <section id="signature"><h2>İmza doğrulama</h2><p>Firmware üretim ortamındaki özel anahtarla imzalanır. Cihaz özel anahtarı taşımaz; yalnızca public key veya onun güvenilir özetini kullanarak imzayı doğrular. Hash doğrulaması bütünlüğü, dijital imza ise bütünlükle birlikte kaynağı doğrular.</p></section>
      <section id="rollback"><h2>Anti-rollback neden ayrıdır?</h2><p>Eski bir firmware doğru anahtarla imzalanmış olabilir. Bu nedenle yalnızca imza kontrolü eski ve bilinen zafiyetli sürümün kurulmasını engellemez. Anti-rollback için güvenilir monoton sayaç, security version veya benzer bir sürüm tabanı gerekir.</p></section>
      <section id="updates"><h2>Güvenli güncelleme</h2><p>Güncelleme sistemi imajı indirme, imza doğrulama, uyumluluk ve sürüm politikası kontrolü, pasif alana yazma, deneme açılışı, onay ve geri dönüş adımlarını kapsayabilir. Her üreticinin imaj formatı ve boot metadata mekanizması farklıdır.</p></section>
      <section id="related"><h2>İlgili içerik</h2><ul><li><Link to="/chips">Secure boot ile filtrelenmiş katalog kayıtları</Link></li><li><Link to="/methodology">Wiki güvenlik kanıt seviyeleri</Link></li><li><Link to="/guides/chip-selection">İşlemci seçim kılavuzu</Link></li></ul></section>
      <PageToc items={[{id:'chain',label:'Güven zinciri'},{id:'signature',label:'İmza doğrulama'},{id:'rollback',label:'Anti-rollback'},{id:'updates',label:'Güvenli güncelleme'},{id:'related',label:'İlgili içerik'}]} />
    </article>
  )
}
