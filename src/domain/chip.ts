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
  kind: z.enum(['product-page', 'datasheet', 'reference-manual', 'application-note']),
  publisher: z.string().min(1),
  checkedAt: z.string().date(),
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
