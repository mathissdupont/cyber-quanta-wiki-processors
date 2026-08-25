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

## Kaynaklar

Her kayıt en az bir resmî kaynak içerir. Kaynakta başlık, URL, doküman türü,
yayıncı ve kontrol tarihi bulunur. İleride her alanı tek tek kaynak kimliğine
bağlayan otomatik kapsama raporu eklenecektir.

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
