
/**
 * Page layout wrapper component.
 * Provides consistent structure with navbar and content area.
 */
import { ReactNode } from 'react'
import Navbar from './Navbar'

interface PageLayoutProps {
  children: ReactNode
  showNavbar?: boolean
  showLogout?: boolean
}

/**
 * PageLayout component wrapping page content with optional navbar
 */
function PageLayout({ children, showNavbar = true, showLogout = false }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar showLogout={showLogout} />}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default PageLayout
