# Geliştirme yol haritası

## Aşama 1 — çalışan temel (tamamlandı)

- React, Vite ve TypeScript iskeleti
- Ayrı Git deposu
- Dokuz üreticili, 56 kayıtlı katalog
- Ayrıntılı ve kaynaklı güvenlik modeli
- Katalog araması ve filtreleri
- Üçlü karşılaştırma aracı
- Zorunlu kriterleri ve eleme nedenlerini gösteren seçim aracı
- Dark mode ve responsive tablo düzeltmeleri
- Wiki düzeni, ayrı madde adresleri ve kılavuz sayfaları
- Her çip için ayrı JSON içerik dosyası
- Seri kaydından türetilen ayrı exact-part varyant şeması
- Üretici → aile → model sayfa hiyerarşisi
- Kaynak bağlantısı denetim komutu
- Kaynaklı uygulama etiketleri ve katalog filtresi
- Tarihli fiyat anlık görüntüsü ve sınırlı CoreMark/USD karşılaştırması
- i.MX 93, AM625 ve STM32MP257 için tam Linux MPU sipariş kodları
- Somut ürün/sektör uygunluğu, kanıt düzeyi, avantaj ve eleme koşulu modeli
- Test/build kontrolü
- GitHub Pages workflow'u

## Aşama 2 — katalog derinliği

- STM32: H5, U5 ve STM32MP257FAI3 mevcut; H7, WB ve MP1 sırada
- NXP: MCX N947, RW612, i.MX 93 serisi ve MIMX9352CVVXMAC mevcut; LPC, diğer MCX, i.MX RT ve i.MX 8 tam OPN'leri sırada
- Espressif: ESP32-S3 ve P4 seri kayıtları ile FN8, FH4R2, P4NRW16X ve P4NRW32X tam parçaları mevcut; C3, C6 ve H2 sırada
- Silicon Labs: EFR32MG24 seri kaydı, üreticinin güncel seçim tablosundaki 22 MG24 OPN'si ve tam SiWG917M111MGTBA kaydı mevcut; MG26 ve diğer SiWx917 SKU'ları sırada
- Ödeme/güvenli eleman: PN7642 ve MIFARE SAM AV3 mevcut; ST31/STPay ve diğer secure element aileleri sırada
- Nordic: nRF5340 ve nRF54L15-QFAA mevcut; nRF52, diğer nRF54 ve nRF91 sırada
- TI: CC1352P7, AM625 serisi ve AM6254ATCGGAALW mevcut; diğer CC13xx/CC26xx ve MSPM0 sırada
- Microchip: PIC32CK, SAM L11 ve radyasyon sert SAMRH71 mevcut; PIC32CX ve SAMA5 sırada
- Renesas: RA6M5 ve RA8M1 mevcut; RA2/RA4 ve RZ sırada
- Infineon: PSoC 64 ve AURIX TC397 mevcut; diğer PSoC 6, XMC ve AURIX OPN'leri sırada
- GigaDevice, Realtek/Ameba, Raspberry Pi RP, Qualcomm ve MediaTek için kapsam kararı

## Aşama 3 — gerçek ürün seçimi

- Tercih kriterleri, ağırlıklandırma ve paylaşılabilir sorguyla seçim aracını geliştirme
- “Tek çip” ve “ana MCU + bağlantı çipi” mimari önerileri
- Yeni sektör kayıtları için kaynaklı referans tasarımı ve hedef uygulama kapsamı
- Güç tüketimi, toplam BOM karmaşıklığı ve geliştirme zorluğu kanıt alanları
- Neden önerildi/neden elendi açıklaması

## Aşama 4 — veri kalitesi

- Kaynak kapsam oranı ve alan bazlı kanıt raporu
- Son inceleme tarihi eskimiş kayıt uyarısı
- Datasheet revizyonu ve errata bağlantıları
- Katkı şablonu ve teknik review süreci

## Aşama 5 — ürünleşme

- Türkçe/İngilizce dil seçimi
- Kalıcı URL'li ayrı çip detay sayfaları
- Paylaşılabilir karşılaştırma bağlantıları
- PWA/offline katalog
- Erişilebilirlik ve performans denetimi
