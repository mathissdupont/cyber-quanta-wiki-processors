import { supportLabels, type FeatureEvidence } from '../domain/chip'

export function EvidenceBadge({ evidence }: { evidence: FeatureEvidence }) {
  return <span className={`evidence evidence-${evidence.support}`}>{supportLabels[evidence.support]}</span>
}

