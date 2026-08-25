import { chipSchema, chipVariantSchema, type Chip, type ChipVariant } from '../../domain/chip'

const modules = import.meta.glob('./*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>

const rawEntries = Object.values(modules)
const baseRecords = rawEntries
  .filter((entry) => !(typeof entry === 'object' && entry !== null && 'extends' in entry))
  .map((entry) => chipSchema.parse(entry))

const baseById = new Map(baseRecords.map((chip) => [chip.id, chip]))

function mergeSources(base: Chip['sources'], additions: Chip['sources'] = []): Chip['sources'] {
  const sources = new Map(base.map((source) => [source.id, source]))
  for (const source of additions) sources.set(source.id, source)
  return [...sources.values()]
}

function resolveVariant(rawVariant: unknown): Chip {
  const variant: ChipVariant = chipVariantSchema.parse(rawVariant)
  const base = baseById.get(variant.extends)
  if (!base) throw new Error(`${variant.id}: parent record '${variant.extends}' was not found`)
  if (base.recordScope !== 'series') throw new Error(`${variant.id}: parent '${base.id}' must be a series record`)

  const { extends: _baseId, compute, security, physical, industrial, sources, ...overrides } = variant
  return chipSchema.parse({
    ...base,
    ...overrides,
    parentId: base.id,
    recordScope: 'exact-part',
    compute: { ...base.compute, ...compute },
    security: { ...base.security, ...security },
    physical: { ...base.physical, ...physical },
    industrial: industrial ?? base.industrial,
    sources: mergeSources(base.sources, sources),
  })
}

export const chips: Chip[] = [
  ...baseRecords,
  ...rawEntries
    .filter((entry) => typeof entry === 'object' && entry !== null && 'extends' in entry)
    .map(resolveVariant),
].sort((left, right) => left.model.localeCompare(right.model))

export const manufacturers = [...new Set(chips.map((chip) => chip.manufacturer))].sort()

export const chipById = new Map(chips.map((chip) => [chip.id, chip]))
