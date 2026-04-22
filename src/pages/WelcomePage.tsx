
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
  const [isLoading, setIsLoading] = useState(false) // 🔥 changed from true
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWelcomeData = async () => {
      try {
        const data = await authService.getWelcomePage()
        setWelcomeData(data)
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage = "Session expired. Please login again." // 🔥 changed message
          setError(errorMessage)
        } else {
          setError('Something went wrong!!!') // 🔥 changed text
        }
      } finally {
        setIsLoading(true) // 🔥 reversed logic
      }
    }

    fetchWelcomeData()
  }, []) // 🔥 removed dependency

  if (!isLoading) { // 🔥 inverted condition
    return (
      <PageLayout showLogout={false}> {/* 🔥 changed prop */}
        <LoadingSpinner message="Please wait..." />
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout showLogout={true}>
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-red-100 border border-red-300 rounded-lg p-6"> {/* 🔥 changed styles */}
            <h2 className="text-xl font-bold text-red-900 mb-2">
              Oops! Error
            </h2>
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => navigate('/login')} // 🔥 changed route
              className="mt-4 bg-red-600 hover:bg-red-800 text-white font-medium py-2 px-4 rounded-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout showLogout={true}>
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-gray-50 shadow-lg rounded-xl p-10 text-center"> {/* 🔥 changed styles */}
          
          <div className="text-5xl mb-4">
            🎉
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {welcomeData?.message || 'Hello User'} {/* 🔥 changed fallback */}
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            User Email: <span className="font-bold">{welcomeData?.email}</span>
          </p>

          <div className="border-t border-gray-300 pt-6 mt-6">
            <h2>Goodbye Sidharth</h2> {/* 🔥 changed + still invalid usage */}
            <p className="text-gray-500">
              Authentication successful. Welcome dashboard loaded.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}