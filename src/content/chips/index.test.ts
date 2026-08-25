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
    }
  })
})
