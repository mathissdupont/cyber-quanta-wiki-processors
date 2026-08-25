import { describe, expect, it } from 'vitest'
import { chips } from '../content/chips'
import { selectChips } from './selector'

describe('requirement selector', () => {
  it('never presents a series-level record as a final candidate', () => {
    const results = selectChips(chips, {
      category: '', requireLinux: false, minClockMhz: 0,
      requiredConnectivity: [], requiredSecurity: [],
    })
    const seriesResults = results.filter((result) => result.chip.recordScope === 'series')
    expect(seriesResults.length).toBeGreaterThan(0)
    expect(seriesResults.every((result) => !result.eligible && result.status === 'series-reference')).toBe(true)
    expect(results.filter((result) => result.eligible).every((result) => result.chip.recordScope === 'exact-part')).toBe(true)
  })

  it('accepts only verified secure-boot candidates when secure boot is mandatory', () => {
    const results = selectChips(chips, {
      category: '', requireLinux: false, minClockMhz: 0,
      requiredConnectivity: [], requiredSecurity: ['secureBoot'],
    })
    const eligible = results.filter((result) => result.eligible)
    expect(eligible.length).toBeGreaterThan(0)
    expect(eligible.every((result) => result.chip.security.secureBoot.support === 'supported')).toBe(true)
  })

  it('explains why an incompatible chip was eliminated', () => {
    const results = selectChips(chips, {
      category: '', requireLinux: true, minClockMhz: 0,
      requiredConnectivity: ['Wi-Fi'], requiredSecurity: [],
    })
    const stm32 = results.find((result) => result.chip.id === 'stm32h573zi')
    expect(stm32?.eligible).toBe(false)
    expect(stm32?.blockers).toContain('Linux çalıştırmaya uygun değil')
    expect(stm32?.blockers).toContain('Wi-Fi bağlantısı yok veya doğrulanmamış')
  })
})
