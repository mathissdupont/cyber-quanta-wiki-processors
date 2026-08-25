# Çip veri modeli

## Amaç

Model, üretici pazarlama metnini kopyalamak yerine farklı üreticileri aynı
anlamlar üzerinden karşılaştırır. `src/domain/chip.ts` hem TypeScript tiplerini
hem de Zod çalışma zamanı doğrulamasını içerir. Uygulama açılırken tüm kayıtlar
bu şemadan geçirilir; zorunlu alanı veya geçersiz URL'si olan kayıt uygulamayı
sessizce yanlış veriyle çalıştırmaz.

## Kimlik ve kapsam

- `manufacturer`: Üretici şirket.
- `family`: Uyumlu ürün ailesi.
- `model`: Tam parça veya seri adı.
- `recordScope`: `exact-part` ya da `series`.
- `variantNote`: Seri içindeki önemli farklılıkları açıklar.
- `lifecycle`: Kayıt oluşturulurken görülen ürün durumu.

Tam parça ve seri ayrımı kritiktir. Örneğin bir seride Secure Vault High ve
Secure Vault Mid seçenekleri varsa serinin en güçlü özelliğini bütün parçalarda
varmış gibi göstermemeliyiz.

## Teknik alanlar

`compute` CPU, çekirdek sayısı, frekans, Flash, SRAM, paket içi PSRAM,
Linux uygunluğu, işletim
sistemleri ve hızlandırıcıları taşır. `connectivity` kablolu/kablosuz protokolleri,
`peripherals` ADC, PWM, motor kontrolü veya ekran gibi ürün tasarımını etkileyen
birimleri içerir. `physical` besleme, sıcaklık ve paket seçeneklerini tutar.

Güvenli eleman gibi genel amaçlı işlemci olmayan parçalarda çekirdek, frekans
ve kullanıcı belleği üretici tarafından yayımlanmayabilir. Bu alanlar `null`
olabilir; `null`, sıfır veya harici bellek anlamına gelmez. Arayüz bunu
“yayımlanmamış” olarak gösterir.

## Güvenlik kanıtı

Her güvenlik alanı üç bilgi taşır:

```ts
{
  support: 'supported' | 'conditional' | 'not-supported' | 'not-applicable' | 'unknown',
  summary: 'Mekanizmanın ne yaptığı ve sınırı',
  sourceIds: ['official-source-id']
}
```

- `supported`: Resmî kaynak açıkça doğruluyor.
- `conditional`: SKU, provisioning, SDK veya ürün politikasına bağlı.
- `not-supported`: Mimari ya da doküman desteğin olmadığını gösteriyor.
- `not-applicable`: Özellik bu parça sınıfına anlamlı biçimde uygulanmıyor.
- `unknown`: Yeterli kanıt bulunmadı.

Anti-rollback özellikle ayrı tutulur. İmzalı firmware desteği, otomatik olarak
eski ama geçerli imzalı firmware'in reddedildiği anlamına gelmez.

## Endüstriyel uygunluk kanıtı

Opsiyonel `industrial` nesnesi dört ayrı kanıt alanı taşır:

- `qualification`: Endüstriyel/otomotiv sıcaklık veya ürün sınıfı.
- `functionalSafety`: IEC 61508, ISO 26262, SIL veya ASIL kapsamı.
- `longevity`: Üreticinin açık ürün bulunabilirliği taahhüdü ya da bitiş yılı.
- `realTime`: MCU çekirdeği, yardımcı gerçek zamanlı çekirdek veya PRU gibi
  deterministik çalışma mekanizması.

Bu alanlar da güvenlik alanlarıyla aynı `support`, `summary` ve `sourceIds`
yapısını kullanır. Örneğin yalnızca genel ailede -40 °C seçeneği bulunması,
seçilen tam OPN'nin endüstriyel sınıfta olduğunu kanıtlamaz; böyle bir kayıt
`conditional` tutulur. `industrialInterfaces` ve `reliabilityFeatures` ise CAN
FD, TSN, ECC ve watchdog gibi karşılaştırma terimlerini listeler.

## Kaynaklı uygulama etiketleri

Opsiyonel `applicationTags`, katalog filtrelemesinde kullanılan IoT,
endüstriyel, otomotiv, Edge AI, ağ/gateway, ödeme/erişim ve
havacılık/savunma gibi sınıfları taşır. Her etiket en az bir `sourceId`
içermek zorundadır:

