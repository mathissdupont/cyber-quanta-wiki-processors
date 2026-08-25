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

### 25 Ağustos 2026 — EFR32MG24 tam parça kataloğunun genişletilmesi

Silicon Labs'ın resmî EFR32MG24 ürün seçim tablosu incelenerek güncel tabloda
yer alan 22 sipariş kodunun tamamı ayrı wiki kayıtlarına dönüştürüldü. Parçalar;
Flash ve RAM kapasitesi, radyo çıkış gücü, GPIO sayısı, QFN paket tipi,
Secure Vault Mid/High güvenlik seviyesi ve AI/ML hızlandırıcı bulunması gibi
OPN düzeyinde değişen alanlarla ayrıştırıldı.

Seri kaydında bütün varyantlara yanlışlıkla aktarılabilecek PUF, anti-tamper,
gelişmiş secure debug ve AI/ML hızlandırıcı iddiaları koşullu hale getirildi.
Secure Vault Mid parçalarında High düzeyi özelliklerin bulunmadığı, High
parçalarında ise ilgili güvenlik yeteneklerinin desteklendiği açıkça kaydedildi.
Bu ayrım için otomatik regresyon testi eklendi. Katalog toplam 43 kayda ulaştı:
38 tam sipariş kodu ve 5 seri kaydı.

### 25 Ağustos 2026 — Endüstriyel işlemci kapsamı ve seçim ölçütleri

Kataloğun yalnızca teknik özellik listesi olmaması için endüstriyel seçimde
kullanılan dört alan veri modeline eklendi: endüstriyel kalifikasyon,
fonksiyonel güvenlik, üretici ürün ömrü taahhüdü ve gerçek zamanlı çalışma.
Her alanın doğrulandı, koşullu veya belirsiz durumu ile kaynak referansı ayrı
tutuldu. Katalog ve gereksinim seçici bu kanıtlara göre filtreleme yapacak
şekilde geliştirildi; karşılaştırma ve çip madde sayfalarında yeni bir
endüstriyel uygunluk bölümü oluşturuldu.

Resmî üretici belgeleri incelenerek STM32U585AII6, MCXN947VDFT,
R7FA6M5BH3CFC#BA0, nRF54L15-QFAA ve SAK-TC397XA-256F300S BD tam parça
kayıtları; i.MX 93, AM625 ve ATSAML11E16A seri/ön eleme kayıtları eklendi.
Bu paket düşük güçlü MCU, kablosuz sensör, motor kontrol, Linux gateway/HMI ve
ASIL-D/SIL-3 güvenlik-kritik kontrol sınıflarını kapsadı. Paket suffix'i
seçilmemiş kayıtların nihai aday olarak gösterilmemesi özellikle korundu.
Önceki katalogdaki STM32H573ZI ve RW612 kayıtlarının da tam paket/sıcaklık
suffix'i taşımadığı fark edilerek kayıt kapsamları seri/ön eleme olarak
düzeltildi; böylece seçim aracının eksik sipariş kodlarını nihai aday göstermesi
engellendi.

Sayfa içi “Bu sayfada” menüsündeki bağlantıların HashRouter adresini silerek
404 sayfasına yönlendirdiği hata tespit edildi. Ham `#section` bağlantıları
ortak `PageToc` bileşeniyle değiştirildi. Yeni bileşen URL route'unu
değiştirmeden hedef başlığa kaydırma yapıyor. Bu davranış için iki otomatik
regresyon testi eklenerek aynı hatanın diğer wiki ve kılavuz sayfalarında
tekrarlanması engellendi.

### 25 Ağustos 2026 — MPU, uygulama etiketi ve fiyat/performans katmanı

Katalogda daha önce yalnızca i.MX 93 ve AM625 seri düzeyinde MPU kayıtları
bulunduğu için satın alınabilir parça seçimine geçilemiyordu. NXP
MIMX9352CVVXMAC, Texas Instruments AM6254ATCGGAALW ve STMicroelectronics
STM32MP257FAI3 tam sipariş kodları üretici ürün sayfaları ve veri sayfalarıyla
doğrulandı. Paket, sıcaklık, Linux desteği, gerçek zamanlı yardımcı çekirdek,
güvenlik ve harici bellek gereksinimleri ayrı kaydedildi. Böylece MPU kayıtları
seri ön elemesinden gerçek OPN karşılaştırmasına taşındı.

