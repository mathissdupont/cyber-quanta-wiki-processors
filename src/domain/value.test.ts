import { describe, expect, it } from 'vitest'
import { chipById } from '../content/chips'
import { coreMarkPerDollar, formatPrice } from './value'

describe('commercial value calculations', () => {
  it('calculates CoreMark per USD only with a comparable 1-piece snapshot', () => {
    const stm32 = chipById.get('stm32u585aii6')
    const mpu = chipById.get('stm32mp257fai3')
    expect(stm32 && coreMarkPerDollar(stm32)).toBeCloseTo(651 / 13.06, 5)
    expect(mpu && coreMarkPerDollar(mpu)).toBeNull()
  })

  it('formats sourced currencies without conversion', () => {
    expect(formatPrice(13.06, 'USD')).toContain('13,06')
    expect(formatPrice(30.25, 'EUR')).toContain('30,25')
  })
})