```json
{"tag":"aerospace-defense","sourceIds":["samrh71-product"]}
```

Etiket, yalnızca çipin teknik olarak kullanılabileceğine dair yorum değildir;
üreticinin açık uygulama/pazar tanımını temsil eder. Örneğin geniş sıcaklık
aralığı tek başına “savunma” etiketi üretmez.

## Somut ürün ve sektör uygunluğu

Opsiyonel `sectorFits`, bir parçanın belirli bir ürün veya sistem için neden
aday olabileceğini kaynaklı ve sınırları açık biçimde kaydeder:

```json
{
  "sector": "home-appliances",
  "product": "Çamaşır makinesi tambur motor sürücüsü",
  "evidenceLevel": "reference-design",
  "rationale": "Üreticinin aynı OPN'yi kullanan referans tasarımı vardır.",
  "advantages": ["Motor-control PWM ve dahili analog ölçüm zinciri"],
  "constraints": ["Harici güç katı ve ürün seviyesi güvenlik testi gerekir"],
  "sourceIds": ["official-reference-design"]
}
```

Kanıt düzeyleri birbirinin yerine kullanılmaz:

- `reference-design`: Üreticinin aynı parça veya açıkça belirtilen işlemciyle
  yayımladığı somut referans tasarımı.
- `manufacturer-target`: Üreticinin ürün sayfası veya veri sayfasında doğrudan
  belirttiği hedef uygulama.
- `feature-match`: Kaynaklı çevre birimi, performans ve çevre koşullarından
  yapılan mühendislik çıkarımı. Arayüzde kesin öneri gibi gösterilmez.

Her kayıtta en az bir avantaj, bir kritik koşul ve bir resmî kaynak zorunludur.
Örneğin “uçaklar için iyidir” yeterli değildir; radyasyon sınıfı, kullanılan
uçuş veri yolu ve görev seviyesi kalifikasyonun ayrıca gerektiği yazılmalıdır.

## Ticari veri ve benchmark

Opsiyonel `commercial` nesnesi iki ayrı kanıt türünü tutar:

- `priceSnapshots`: birim fiyat, para birimi, adet, satıcı, kontrol tarihi,
  kaynak kimliği ve kapsam notu.
- `benchmarks`: CoreMark veya CoreMark/MHz değeri, test bağlamı ve üretici
  kaynak kimliği.

Fiyat teknik özellik değildir ve güncel teklif sayılmaz. CoreMark/USD yalnızca
1 adet USD fiyatı ile aynı CoreMark metriği birlikte varsa hesaplanır. MPU'lar
için GHz/USD üretilmez; harici DDR, PMIC, depolama, GPU/NPU ve Linux yazılım
maliyeti tek bir frekans oranına indirgenemez.

## Kaynaklar

Her kayıt en az bir resmî kaynak içerir. Kaynakta başlık, URL, doküman türü,
yayıncı ve kontrol tarihi bulunur. İleride her alanı tek tek kaynak kimliğine
bağlayan otomatik kapsama raporu eklenecektir.

Teknik iddialar üretici kaynaklarına dayanır. Fiyat için üreticinin çevrimiçi
mağazası veya yetkili distribütör kullanılabilir; bu kaynak teknik özellik
kanıtı yerine geçmez.

## Kayıt granülerliği

Yeni bir model numarası farklı bellek, paket, radyo veya güvenlik yeteneği
getiriyorsa ayrı JSON kaydı açılır. Aile sayfası yalnızca ortak özellikleri
kanıtlıysa `recordScope: "series"` olarak kullanılabilir. Nihai seçimde hedef
`recordScope: "exact-part"` kaydı ve o sipariş koduna ait datasheettir.

Tam parça dosyası ortak alanları seri kaydından devralabilir:

```json
{
  "extends": "esp32-p4",
  "id": "esp32-p4nrw16x",
  "model": "ESP32-P4NRW16X",
  "compute": { "psramKb": 16384 },
  "reviewedAt": "2026-08-25"
}
```

Yükleyici bu dosyayı seri kaydıyla birleştirir, `parentId` ilişkisini ekler ve
sonucu eksiksiz `Chip` şemasından geçirir. `extends` yalnızca veri tekrarını
azaltır; her OPN katalogda ayrı kimlik, URL ve karşılaştırma satırı olarak kalır.
