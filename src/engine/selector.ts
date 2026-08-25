import { sectorLabels, type Chip, type Sector } from '../domain/chip'

export type SecurityRequirement =
  | 'secureBoot'
  | 'secureUpdate'
  | 'antiRollback'
  | 'hardwareRootOfTrust'
  | 'secureKeyStorage'

export interface SelectionCriteria {
  category: string
  sector: Sector | ''
  requireLinux: boolean
  requireIndustrialQualification: boolean
  requireFunctionalSafety: boolean
  minClockMhz: number
  requiredConnectivity: string[]
  requiredSecurity: SecurityRequirement[]
}

export interface SelectionResult {
  chip: Chip
  matchedSectorFit?: NonNullable<Chip['sectorFits']>[number]
  eligible: boolean
  status: 'eligible' | 'series-reference' | 'blocked'
  blockers: string[]
  matchedRequirements: string[]
  notes: string[]
}

export const securityRequirementLabels: Record<SecurityRequirement, string> = {
  secureBoot: 'Secure boot',
  secureUpdate: 'Güvenli güncelleme',
  antiRollback: 'Anti-rollback',
  hardwareRootOfTrust: 'Donanımsal güven kökü',
  secureKeyStorage: 'Güvenli anahtar saklama',
}

const connectivityPatterns: Record<string, RegExp> = {
  'Wi-Fi': /wi-fi/i,
  Bluetooth: /bluetooth/i,
  '802.15.4': /802\.15\.4|thread|zigbee/i,
  NFC: /nfc|iso\/iec 14443|felica|mifare/i,
  Ethernet: /ethernet/i,
  CAN: /\bcan\b|twai/i,
}

export function selectChips(chips: Chip[], criteria: SelectionCriteria): SelectionResult[] {
  return chips
    .map((chip) => {
      const blockers: string[] = []
      const matchedRequirements: string[] = []
      const notes: string[] = []
      const matchedSectorFit = criteria.sector
        ? chip.sectorFits?.find((fit) => fit.sector === criteria.sector)
        : undefined

      if (criteria.category && chip.category !== criteria.category) {
        blockers.push(`Tür ${criteria.category} değil`)
      }
      if (criteria.sector) {
        if (matchedSectorFit) {
          matchedRequirements.push(`${sectorLabels[criteria.sector]}: ${matchedSectorFit.product}`)
        } else {
          blockers.push(`${sectorLabels[criteria.sector]} için somut uygunluk kanıtı kaydedilmemiş`)
        }
      }
      if (criteria.requireLinux && !chip.compute.linuxCapable) {
        blockers.push('Linux çalıştırmaya uygun değil')
      } else if (criteria.requireLinux) {
        matchedRequirements.push('Linux desteği')
      }
      if (criteria.requireIndustrialQualification) {
        if (chip.industrial?.qualification.support === 'supported') matchedRequirements.push('Endüstriyel kalifikasyon')
        else blockers.push('Endüstriyel kalifikasyon doğrulanmamış')
      }
      if (criteria.requireFunctionalSafety) {
        if (chip.industrial?.functionalSafety.support === 'supported') matchedRequirements.push('Fonksiyonel güvenlik')
        else blockers.push('Fonksiyonel güvenlik desteği doğrulanmamış')
      }
      if (criteria.minClockMhz > 0) {
        if (chip.compute.maxClockMhz === null) blockers.push('Saat frekansı doğrulanmamış')
        else if (chip.compute.maxClockMhz < criteria.minClockMhz) blockers.push(`${criteria.minClockMhz} MHz alt sınırını karşılamıyor`)
        else matchedRequirements.push(`En az ${criteria.minClockMhz} MHz`)
      }

      for (const requirement of criteria.requiredConnectivity) {
        const pattern = connectivityPatterns[requirement]
        const found = pattern && chip.connectivity.some((item) => pattern.test(item))
        if (found) matchedRequirements.push(requirement)
        else blockers.push(`${requirement} bağlantısı yok veya doğrulanmamış`)
      }

      for (const requirement of criteria.requiredSecurity) {
        const evidence = chip.security[requirement]
        const label = securityRequirementLabels[requirement]
        if (evidence.support === 'supported') matchedRequirements.push(label)
        else blockers.push(`${label}: ${evidence.support === 'conditional' ? 'koşullu' : evidence.support === 'unknown' ? 'belirsiz' : 'karşılanmıyor'}`)
      }

      if (chip.recordScope === 'series') {
        notes.push('Seri düzeyi kayıt; nihai seçim için tam sipariş kodu seçilmelidir')
      }
      const status = blockers.length > 0
        ? 'blocked' as const
        : chip.recordScope === 'series'
          ? 'series-reference' as const
          : 'eligible' as const

      return { chip, matchedSectorFit, eligible: status === 'eligible', status, blockers, matchedRequirements, notes }
    })
    .sort((left, right) => {
      const rank = { eligible: 0, 'series-reference': 1, blocked: 2 }
      if (left.status !== right.status) return rank[left.status] - rank[right.status]
      if (left.blockers.length !== right.blockers.length) return left.blockers.length - right.blockers.length
      const sectorEvidenceRank = { 'reference-design': 0, 'manufacturer-target': 1, 'feature-match': 2 }
      const leftSectorRank = left.matchedSectorFit ? sectorEvidenceRank[left.matchedSectorFit.evidenceLevel] : 3
      const rightSectorRank = right.matchedSectorFit ? sectorEvidenceRank[right.matchedSectorFit.evidenceLevel] : 3
      if (leftSectorRank !== rightSectorRank) return leftSectorRank - rightSectorRank
      return left.chip.model.localeCompare(right.chip.model)
    })
}
