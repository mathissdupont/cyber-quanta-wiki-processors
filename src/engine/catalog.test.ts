import { describe, expect, it } from 'vitest'
import { chips } from '../content/chips'
import { filterChips } from './catalog'

describe('chip catalog', () => {
  it('filters officially verified secure-boot records', () => {
    const result = filterChips(chips, {
      query: '', manufacturer: '', category: '', secureBootOnly: true, wirelessOnly: false,
    })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((chip) => chip.security.secureBoot.support === 'supported')).toBe(true)
  })

  it('finds records by family, model and technical terms', () => {
    const modelResult = filterChips(chips, {
      query: 'RW612', manufacturer: '', category: '', secureBootOnly: false, wirelessOnly: false,
    })
    const featureResult = filterChips(chips, {
      query: 'Matter', manufacturer: '', category: '', secureBootOnly: false, wirelessOnly: false,
    })
    expect(modelResult.map((chip) => chip.id)).toContain('nxp-rw612')
    expect(featureResult.length).toBeGreaterThan(1)
  })

  it('combines manufacturer and wireless filters', () => {
    const result = filterChips(chips, {
      query: '', manufacturer: 'Espressif Systems', category: '', secureBootOnly: false, wirelessOnly: true,
    })
    expect(result.map((chip) => chip.id)).toEqual(expect.arrayContaining(['esp32-s3', 'esp32-s3fn8', 'esp32-s3fh4r2']))
    expect(result.every((chip) => chip.manufacturer === 'Espressif Systems')).toBe(true)
    expect(result.every((chip) => chip.connectivity.some((item) => /wi-fi|bluetooth/i.test(item)))).toBe(true)
  })
})
