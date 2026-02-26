import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { TastingProvider } from './context/TastingContext'
import HomePage from './pages/HomePage'
import ModeSelectionPage from './pages/ModeSelectionPage'
import BlindTastingPage from './pages/BlindTastingPage'
import OpenTastingPage from './pages/OpenTastingPage'
import TastingDetailPage from './pages/TastingDetailPage'
import CellarPage from './pages/CellarPage'
import CellarCountryPage from './pages/CellarCountryPage'
import CellarGrapePage from './pages/CellarGrapePage'
import CellarTimelinePage from './pages/CellarTimelinePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

export default function App() {
  return (
    <AppProvider>
      <TastingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasting/new" element={<ModeSelectionPage />} />
            <Route path="/tasting/blind" element={<BlindTastingPage />} />
            <Route path="/tasting/open" element={<OpenTastingPage />} />
            <Route path="/tasting/:id" element={<TastingDetailPage />} />
            <Route path="/cellar" element={<CellarPage />}>
              <Route index element={<CellarTimelinePage />} />
              <Route path="country" element={<CellarCountryPage />} />
              <Route path="grape" element={<CellarGrapePage />} />
              <Route path="timeline" element={<CellarTimelinePage />} />
            </Route>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </TastingProvider>
    </AppProvider>
  )
}
