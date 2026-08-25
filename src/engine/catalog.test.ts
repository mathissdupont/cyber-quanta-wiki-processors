import { describe, expect, it } from 'vitest'
import { chips } from '../content/chips'
import { filterChips } from './catalog'

describe('chip catalog', () => {
  it('filters officially verified secure-boot records', () => {
    const result = filterChips(chips, {
      query: '', manufacturer: '', category: '', secureBootOnly: true, wirelessOnly: false, industrialOnly: false, applicationTag: '',
    })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((chip) => chip.security.secureBoot.support === 'supported')).toBe(true)
  })

  it('finds records by family, model and technical terms', () => {
    const modelResult = filterChips(chips, {
      query: 'RW612', manufacturer: '', category: '', secureBootOnly: false, wirelessOnly: false, industrialOnly: false, applicationTag: '',
    })
    const featureResult = filterChips(chips, {
      query: 'Matter', manufacturer: '', category: '', secureBootOnly: false, wirelessOnly: false, industrialOnly: false, applicationTag: '',
    })
    expect(modelResult.map((chip) => chip.id)).toContain('nxp-rw612')
    expect(featureResult.length).toBeGreaterThan(1)
  })

  it('finds records by concrete product and sector rationale', () => {
    const result = filterChips(chips, {
      query: 'çamaşır makinesi', manufacturer: '', category: '', secureBootOnly: false, wirelessOnly: false, industrialOnly: false, applicationTag: '',
    })
    expect(result.map((chip) => chip.id)).toContain('stm32g431cbt6')
  })

  it('combines manufacturer and wireless filters', () => {
    const result = filterChips(chips, {
      query: '', manufacturer: 'Espressif Systems', category: '', secureBootOnly: false, wirelessOnly: true, industrialOnly: false, applicationTag: '',
    })
    expect(result.map((chip) => chip.id)).toEqual(expect.arrayContaining(['esp32-s3', 'esp32-s3fn8', 'esp32-s3fh4r2']))
    expect(result.every((chip) => chip.manufacturer === 'Espressif Systems')).toBe(true)
    expect(result.every((chip) => chip.connectivity.some((item) => /wi-fi|bluetooth/i.test(item)))).toBe(true)
  })

  it('filters records with explicit industrial qualification evidence', () => {
    const result = filterChips(chips, {
      query: '', manufacturer: '', category: '', secureBootOnly: false, wirelessOnly: false, industrialOnly: true, applicationTag: '',
    })
    expect(result.every((chip) => chip.industrial?.qualification.support === 'supported')).toBe(true)
  })

  it('filters source-backed application tags', () => {
    const result = filterChips(chips, {
      query: '', manufacturer: '', category: '', secureBootOnly: false, wirelessOnly: false, industrialOnly: false, applicationTag: 'aerospace-defense',
    })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((chip) => chip.applicationTags?.some(({ tag }) => tag === 'aerospace-defense'))).toBe(true)
  })
})
