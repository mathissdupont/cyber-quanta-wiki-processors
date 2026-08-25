import type { Chip } from '../domain/chip'

export interface CatalogFilters {
  query: string
  manufacturer: string
  category: string
  secureBootOnly: boolean
  wirelessOnly: boolean
  industrialOnly: boolean
}

const searchableText = (chip: Chip) => [
  chip.manufacturer,
  chip.family,
  chip.model,
  chip.category,
  chip.summary,
  ...chip.connectivity,
  ...chip.peripherals,
  ...chip.useCases,
  ...(chip.industrial?.industrialInterfaces ?? []),
  ...(chip.industrial?.reliabilityFeatures ?? []),
].join(' ').toLocaleLowerCase('tr')

export function filterChips(chips: Chip[], filters: CatalogFilters): Chip[] {
  const query = filters.query.trim().toLocaleLowerCase('tr')

  return chips.filter((chip) => {
    if (query && !searchableText(chip).includes(query)) return false
    if (filters.manufacturer && chip.manufacturer !== filters.manufacturer) return false
    if (filters.category && chip.category !== filters.category) return false
    if (filters.secureBootOnly && chip.security.secureBoot.support !== 'supported') return false
    if (filters.wirelessOnly && !chip.connectivity.some((item) => /wi-fi|bluetooth|802\.15\.4|sub-1/i.test(item))) return false
    if (filters.industrialOnly && chip.industrial?.qualification.support !== 'supported') return false
    return true
  })
}
