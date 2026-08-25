export function scrollToSection(id: string): boolean {
  const section = document.getElementById(id)
  if (!section) return false
  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return true
}
