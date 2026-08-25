# Geliştirme yol haritası

## Aşama 1 — çalışan temel (tamamlandı)

- React, Vite ve TypeScript iskeleti
- Ayrı Git deposu
- Dokuz üreticili, 23 kayıtlı başlangıç kataloğu
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

- STM32: U5, H5, H7, WB, MP1 ve MP2
- NXP: MCX, LPC, RW61x, i.MX RT, i.MX 8/9
- Espressif: ESP32-S3 ve P4 seri kayıtları ile FN8, FH4R2, P4NRW16X ve P4NRW32X tam parçaları mevcut; C3, C6 ve H2 sırada
- Silicon Labs: EFR32MG24 seri kaydı, iki MG24 OPN'si ve tam SiWG917M111MGTBA kaydı mevcut; kalan MG24 OPN'leri, MG26 ve diğer SiWx917 SKU'ları sırada
- Ödeme/güvenli eleman: PN7642 ve MIFARE SAM AV3 mevcut; ST31/STPay ve diğer secure element aileleri sırada
- Nordic: nRF52, nRF53, nRF54, nRF91
- TI: CC13xx/CC26xx, MSPM0, AM62/Sitara
- Microchip: PIC32CK, PIC32CX, SAM L11, SAMA5
- Renesas: RA2/RA4/RA6/RA8, RZ
- Infineon: PSoC 6/64, XMC, AURIX
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
