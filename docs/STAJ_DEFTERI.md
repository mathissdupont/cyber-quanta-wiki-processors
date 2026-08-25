# Staj defteri

## 25 Ağustos 2026 — Kaynaklı işlemci wiki'si ve seçim asistanı

Bugün farklı üreticilere ait gömülü işlemcilerin teknik ve güvenlik
özelliklerini ortak bir arayüzde karşılaştırmak amacıyla yeni bir web projesi
başlatıldı. Proje mevcut güvenli güncelleme çalışmasından ayrı bir klasörde ve
ayrı Git deposunda oluşturuldu. Ücretsiz statik yayın hedefi nedeniyle React,
Vite ve TypeScript kullanıldı.

Çip bilgilerinin yalnızca düz metin olarak tutulmasının hatalı karşılaştırmalara
yol açabileceği değerlendirildi. Bu nedenle işlemci, bellek, bağlantı,
çevre birimleri, fiziksel özellikler ve geliştirme araçlarının yanında secure
boot, güvenli firmware güncelleme, anti-rollback, hardware root of trust,
izolasyon, flash şifreleme, güvenli debug ve anahtar saklama alanlarını içeren
bir veri modeli hazırlandı. Her güvenlik özelliği doğrulandı, koşullu,
desteklenmiyor veya belirsiz durumlarından biriyle işaretlendi ve üretici
kaynaklarına bağlandı.

STMicroelectronics, NXP, Espressif, Silicon Labs, Nordic Semiconductor,
Texas Instruments, Microchip, Renesas ve Infineon için başlangıç kayıtları
oluşturuldu. Kullanıcının arama ve filtreleme yapabildiği katalog, her işlemci
için ayrı wiki maddesi, üretici/aile dizini, teknik kılavuzlar ve üç çipi yan
yana inceleyen karşılaştırma tablosu geliştirildi. Katalogdaki her çip ayrı JSON
dosyasına taşınarak yeni kayıtların uygulama kodundan bağımsız eklenmesi
sağlandı. Veri modeli Zod ile doğrulandı; arama ve filtreleme davranışı için
Vitest testleri yazıldı. Devamında kullanıcı arayüzü Wikipedia benzeri bilgi
mimarisi korunarak geliştirildi. Gereksinim seçici tekrar eklendi; zorunlu
özellikleri karşılamayan çiplerin neden elendiği açık metin olarak gösterildi.
Dark mode, kalıcı tema tercihi ve dar ekranlarda teknik tabloların yatay
kaydırılması sağlandı.

NFC denetleyicileri ve güvenli erişim modülleri incelendi. Resmî NXP
kaynaklarına dayalı PN7642 ve MIFARE SAM AV3 kayıtları ayrı bileşen sınıfları
olarak kataloğa eklendi. Ayrıca ESP32-P4 ve tam sipariş koduyla
SiWG917M111MGTBA kaydedildi. Silicon Labs Secure Zone, secure boot,
anti-rollback ve güvenli anahtar saklama özellikleri üretici dokümanları
üzerinden incelendi. Kılavuz bölümünün yalnızca üreticiden bağımsız, genel
teknik konular içermesi için bilgi mimarisi sadeleştirildi; ürüne özgü bilgiler
ilgili katalog maddelerinde tutuldu.

Lint, yedi otomatik test ve production build başarıyla tamamlandı. Son olarak GitHub Pages üzerinde
ücretsiz yayın yapacak otomasyon dosyası ve projenin başka bir geliştirici ya
da yapay zekâ tarafından devralınabilmesi için teknik devir notu hazırlandı.

Wiki içeriğinin resmî ve tutarlı biçimde genişletilmesi için madde kabul
politikası hazırlandı. Üretici dizini, aile maddesi, seri maddesi, tam parça
maddesi, teknik kılavuz ve araç sayfalarının görevleri birbirinden ayrıldı.
Seçim motoru güncellenerek seri kayıtlarının nihai aday olarak gösterilmesi
engellendi; seri kayıtları “ön eleme”, yalnızca tam sipariş kodları “aday”
statüsüne alındı.

EFR32MG24, ESP32-S3, ESP32-P4, RA8M1 ve PSoC 64 serilerinden toplam on tam
sipariş kodu resmî üretici belgeleriyle doğrulandı. Ortak verilerin her dosyada
tekrarlanmaması için exact-part kayıtlarının seri kaydını `extends` alanıyla
devraldığı veri birleştirme mekanizması geliştirildi. Bellek ve paket farklarını
doğru göstermek amacıyla paket içi PSRAM alanı veri modeline eklendi. Üretici,
aile ve model için ayrı URL hiyerarşisi oluşturuldu. Benzersiz model, parent
ilişkisi, kaynak referansı ve URL slug kontrolleriyle test sayısı 11'e çıkarıldı.
Ek olarak 31 resmî kaynak bağlantısını HTTP üzerinden denetleyen komut
çalıştırıldı ve bütün bağlantılar erişilebilir bulundu.