Katalog filtresine kaynaklı uygulama etiketleri eklendi. IoT, endüstriyel,
otomotiv, Edge AI, ağ/gateway, akıllı ev, ödeme/erişim ve havacılık/savunma
etiketlerinin her biri üretici kaynak kimliklerine bağlandı. Savunma etiketi
genel bir tahminle verilmedi; Microchip'in resmî olarak Aerospace and Defense
tasarımları için önerdiği radyasyon sertleştirilmiş SAMRH71F20E-7GB-MQ parçası
eklendi. Bu parçanın secure boot ve anti-rollback özellikleri doğrulanamadığı
için ilgili alanlar bilinçli olarak belirsiz bırakıldı.

Tam OPN'ler için satıcı, para birimi, adet ve kontrol tarihi içeren fiyat anlık
görüntüsü modeli geliştirildi. Ayrı fiyat/performans sayfası ve karşılaştırma
satırları eklendi. MCU'larda aynı CoreMark metriği ve 1 adet USD fiyatı varsa
CoreMark/USD hesaplandı; MPU'larda harici DDR, PMIC, depolama ve Linux yazılım
maliyeti nedeniyle yanıltıcı GHz/USD puanı üretilmedi. Kaynak kimliği testleri
etiket, fiyat ve benchmark alanlarını da kapsayacak biçimde genişletildi.
Toplam 21 otomatik test, lint ve production build başarılı oldu; 88 benzersiz
kaynak bağlantısı denetlendi ve hata bulunmadı.

### 25 Ağustos 2026 — Somut ürün ve sektör uygunluğu modeli

Çiplerin yalnızca genel “IoT” veya “endüstriyel” etiketiyle gösterilmesinin ürün
seçimi için yeterli olmadığı değerlendirildi. Bu nedenle veri modeline somut
ürün/sistem adı, kanıt düzeyi, teknik avantajlar, kritik koşullar ve kaynak
kimliklerini birlikte taşıyan `sectorFits` alanı eklendi. Üretici referans
tasarımı, üreticinin hedef uygulaması ve kaynaklı özellik eşleşmesi birbirinden
ayrıldı. Böylece mühendislik çıkarımı kesin üretici önerisi gibi sunulmadı.

STMicroelectronics'in STEVAL-CTM014A çamaşır makinesi motor sürücü referans
tasarımı incelendi. Referansın ana kontrolcü olarak kullandığı tam
`STM32G431CBT6` sipariş kodu kataloğa eklendi. Motor-control PWM zamanlayıcıları,
ADC'ler, karşılaştırıcılar, dahili işlemsel yükselteçler, CORDIC ve FMAC'ın
kapalı çevrim BLDC kontrolündeki avantajları kaydedildi. Bunun yanında MCU'nun
tek başına şebeke motorunu süremeyeceği, harici güç ve izolasyon katı ile EMC ve
ürün güvenliği doğrulamasının gerekli olduğu özellikle belirtildi.

Model ayrıca SAMRH71 için uzay aracı bilgisayarı/haberleşme düğümü, AURIX TC397
için ADAS veya araç alan kontrolcüsü, MIFARE SAM AV3 için toplu taşıma/erişim
terminali ve AM6254 için Linux tabanlı endüstriyel HMI/ağ geçidi örnekleriyle
uygulandı. Çip madde ve karşılaştırma sayfaları yeni alanları gösterecek şekilde
geliştirildi. Kaynak kimliklerinin çözülmesi, avantaj ve kritik koşulların boş
bırakılmaması ve ürün adıyla katalogda bulunabilmesi için regresyon testleri
eklendi. Lint, 23 otomatik test ve
production build başarıyla tamamlandı.
Beş yeni resmî ST bağlantısıyla birlikte toplam 93 benzersiz kaynak URL'si
denetlendi ve erişilemeyen bağlantı bulunmadı.
