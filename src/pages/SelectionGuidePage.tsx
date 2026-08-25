import { PageToc } from '../components/PageToc'

export function SelectionGuidePage() {
  return (
    <article className="wiki-article">
      <header className="article-header"><p className="breadcrumb">Ana sayfa / Kılavuzlar</p><h1>Gömülü işlemci seçim kılavuzu</h1><p className="lead">Ürün fikrini doğrulanabilir donanım ve güvenlik gereksinimlerine dönüştürme yöntemi.</p></header>
      <section id="classification"><h2>1. İş yükünü sınıflandırın</h2><div className="table-scroll"><table className="wiki-table"><thead><tr><th>Sınıf</th><th>Genel özellik</th><th>Tipik yazılım</th></tr></thead><tbody><tr><th>MCU</th><td>Deterministik kontrol, dahili Flash/RAM, düşük güç</td><td>Bare metal, RTOS</td></tr><tr><th>Kablosuz MCU</th><td>MCU ve radyo aynı çipte</td><td>RTOS ve protokol stack'i</td></tr><tr><th>MPU</th><td>Harici DRAM, MMU, yüksek seviye arayüzler</td><td>Linux</td></tr><tr><th>Uygulama SoC'si</th><td>GPU/NPU, görüntü ve yoğun multimedya</td><td>Linux/Android</td></tr><tr><th>Güvenli eleman</th><td>Anahtarları ve kriptografik işlemleri uygulama işlemcisinden ayırır</td><td>Host komut arayüzü</td></tr></tbody></table></div></section>
      <section id="requirements"><h2>2. Zorunlu ve tercih edilen gereksinimleri ayırın</h2><p>Zorunlu kriterler puanlama konusu yapılmamalıdır. Örneğin ürün politikası secure boot gerektiriyorsa, özelliği belirsiz olan bir parça yüksek performansı nedeniyle aday listesine alınmamalıdır.</p><ul><li>İşletim sistemi ve gerçek zamanlılık</li><li>İşlemci performansı ve bellek</li><li>Kablolu/kablosuz bağlantı</li><li>Analog ve kontrol çevre birimleri</li><li>Çalışma sıcaklığı ve paket</li><li>Secure boot, güncelleme, rollback ve anahtar yönetimi</li><li>SDK, lisans, yaşam döngüsü ve tedarik</li></ul></section>
      <section id="architecture"><h2>3. Tek çip varsayımını sorgulayın</h2><p>Ana kontrol, kablosuz bağlantı ve yüksek seviyeli kullanıcı arayüzü farklı işlemcilere ayrılabilir. Tek çip BOM'u azaltırken iki işlemcili yapı güvenlik alanlarını, gerçek zamanlı kontrolü ve bağlantı yazılımını ayırabilir.</p></section>
      <section id="verification"><h2>4. Tam sipariş kodunu doğrulayın</h2><p>Aile sayfası ön eleme için kullanılır. Nihai kararda tam sipariş kodunun datasheet'i, errata belgesi, paket/sıcaklık seçeneği, boot ROM davranışı, provisioning süreci ve üretici yaşam döngüsü kontrol edilmelidir.</p></section>
      <PageToc items={[{id:'classification',label:'İş yükü sınıfı'},{id:'requirements',label:'Gereksinimler'},{id:'architecture',label:'Mimari'},{id:'verification',label:'Doğrulama'}]} />
    </article>
  )
}
