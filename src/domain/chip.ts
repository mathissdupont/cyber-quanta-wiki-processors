import { z } from 'zod'

export const supportLevelSchema = z.enum([
  'supported',
  'conditional',
  'not-supported',
  'not-applicable',
  'unknown',
])

export const evidenceSchema = z.object({
  support: supportLevelSchema,
  summary: z.string().min(1),
  sourceIds: z.array(z.string()).default([]),
})

export const sourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  kind: z.enum([
    'product-page',
    'datasheet',
    'reference-manual',
    'application-note',
    'manufacturer-store',
    'authorized-distributor',
  ]),
  publisher: z.string().min(1),
  checkedAt: z.string().date(),
})

export const applicationTagSchema = z.enum([
  'iot',
  'industrial',
  'automotive',
  'edge-ai',
  'networking-gateway',
  'smart-home',
  'wearables',
  'payments-access',
  'aerospace-defense',
  'motor-control',
])

export const sourcedApplicationTagSchema = z.object({
  tag: applicationTagSchema,
  sourceIds: z.array(z.string()).min(1),
})

export const sectorSchema = z.enum([
  'home-appliances',
  'industrial-automation',
  'automotive-mobility',
  'payments-access',
  'aerospace-space',
  'edge-computing',
])

export const sectorFitEvidenceSchema = z.enum([
  'reference-design',
  'manufacturer-target',
  'feature-match',
])

export const sectorFitSchema = z.object({
  sector: sectorSchema,
  product: z.string().min(3),
  evidenceLevel: sectorFitEvidenceSchema,
  rationale: z.string().min(20),
  advantages: z.array(z.string().min(3)).min(1),
  constraints: z.array(z.string().min(3)).min(1),
  sourceIds: z.array(z.string()).min(1),
})

export const commercialSchema = z.object({
  priceSnapshots: z.array(z.object({
    unitPrice: z.number().positive(),
    currency: z.enum(['USD', 'EUR']),
    quantity: z.number().int().positive(),
    seller: z.string().min(1),
    checkedAt: z.string().date(),
    sourceId: z.string().min(1),
    note: z.string().min(1),
  })),
  benchmarks: z.array(z.object({
    metric: z.enum(['coremark', 'coremark-per-mhz']),
    value: z.number().positive(),
    context: z.string().min(1),
    sourceId: z.string().min(1),
  })),
})

export const chipSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  manufacturer: z.string().min(1),
  family: z.string().min(1),
  model: z.string().min(1),
  parentId: z.string().regex(/^[a-z0-9-]+$/).optional(),
  recordScope: z.enum(['exact-part', 'series']),
  category: z.enum(['MCU', 'Wireless MCU', 'SoC', 'MPU', 'Secure Element', 'NFC Controller']),
  lifecycle: z.enum(['active', 'not-recommended', 'unknown']),
  summary: z.string().min(20),
  variantNote: z.string().optional(),
  compute: z.object({
    cpu: z.string().min(1),
    cores: z.number().int().positive().nullable(),
    maxClockMhz: z.number().positive().nullable(),
    flashKb: z.number().nonnegative().nullable(),
    ramKb: z.number().nonnegative().nullable(),
    psramKb: z.number().nonnegative().nullable().optional(),
    linuxCapable: z.boolean(),
    operatingSystems: z.array(z.string()),
    accelerators: z.array(z.string()),
  }),
  connectivity: z.array(z.string()),
  peripherals: z.array(z.string()),
  security: z.object({
    secureBoot: evidenceSchema,
    secureUpdate: evidenceSchema,
    antiRollback: evidenceSchema,
    hardwareRootOfTrust: evidenceSchema,
    isolation: evidenceSchema,
    flashEncryption: evidenceSchema,
    secureDebug: evidenceSchema,
    secureKeyStorage: evidenceSchema,
    tamperResistance: evidenceSchema,
    cryptography: z.array(z.string()),
    certifications: z.array(z.string()),
  }),
  physical: z.object({
    supplyVoltage: z.string(),
    temperature: z.string(),
    packages: z.array(z.string()),
  }),
  industrial: z.object({
    qualification: evidenceSchema,
    functionalSafety: evidenceSchema,
    longevity: evidenceSchema,
    realTime: evidenceSchema,
    industrialInterfaces: z.array(z.string()),
    reliabilityFeatures: z.array(z.string()),
  }).optional(),
  applicationTags: z.array(sourcedApplicationTagSchema).optional(),
  sectorFits: z.array(sectorFitSchema).optional(),
  commercial: commercialSchema.optional(),
  tools: z.array(z.string()),
  useCases: z.array(z.string()),
  strengths: z.array(z.string()).min(1),
  limitations: z.array(z.string()).min(1),
  sources: z.array(sourceSchema).min(1),
  reviewedAt: z.string().date(),
})

