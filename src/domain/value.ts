import type { Chip } from './chip'

export function primaryPrice(chip: Chip) {
  return chip.commercial?.priceSnapshots[0]
}

export function coreMarkBenchmark(chip: Chip) {
  return chip.commercial?.benchmarks.find(({ metric }) => metric === 'coremark')
}

export function coreMarkPerDollar(chip: Chip): number | null {
  const price = primaryPrice(chip)
  const benchmark = coreMarkBenchmark(chip)
  if (!price || !benchmark || price.currency !== 'USD' || price.quantity !== 1) return null
  return benchmark.value / price.unitPrice
}

export function formatPrice(unitPrice: number, currency: 'USD' | 'EUR') {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(unitPrice)
}
