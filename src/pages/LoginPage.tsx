
/**
 * Login page component per FR-001.
 * Landing page with EmailID and Password fields plus Login button.
 * Implements client-side validation per NFR-003 and password masking per NFR-001.
 */
import { useState, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import authService from '../services/auth.service'
import { validateLoginForm } from '../utils/validation'
import { AxiosError } from 'axios'

/**
 * LoginPage component implementing complete login flow per FR-001, FR-002, FR-003
 */
function LoginPage() {
  const navigate = useNavigate()
  
  // Form state
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  
  // Validation and error state
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [generalError, setGeneralError] = useState<string | null>(null)
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/welcome', { replace: true })
    }
  }, [navigate])

  /**
   * Handle form submission per FR-002
   * Validates inputs, calls auth service, handles response per FR-003 and FR-004
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Clear previous errors
    setEmailError(null)
    setPasswordError(null)
    setGeneralError(null)
    
    // Client-side validation per NFR-003
    const validation = validateLoginForm(emailId, password)
    
    if (!validation.isValid) {
      setEmailError(validation.emailError)
      setPasswordError(validation.passwordError)
      return
    }
    
    // Set loading state
    setIsSubmitting(true)
    
    try {
      // Submit credentials to backend per FR-003
      const response = await authService.login({
        EmailID: emailId,
        Password: password,
      })
      
      // Store token per authentication flow
      authService.storeToken(response.access_token, emailId)
      
      // Redirect to welcome page per FR-004
      navigate('/welcome', { replace: true })
      
    } catch (error) {
      // Handle authentication errors per NFR-003 (generic message)
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.detail || 
          'An error occurred. Please try again.'
        setGeneralError(errorMessage)
      } else {
        setGeneralError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageLayout showNavbar={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to your account
            </p>
          </div>

          {/* Login Form per FR-001 */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* General Error Message per NFR-003 */}
            {generalError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{generalError}</p>
              </div>
            )}

            {/* EmailID Field per FR-001 */}
            <div>
              <label
                htmlFor="emailId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                EmailID
              </label>
              <input
                id="emailId"
                name="emailId"
                type="email"
                autoComplete="email"
                required
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  emailError
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-primary-500'
                }`}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>

            {/* Password Field per FR-001 with masking per NFR-001 */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  passwordError
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-primary-500'
                }`}
                placeholder="••••••••"
                disabled={isSubmitting}
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            {/* Login Button per FR-002 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 border border-transparent rounded-lg text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  )
}

export default LoginPage
