
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage'
import ErrorBoundary from './components/layout/ErrorBoundary'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

/**
 * Root application component with routing configuration.
 * Implements the complete navigation structure per FR-001 and FR-004.
 */
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Login page as landing page per FR-001 */}
          <Route path="/" element={<LoginPage />} />
          
          {/* Protected welcome page per FR-004 and API contract */}
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />
          
          {/* Catch-all redirect to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