export type SupportLevel = z.infer<typeof supportLevelSchema>
export type FeatureEvidence = z.infer<typeof evidenceSchema>
export type Chip = z.infer<typeof chipSchema>
export type ApplicationTag = z.infer<typeof applicationTagSchema>
export type Sector = z.infer<typeof sectorSchema>
export type SectorFitEvidence = z.infer<typeof sectorFitEvidenceSchema>

export const chipVariantSchema = z.object({
  extends: z.string().regex(/^[a-z0-9-]+$/),
  id: z.string().regex(/^[a-z0-9-]+$/),
  model: z.string().min(1),
  lifecycle: chipSchema.shape.lifecycle.optional(),
  category: chipSchema.shape.category.optional(),
  summary: z.string().min(20).optional(),
  variantNote: z.string().optional(),
  compute: chipSchema.shape.compute.partial().optional(),
  connectivity: z.array(z.string()).optional(),
  peripherals: z.array(z.string()).optional(),
  security: chipSchema.shape.security.partial().optional(),
  physical: chipSchema.shape.physical.partial().optional(),
  industrial: chipSchema.shape.industrial.optional(),
  applicationTags: chipSchema.shape.applicationTags.optional(),
  sectorFits: chipSchema.shape.sectorFits.optional(),
  commercial: chipSchema.shape.commercial.optional(),
  tools: z.array(z.string()).optional(),
  useCases: z.array(z.string()).optional(),
  strengths: z.array(z.string()).min(1).optional(),
  limitations: z.array(z.string()).min(1).optional(),
  sources: z.array(sourceSchema).optional(),
  reviewedAt: z.string().date(),
})

export type ChipVariant = z.infer<typeof chipVariantSchema>

export const supportLabels: Record<SupportLevel, string> = {
  supported: 'Doğrulandı',
  conditional: 'Koşullu',
  'not-supported': 'Desteklenmiyor',
  'not-applicable': 'Uygulanamaz',
  unknown: 'Belirsiz',
}

export const applicationTagLabels: Record<ApplicationTag, string> = {
  iot: 'IoT',
  industrial: 'Endüstriyel',
  automotive: 'Otomotiv',
  'edge-ai': 'Edge AI',
  'networking-gateway': 'Ağ / Gateway',
  'smart-home': 'Akıllı ev',
  wearables: 'Giyilebilir',
  'payments-access': 'Ödeme / Erişim',
  'aerospace-defense': 'Havacılık / Savunma',
  'motor-control': 'Motor kontrolü',
}

export const sectorLabels: Record<Sector, string> = {
  'home-appliances': 'Ev aletleri',
  'industrial-automation': 'Endüstriyel otomasyon',
  'automotive-mobility': 'Otomotiv ve mobilite',
  'payments-access': 'Ödeme ve erişim',
  'aerospace-space': 'Havacılık ve uzay',
  'edge-computing': 'Edge bilişim',
}

export const sectorFitEvidenceLabels: Record<SectorFitEvidence, string> = {
  'reference-design': 'Üretici referans tasarımı',
  'manufacturer-target': 'Üreticinin hedef uygulaması',
  'feature-match': 'Kaynaklı özellik eşleşmesi',
}
