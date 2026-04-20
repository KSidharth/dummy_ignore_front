
/**
 * Top navigation bar component.
 * Displays app title and logout button for authenticated users.
 */
import { useNavigate } from 'react-router-dom'
import authService from '../../services/auth.service'

interface NavbarProps {
  showLogout?: boolean
}

/**
 * Navbar component with conditional logout button
 */
function Navbar({ showLogout = false }: NavbarProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.clearToken()
    navigate('/')
  }

  return (
    <nav className="bg-primary-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Login System</h1>
          </div>
          
          {showLogout && (
            <button
              onClick={handleLogout}
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
