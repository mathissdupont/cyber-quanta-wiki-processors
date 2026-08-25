# Geliştirme yol haritası

## Aşama 1 — çalışan temel (tamamlandı)

- React, Vite ve TypeScript iskeleti
- Ayrı Git deposu
- Dokuz üreticili, 51 kayıtlı katalog
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
- Test/build kontrolü
- GitHub Pages workflow'u

## Aşama 2 — katalog derinliği

- STM32: H5 ve U5 örnekleri mevcut; H7, WB, MP1 ve MP2 sırada
- NXP: MCX N947, RW612 ve i.MX 93 mevcut; LPC, diğer MCX, i.MX RT ve i.MX 8/9 tam OPN'leri sırada
- Espressif: ESP32-S3 ve P4 seri kayıtları ile FN8, FH4R2, P4NRW16X ve P4NRW32X tam parçaları mevcut; C3, C6 ve H2 sırada
- Silicon Labs: EFR32MG24 seri kaydı, üreticinin güncel seçim tablosundaki 22 MG24 OPN'si ve tam SiWG917M111MGTBA kaydı mevcut; MG26 ve diğer SiWx917 SKU'ları sırada
- Ödeme/güvenli eleman: PN7642 ve MIFARE SAM AV3 mevcut; ST31/STPay ve diğer secure element aileleri sırada
- Nordic: nRF5340 ve nRF54L15-QFAA mevcut; nRF52, diğer nRF54 ve nRF91 sırada
- TI: CC1352P7 ve AM625 mevcut; diğer CC13xx/CC26xx, MSPM0 ve AM62 tam OPN'leri sırada
- Microchip: PIC32CK ve SAM L11 mevcut; PIC32CX ve SAMA5 sırada
- Renesas: RA6M5 ve RA8M1 mevcut; RA2/RA4 ve RZ sırada
- Infineon: PSoC 64 ve AURIX TC397 mevcut; diğer PSoC 6, XMC ve AURIX OPN'leri sırada
- GigaDevice, Realtek/Ameba, Raspberry Pi RP, Qualcomm ve MediaTek için kapsam kararı

## Aşama 3 — gerçek ürün seçimi

- Tercih kriterleri, ağırlıklandırma ve paylaşılabilir sorguyla seçim aracını geliştirme
- “Tek çip” ve “ana MCU + bağlantı çipi” mimari önerileri
- Sayaç, kilit, gateway, giyilebilir cihaz ve motor sürücü gibi alan kılavuzları
- Güç tüketimi, BOM karmaşıklığı ve geliştirme zorluğu puanları
- Neden önerildi/neden elendi açıklaması

## Aşama 4 — veri kalitesi

- JSON/YAML tabanlı ayrı kayıt dosyaları
- Kaynak kimliği olmayan iddiaları CI'da reddetme
- Son inceleme tarihi eskimiş kayıt uyarısı
- Datasheet revizyonu ve errata bağlantıları
- Katkı şablonu ve teknik review süreci

## Aşama 5 — ürünleşme

- Türkçe/İngilizce dil seçimi
- Kalıcı URL'li ayrı çip detay sayfaları
- Paylaşılabilir karşılaştırma bağlantıları
- PWA/offline katalog
- Erişilebilirlik ve performans denetimi
