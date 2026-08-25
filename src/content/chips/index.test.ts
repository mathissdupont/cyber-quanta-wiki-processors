import { describe, expect, it } from 'vitest'
import type { Chip } from '../../domain/chip'
import { chips } from './index'
import { chipById, manufacturers } from './index'
import { catalogSlug } from '../../domain/slug'

const evidenceKeys: Array<keyof Chip['security']> = [
  'secureBoot', 'secureUpdate', 'antiRollback', 'hardwareRootOfTrust',
  'isolation', 'flashEncryption', 'secureDebug', 'secureKeyStorage', 'tamperResistance',
]

describe('chip content integrity', () => {
  it('uses unique record identifiers', () => {
    expect(new Set(chips.map((chip) => chip.id)).size).toBe(chips.length)
  })

  it('uses unique manufacturer and model combinations', () => {
    const keys = chips.map((chip) => `${chip.manufacturer}:${chip.model}`.toLocaleLowerCase('en'))
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('resolves exact-part parent records to a series in the same family', () => {
    for (const chip of chips.filter((item) => item.parentId)) {
      const parent = chipById.get(chip.parentId as string)
      expect(parent, `${chip.id} parent`).toBeDefined()
      expect(parent?.recordScope).toBe('series')
      expect(parent?.manufacturer).toBe(chip.manufacturer)
      expect(parent?.family).toBe(chip.family)
      expect(chip.recordScope).toBe('exact-part')
    }
  })

  it('keeps manufacturer and family URL slugs collision-free', () => {
    expect(new Set(manufacturers.map(catalogSlug)).size).toBe(manufacturers.length)
    for (const manufacturer of manufacturers) {
      const families = [...new Set(chips.filter((chip) => chip.manufacturer === manufacturer).map((chip) => chip.family))]
      expect(new Set(families.map(catalogSlug)).size, manufacturer).toBe(families.length)
    }
  })

  it('resolves every evidence source identifier inside its own record', () => {
    for (const chip of chips) {
      const sourceIds = new Set(chip.sources.map((source) => source.id))
      for (const key of evidenceKeys) {
        const evidence = chip.security[key]
        if (Array.isArray(evidence)) continue
        if (evidence.support === 'supported') {
          expect(evidence.sourceIds.length, `${chip.id}.${key} supported without evidence`).toBeGreaterThan(0)
        }
        for (const sourceId of evidence.sourceIds) {
          expect(sourceIds.has(sourceId), `${chip.id}.${key} -> ${sourceId}`).toBe(true)
        }
      }
      if (chip.industrial) {
        const industrialEvidence = [
          chip.industrial.qualification,
          chip.industrial.functionalSafety,
          chip.industrial.longevity,
          chip.industrial.realTime,
        ]
        for (const evidence of industrialEvidence) {
          for (const sourceId of evidence.sourceIds) {
            expect(sourceIds.has(sourceId), `${chip.id}.industrial -> ${sourceId}`).toBe(true)
          }
        }
      }
      for (const application of chip.applicationTags ?? []) {
        for (const sourceId of application.sourceIds) {
          expect(sourceIds.has(sourceId), `${chip.id}.applicationTags.${application.tag} -> ${sourceId}`).toBe(true)
        }
      }
      for (const price of chip.commercial?.priceSnapshots ?? []) {
        expect(sourceIds.has(price.sourceId), `${chip.id}.commercial.price -> ${price.sourceId}`).toBe(true)
      }
      for (const benchmark of chip.commercial?.benchmarks ?? []) {
        expect(sourceIds.has(benchmark.sourceId), `${chip.id}.commercial.benchmark -> ${benchmark.sourceId}`).toBe(true)
      }
    }
  })

  it('keeps EFR32MG24 OPN security tiers and variant count explicit', () => {
    const parts = chips.filter((chip) => chip.parentId === 'efr32mg24')
    expect(parts).toHaveLength(22)

    const mid = chipById.get('efr32mg24a010f1024im40')
    const high = chipById.get('efr32mg24b310f1536im48')
    expect(mid?.security.tamperResistance.support).toBe('not-supported')
    expect(high?.security.tamperResistance.support).toBe('supported')
    expect(high?.compute.accelerators).toContain('AI/ML accelerator')
  })

  it('contains the documented industrial expansion and Linux MPU coverage', () => {
    expect(chips).toHaveLength(55)
    expect(chips.filter((chip) => chip.recordScope === 'exact-part')).toHaveLength(45)
    expect(chips.filter((chip) => chip.category === 'MPU' && chip.compute.linuxCapable)).toHaveLength(5)
    expect(chips.filter((chip) => chip.industrial).length).toBeGreaterThanOrEqual(10)
  })

  it('keeps application labels and commercial evidence source-backed', () => {
    expect(chips.filter((chip) => chip.applicationTags?.length).length).toBeGreaterThanOrEqual(10)
    expect(chips.some((chip) => chip.applicationTags?.some(({ tag }) => tag === 'aerospace-defense'))).toBe(true)
    expect(chips.filter((chip) => chip.commercial?.priceSnapshots.length).length).toBeGreaterThanOrEqual(6)
    expect(chips.filter((chip) => chip.commercial?.benchmarks.some(({ metric }) => metric === 'coremark')).length).toBeGreaterThanOrEqual(2)
  })
})
