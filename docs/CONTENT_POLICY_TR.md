# İçerik ve madde kabul politikası

## Amaç

Bu belge, Processor Wiki'ye hangi tür içeriğin hangi sayfa sınıfında
ekleneceğini tanımlar. Amaç; konuşma sırasında verilen örneklerin, pazarlama
ifadelerinin veya tek bir ürüne özgü notların kontrolsüz biçimde kılavuz
bölümüne dönüşmesini önlemektir.

## Sayfa sınıfları

### Üretici dizini

Üreticinin katalogda bulunan ailelerini listeler. Şirket tanıtımı veya
pazarlama metni içermez. Üretici adı, aileler ve kayıt kapsamı gösterilir.

### Aile veya seri maddesi

Birden fazla sipariş kodunun ortak mimarisini açıklar. `recordScope: "series"`
olarak işaretlenir ve nihai parça seçimi olarak kullanılamaz. Seri maddesinde
yalnızca bütün alt parçalarda doğrulanmış ortak özellikler kesin destek olarak
gösterilebilir.

### Tam parça maddesi

Tek bir üretici sipariş kodunu temsil eder ve `recordScope: "exact-part"`
olarak işaretlenir. Bellek, paket, sıcaklık, radyo, çevre birimi veya güvenlik
seviyesi değişen her sipariş kodu ayrı kayıt olmalıdır. Bir tam parça JSON
dosyası ortak alanları seri kaydından `extends` ile devralabilir; farklı alanlar
dosyada açıkça geçersiz kılınır.

### Teknik kılavuz

Kılavuz açılması için konunun:

1. Birden fazla üretici veya aileye uygulanabilmesi,
2. Zaman içinde kalıcı bir mühendislik kavramını açıklaması,
3. Katalog alanlarının doğru yorumlanmasına yardım etmesi,
4. Birincil ve resmî teknik kaynaklarla desteklenebilmesi gerekir.

Tek bir çipi, kullanıcı konuşmasındaki bir örneği, doğrulanmamış ürün adını
veya geçici bir teknoloji haberini açıklamak için kılavuz oluşturulmaz. Bu
bilgiler doğrulanabiliyorsa ilgili katalog maddesinde veya ayrı bir araştırma
notunda tutulur.

### Araç

Arama, filtreleme, gereksinim seçimi ve karşılaştırma gibi etkileşimli
işlevlerdir. Araç sonuçları mühendislik kararının yerine geçmez. Seri kayıtları
yalnızca ön eleme referansı; tam parça kayıtları ise doğrulanabilir aday olarak
gösterilir.

## Kaynak politikası

Kaynak önceliği şöyledir:

1. Üretici datasheet'i ve reference manual,
2. Üreticinin tam parça ürün sayfası,
3. Üretici application note ve güvenlik kılavuzu,
4. Sertifikasyon kuruluşunun resmî kaydı.

Distribütör sayfası teknik iddianın tek kaynağı olamaz. Blog, forum ve haber
metinleri katalog özelliğini doğrulamak için kullanılmaz. Fiyat ve stok bilgisi
tarih ve sağlayıcı olmadan kalıcı veri olarak tutulmaz.

Uygulama etiketleri de kaynaklı iddiadır. “IoT”, “endüstriyel”, “otomotiv” veya
“havacılık/savunma” etiketi yalnızca üretici ürün/datasheet metni bu pazarı
açıkça belirtiyorsa eklenir. Sıcaklık aralığı, kripto motoru veya yüksek işlem
gücü tek başına bir pazar etiketi üretmez.

Fiyat kayıtlarında tam OPN, para birimi, adet basamağı, satıcı ve kontrol tarihi
zorunludur. Üretici mağazası veya yetkili distribütör kullanılabilir. Vergi,
navlun, tarife ve stok durumu kapsam notunda açıklanır. Farklı para birimleri
kur dönüşümü yapılmadan tek puanda birleştirilmez.

Somut ürün/sektör uygunluğu bir pazarlama sloganı olarak yazılmaz. Her kayıt;
ürünü veya sistemi açıkça adlandırır, kanıt düzeyini belirtir, kaynaklı teknik
avantajları ve parçayı eleyebilecek koşulları birlikte gösterir. Bir üretici
referans tasarımı ile yalnızca özelliklerden yapılan mühendislik çıkarımı aynı
kanıt seviyesinde sunulamaz. Güvenlik, EMC, çevresel kalifikasyon veya yasal
uygunluk işlemci seçimiyle otomatik kazanılmış kabul edilmez.

## Kanıt ve belirsizlik

- `supported`: Kaynak özelliği açıkça doğrular.
- `conditional`: SKU, provisioning, eFuse, SDK veya ürün politikasına bağlıdır.
- `not-supported`: Kaynak veya mimari özelliğin bulunmadığını gösterir.
- `not-applicable`: Özellik bu bileşen sınıfına uygulanamaz.
- `unknown`: Yeterli resmî kanıt bulunmamıştır.

`unknown` değeri tahminle doldurulmaz. Secure boot desteğinden anti-rollback,
TrustZone desteğinden secure boot veya kripto hızlandırıcıdan güvenli anahtar
saklama sonucu türetilmez.

## Kayıt ekleme kontrol listesi

- Tam üretici ve sipariş kodu doğrulandı mı?
- Seri ile tam parça kapsamı doğru seçildi mi?
- Varyant farkları kaynakla gösterildi mi?
- Kaynak kimliklerinin tamamı kayıt içinde çözümleniyor mu?
- Bellek türü dahili Flash, SRAM veya paket içi PSRAM olarak doğru ayrıldı mı?
- Yaşam döngüsü ve inceleme tarihi kaydedildi mi?
- Pazarlama dili yerine ölçülebilir teknik ifade kullanıldı mı?
- Uygulama etiketlerinin her biri kendi kaynak kimliğine bağlı mı?
- Somut sektör adaylığında kanıt düzeyi, avantaj, kritik koşul ve kaynak var mı?
- Fiyat varsa tam OPN, adet, para birimi, satıcı ve tarih kaydedildi mi?
- Seçim aracında seri kaydının nihai aday olması engellendi mi?

## İnceleme ve değişiklik yönetimi

Her katalog değişikliği şema doğrulaması, kaynak referansı testi, benzersiz
kimlik/model testi ve production build kontrolünden geçmelidir. Bir üretici
OPN'yi EOL veya NRND ilan ettiğinde mevcut madde silinmez; yaşam döngüsü durumu
ve yerine geçen parça bilgisi kaynakla güncellenir.
