# AI / geliştirici devir notu

## Proje kökü

`C:\Users\samet\OneDrive\Masaüstü\cyber-quanta-wiki-processors`

Bu proje `secure-signing` reposundan tamamen ayrıdır. Eski repo değiştirilmedi.

## Teknoloji ve kararlar

- React 19 + Vite 8 + TypeScript 6
- Veri doğrulama: Zod
- Test: Vitest
- Lint: Oxlint
- Ücretsiz deploy: GitHub Pages
- Backend/veritabanı yok; katalog build içine statik gömülür.
- Astro düşünülmüştü ancak yerel Node 20 ile güncel create-astro Node 22 istediği
  için React/Vite seçildi.

## Güncel durum

- Git deposu `main` dalındadır ve `origin`, public GitHub repository'sine bağlıdır:
  `https://github.com/mathissdupont/cyber-quanta-wiki-processors`.
- Dokuz üreticiden 56 ayrı çip/seri kaydı var: 46 tam parça, 10 seri/ön eleme kaydı.
- Son doğrulamada `npm run check`: lint + 24 test + production build başarılıdır.
- Son doğrulamada `npm run check:links`: 93 benzersiz kaynak URL'si denetlenmiş, 0 hata alınmıştır.
- Arayüz SaaS/landing page görünümünden Wikipedia tarzı bilgi mimarisine çevrildi.
- Katalog, her çip maddesi, üretici dizini, kılavuzlar ve karşılaştırma ayrı adreslerde.
- Üretici ve aile sayfaları kalıcı URL'lerle üretici → aile → model hiyerarşisi kurar.
- `/tools/selector` zorunlu teknik ve sektör gereksinimlerini uygular; eşleşen
  somut ürün kanıtını, avantajları ve kritik koşulları gösterir. Sektör kaydı
  eksikliği teknik uyumsuzluk değil, kanıt eksikliği olarak açıklanır.
- `/tools/value` tarihli fiyat anlık görüntülerini ve yalnızca karşılaştırılabilir
  MCU'larda CoreMark/USD hesabını gösterir.
- Katalog `applicationTags` alanıyla IoT, endüstriyel, otomotiv, Edge AI,
  ödeme/erişim ve havacılık/savunma filtreleri sunar.
- `sectorFits`, somut ürün adaylığını `reference-design`,
  `manufacturer-target` veya `feature-match` kanıt düzeyiyle; avantajlar,
  kritik koşullar ve kaynaklar birlikte olacak biçimde gösterir.
- STM32G431CBT6 kaydı, ST'nin STEVAL-CTM014A çamaşır makinesi motor sürücü
  referans tasarımına doğrudan bağlı ilk `reference-design` örneğidir.
- Dark mode tercihi `cq-wiki-theme` anahtarıyla localStorage'da saklanır.
- Sayfa içi içerik menüsü `PageToc` düğmelerini kullanır; `HashRouter` route'unu
  bozmadan hedef bölümü `scrollIntoView` ile açar.
- Kılavuz bölümü yalnızca genel ve kalıcı konular içerir: secure boot temelleri
  ve işlemci seçim metodolojisi.
- GitHub Pages workflow'u aktiftir. `main` dalına yapılan push sonrasında test,
  build ve deploy çalışır. Canlı adres:
  `https://mathissdupont.github.io/cyber-quanta-wiki-processors/`.

## Önemli dosyalar

- `src/domain/chip.ts`: Tek veri sözleşmesi.
- `src/content/chips/*.json`: Bir dosya/bir kayıt katalog içeriği.
- `src/content/chips/index.ts`: JSON dosyalarını otomatik keşfeden yükleyici.
- `src/engine/catalog.ts`: Arama ve filtreleme.
- `src/engine/selector.ts`: Zorunlu kriter ve açıklanabilir eleme mantığı.
- `src/domain/slug.ts`: Üretici ve aile URL slug üretimi.
- `src/domain/value.ts`: Fiyat biçimleme ve sınırlı CoreMark/USD hesabı.
- `scripts/check-source-links.mjs`: Resmî kaynakların HTTP erişim denetimi.
- `docs/CONTENT_POLICY_TR.md`: Madde/kılavuz kabul ve kaynak politikası.
- `src/layout/WikiLayout.tsx`: Wiki bilgi mimarisi.
- `src/pages/`: Madde, dizin, kılavuz ve araç sayfaları.
- `src/App.tsx`: Yalnızca route tanımları.
- `docs/ROADMAP_TR.md`: Sonraki kapsam.

## Bilinen sınırlar

- On seri maddesi ön eleme için korunur. Bunlara bağlı exact-part varyantları
  `extends` ile eklenir. EFR32MG24 için üreticinin 25 Ağustos 2026 seçim
  tablosundaki 22 OPN ayrı kayıttır; diğer aileler henüz bütün OPN'leri kapsamaz.
- MPU/Linux kapsamı i.MX 93 ve AM625 seri kayıtlarının yanında
  `MIMX9352CVVXMAC`, `AM6254ATCGGAALW` ve `STM32MP257FAI3` tam OPN'lerini içerir.
- Anti-rollback birçok üreticide bilerek `unknown` bırakıldı; secure boot'tan
  türetilmedi.
- Yedi tam OPN için tarih/adet/satıcı bilgili fiyat anlık görüntüsü vardır.
  Stok kalıcı alan değildir; fiyatlar teklif veya toplam BOM olarak yorumlanmaz.
- Site henüz yalnızca Türkçe.
- Henüz tarayıcı otomasyon testi yok.
- PN7642, MIFARE SAM AV3, ESP32-P4 ve SiWG917M111MGTBA resmî üretici
  kaynaklarına dayalı ayrı katalog kayıtlarıdır.
- Yeni bir kılavuz yalnızca tek bir çipi veya konuşmadaki örneği açıklamak için
  açılmamalıdır. Konu birden fazla aileye uygulanabilen, kalıcı teknik başlık
  olmalı; ürüne özgü bilgiler ilgili çip maddesinde tutulmalıdır.
- Seçim motoru seri kaydına `ADAY` vermez. Teknik şartları karşılayan seri
  `ÖN ELEME`, yalnızca exact-part kayıt `ADAY` olabilir.
- `industrial` alanı opsiyoneldir; endüstriyel kalifikasyon, fonksiyonel
  güvenlik, longevity ve gerçek zamanlı çalışma kanıtlarını ayrı tutar.
- STM32H573ZI ve RW612 paket/sıcaklık suffix'i taşımadığı için seri/ön eleme
  olarak düzeltilmiştir; tam sipariş kodları ayrıca eklenmelidir.

## Sonraki mantıklı iş

Somut sektör modeli STM32G431CBT6, SAMRH71, AURIX TC397, MIFARE SAM AV3 ve
AM6254 ile başlatıldı ve gereksinim seçiciye bağlandı. Sonraki adım sektör
kapsamını resmî referans tasarım/hedef uygulama kanıtıyla genişletmek, fiyat
verisinin eskime uyarısını otomatikleştirmek ve seçiciye toplam BOM karmaşıklığı
kriteri eklemektir.
