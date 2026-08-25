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
- Dokuz üreticiden 43 ayrı çip/seri kaydı var: 38 tam parça, 5 seri.
- Son doğrulamada `npm run check`: lint + 12 test + production build başarılıdır.
- Son doğrulamada `npm run check:links`: 51 benzersiz resmî URL denetlenmiştir.
- Arayüz SaaS/landing page görünümünden Wikipedia tarzı bilgi mimarisine çevrildi.
- Katalog, her çip maddesi, üretici dizini, kılavuzlar ve karşılaştırma ayrı adreslerde.
- Üretici ve aile sayfaları kalıcı URL'lerle üretici → aile → model hiyerarşisi kurar.
- `/tools/selector` zorunlu gereksinimleri uygular ve her elenen kayıt için engel gösterir.
- Dark mode tercihi `cq-wiki-theme` anahtarıyla localStorage'da saklanır.
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
- `scripts/check-source-links.mjs`: Resmî kaynakların HTTP erişim denetimi.
- `docs/CONTENT_POLICY_TR.md`: Madde/kılavuz kabul ve kaynak politikası.
- `src/layout/WikiLayout.tsx`: Wiki bilgi mimarisi.
- `src/pages/`: Madde, dizin, kılavuz ve araç sayfaları.
- `src/App.tsx`: Yalnızca route tanımları.
- `docs/ROADMAP_TR.md`: Sonraki kapsam.

## Bilinen sınırlar

- Beş seri maddesi ön eleme için korunur. Bunlara bağlı exact-part varyantları
  `extends` ile eklenir. EFR32MG24 için üreticinin 25 Ağustos 2026 seçim
  tablosundaki 22 OPN ayrı kayıttır; diğer aileler henüz bütün OPN'leri kapsamaz.
- MPU/Linux kataloğu henüz yok.
- Anti-rollback birçok üreticide bilerek `unknown` bırakıldı; secure boot'tan
  türetilmedi.
- Fiyat/stok tutulmuyor.
- Site henüz yalnızca Türkçe.
- Henüz tarayıcı otomasyon testi yok.
- PN7642, MIFARE SAM AV3, ESP32-P4 ve SiWG917M111MGTBA resmî üretici
  kaynaklarına dayalı ayrı katalog kayıtlarıdır.
- Yeni bir kılavuz yalnızca tek bir çipi veya konuşmadaki örneği açıklamak için
  açılmamalıdır. Konu birden fazla aileye uygulanabilen, kalıcı teknik başlık
  olmalı; ürüne özgü bilgiler ilgili çip maddesinde tutulmalıdır.
- Seçim motoru seri kaydına `ADAY` vermez. Teknik şartları karşılayan seri
  `ÖN ELEME`, yalnızca exact-part kayıt `ADAY` olabilir.

## Sonraki mantıklı iş

Önce Linux/MPU boşluğunu kapatmak için NXP i.MX 8M Plus, STM32MP157/MP25 ve
TI AM62x kayıtları resmî dokümanlarla eklenmeli. Sonra aynı ailedeki model
numarası farklarını göstermek üzere NXP MCX N94/N54 ve STM32 varyantları ayrı
exact-part kayıtlarına ayrılmalı. Ardından seçim sonuçlarını URL ile paylaşma
ve tarayıcı erişilebilirlik testleri eklenmeli.
