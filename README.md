# Cyber Quanta Processor Wiki

Kaynaklı işlemci kataloğu ve gömülü sistem güvenlik kılavuzu.
Proje; MCU, kablosuz MCU, SoC ve ileride MPU ailelerini yalnızca teknik özellik
listesi olarak değil, ürün gereksinimleri ve güvenlik yetenekleriyle birlikte
karşılaştırmayı amaçlar.

Canlı wiki: https://mathissdupont.github.io/cyber-quanta-wiki-processors/

## İlk çalışan kapsam

- 9 üretici: ST, NXP, Espressif, Silicon Labs, Nordic, Texas Instruments,
  Microchip, Renesas ve Infineon
- 43 kaynaklı çip/seri kaydı; 38 tam parça ve 5 seri kaydı
- İşlemci, bellek, bağlantı, çevre birimi ve fiziksel özellikler
- Secure boot, güvenli güncelleme, anti-rollback, güven kökü, izolasyon,
  flash şifreleme, debug ve anahtar saklama incelemesi
- `doğrulandı / koşullu / desteklenmiyor / uygulanamaz / belirsiz` kanıt durumları
- Wikipedia/dokümantasyon tarzı içerik ağacı ve madde sayfaları
- Arama, filtreleme, gereksinim seçici ve ayrı üçlü karşılaştırma aracı
- Açık/koyu tema ve mobilde yatay kaydırılabilir teknik tablolar
- Her çip için kalıcı wiki adresi ve ayrıntılı kaynakça
- Üretici → aile → seri/tam parça URL hiyerarşisi
- Zod veri doğrulama, Vitest testleri ve GitHub Pages deploy akışı

## Yerel çalıştırma

Gereksinim: Node.js 20.19+ veya 22.12+.

```bash
npm install
npm run dev
```

Vite terminalde yerel adresi gösterir. Varsayılan adres genellikle
`http://localhost:5173` olur.

Tüm kontroller:

```bash
npm run check
```

Bu komut sırasıyla lint, test ve production build çalıştırır.

Resmî kaynak bağlantılarını ağ üzerinden denetlemek için:

```bash
npm run check:links
```

## Proje yapısı

```text
src/
├── content/chips/*.json   Her çip için ayrı içerik dosyası
├── content/chips/index.ts JSON dosyalarını otomatik yükleyen katalog
├── domain/chip.ts         Zod şeması ve TypeScript veri sözleşmesi
├── domain/slug.ts         Üretici/aile URL kimliği üretimi
├── engine/catalog.ts      Wiki arama ve filtreleme mantığı
├── engine/selector.ts     Zorunlu kriter/eleme açıklaması motoru
├── layout/WikiLayout.tsx  Sol içerik ağacı ve global arama
├── pages/                 Ayrı wiki madde/kılavuz sayfaları
├── scripts/               Kaynak bağlantısı denetimleri
├── App.tsx                Yalnızca sayfa yönlendirme tablosu
└── App.css                Responsive wiki görünümü

docs/
├── DATA_MODEL_TR.md       Veri alanlarının teknik açıklaması
├── CONTENT_POLICY_TR.md   Madde türü, kaynak ve kılavuz kabul kuralları
├── ROADMAP_TR.md          Aşamalı geliştirme planı
├── AI_HANDOFF.md          Devralma ve mevcut durum notu
└── STAJ_DEFTERI.md        Günlük çalışma kaydı
```

## Veri güveni ilkesi

Bir üreticinin genel aile özelliği, otomatik olarak her sipariş koduna
aktarılmaz. `recordScope: "series"` kayıtlarında kullanıcıya varyant uyarısı
gösterilir. Belirsiz ve koşullu özellikler seçim motorunda zorunlu kriteri
karşılıyor kabul edilmez.
Her kayıt en az bir resmî üretici kaynağı ve inceleme tarihi taşımak zorundadır.
Yeni içerik ve kılavuzlar `docs/CONTENT_POLICY_TR.md` kabul kurallarına uyar.

Fiyat, stok ve tedarik süresi hızla değiştiği için şu anda statik katalog alanı
değildir. İleride tarihli ve sağlayıcısı belirtilen ayrı bir veri kaynağından
beslenmelidir.

## GitHub Pages yayını

1. GitHub'da boş bir public repository oluştur.
2. Bu klasörü remote'a bağla ve `main` dalını push et.
3. Repository `Settings > Pages > Source` alanında **GitHub Actions** seç.
4. `Deploy processor wiki to GitHub Pages` workflow'unun tamamlanmasını bekle.

Site statik üretildiği için ücretli backend veya veritabanı gerekmez.

## Önemli sınır

Seçim motoru mühendislik kararını otomatikleştiren kesin bir otorite değildir.
Sonuçlar araştırılacak kısa listedir. Nihai seçimde tam sipariş kodunun güncel
datasheet'i, errata belgesi, yaşam döngüsü, sıcaklık/paket seçeneği, maliyet,
tedarik durumu ve sertifikasyon gereksinimleri ayrıca doğrulanmalıdır.
