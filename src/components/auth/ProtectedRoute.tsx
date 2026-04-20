
/**
 * Protected route wrapper component.
 * Redirects unauthenticated users to login page per API contract.
 */
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import authService from '../../services/auth.service'

interface ProtectedRouteProps {
  children: ReactNode
}

/**
 * ProtectedRoute component that checks authentication before rendering children
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = authService.isAuthenticated()

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
