import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'
import { TastingProvider } from './context/TastingContext'
import ProtectedRoute from './components/layout/ProtectedRoute'
import HomePage from './pages/HomePage'
import BlindTastingPage from './pages/BlindTastingPage'
import TastingDetailPage from './pages/TastingDetailPage'
import CellarPage from './pages/CellarPage'
import CellarCountryPage from './pages/CellarCountryPage'
import CellarGrapePage from './pages/CellarGrapePage'
import CellarTimelinePage from './pages/CellarTimelinePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ModeSelectPage from './pages/ModeSelectPage'
import CasualTastingPage from './pages/CasualTastingPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <TastingProvider>
            <Routes>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/signup" element={<SignupPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasting/mode-select"
                element={
                  <ProtectedRoute>
                    <ModeSelectPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasting/blind"
                element={
                  <ProtectedRoute>
                    <BlindTastingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasting/casual"
                element={
                  <ProtectedRoute>
                    <CasualTastingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasting/:id"
                element={
                  <ProtectedRoute>
                    <TastingDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cellar"
                element={
                  <ProtectedRoute>
                    <CellarPage />
                  </ProtectedRoute>
                }
              >
                <Route index element={<CellarTimelinePage />} />
                <Route path="country" element={<CellarCountryPage />} />
                <Route path="grape" element={<CellarGrapePage />} />
                <Route path="timeline" element={<CellarTimelinePage />} />
              </Route>
            </Routes>
          </TastingProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
