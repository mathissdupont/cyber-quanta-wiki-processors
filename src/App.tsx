import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { WikiLayout } from './layout/WikiLayout'
import { CatalogPage } from './pages/CatalogPage'
import { ChipPage } from './pages/ChipPage'
import { ComparePage } from './pages/ComparePage'
import { HomePage } from './pages/HomePage'
import { FamilyPage } from './pages/FamilyPage'
import { ManufacturerPage } from './pages/ManufacturerPage'
import { ManufacturersPage } from './pages/ManufacturersPage'
import { MethodologyPage } from './pages/MethodologyPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SecureBootGuidePage } from './pages/SecureBootGuidePage'
import { SelectionGuidePage } from './pages/SelectionGuidePage'
import { SelectorPage } from './pages/SelectorPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<WikiLayout />}>
          <Route index element={<HomePage />} />
          <Route path="chips" element={<CatalogPage />} />
          <Route path="chips/:chipId" element={<ChipPage />} />
          <Route path="manufacturers" element={<ManufacturersPage />} />
          <Route path="manufacturers/:manufacturerSlug" element={<ManufacturerPage />} />
          <Route path="families/:manufacturerSlug/:familySlug" element={<FamilyPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="tools/selector" element={<SelectorPage />} />
          <Route path="guides/secure-boot" element={<SecureBootGuidePage />} />
          <Route path="guides/chip-selection" element={<SelectionGuidePage />} />
          <Route path="methodology" element={<MethodologyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
