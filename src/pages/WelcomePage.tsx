
/**
 * Welcome page component per FR-004.
 * Protected page displaying "Welcome to Login Website" message.
 * Accessible only to authenticated users with valid session per API contract.
 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import LoadingSpinner from '../components/common/LoadingSpinner'
import authService from '../services/auth.service'
import { WelcomePageDto } from '../types/auth.types'
import { AxiosError } from 'axios'

/**
 * WelcomePage component implementing protected welcome flow per FR-004
 */
function WelcomePage() {
  const navigate = useNavigate()
  
  // Page data state
  const [welcomeData, setWelcomeData] = useState<WelcomePageDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetch welcome page data from backend per API contract GET /api/v1/welcome
   * Verifies session validity and retrieves personalized message
   */
  useEffect(() => {
    const fetchWelcomeData = async () => {
      try {
        const data = await authService.getWelcomePage()
        setWelcomeData(data)
      } catch (error) {
        // Handle authentication errors (401 interceptor handles redirect)
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data?.detail || 
            'Failed to load welcome page. Please try logging in again.'
          setError(errorMessage)
        } else {
          setError('An unexpected error occurred.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchWelcomeData()
  }, [navigate])

  // Loading state
  if (isLoading) {
    return (
      <PageLayout showLogout={true}>
        <LoadingSpinner message="Loading welcome page..." />
      </PageLayout>
    )
  }

  // Error state
  if (error) {
    return (
      <PageLayout showLogout={true}>
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Error Loading Page
            </h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Return to Login
            </button>
          </div>
        </div>
      </PageLayout>
    )
  }

  // Success state with welcome message per FR-004
  return (
    <PageLayout showLogout={true}>
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-white shadow-xl rounded-2xl p-12 text-center">
          {/* Welcome Icon */}
          <div className="text-primary-500 text-6xl mb-6">
            👋
          </div>

          {/* Welcome Message per FR-004: "Welcome to Login Website" */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {welcomeData?.message || 'Welcome to Login Website'}
          </h1>

          {/* User Email Display */}
          <p className="text-xl text-gray-600 mb-8">
            Logged in as: <span className="font-semibold">{welcomeData?.email}</span>
          </p>

          {/* Additional Content */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <p className="text-gray-600">
              You have successfully authenticated and accessed the protected welcome/login page.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default WelcomePage
