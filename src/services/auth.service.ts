
/**
 * Authentication service layer for API calls.
 * Implements all auth-related HTTP requests per API contract.
 */
import apiClient from './api'
import { LoginRequest, RedirectDto, WelcomePageDto } from '../types/auth.types'

/**
 * Authentication service class
 */
class AuthService {
  /**
   * Submit login credentials per API contract POST /api/v1/login
   * 
   * @param credentials - LoginRequest with EmailID and Password
   * @returns Promise<RedirectDto> with access token and redirect URL
   * @throws AxiosError with response.data.detail for error messages
   */
  async login(credentials: LoginRequest): Promise<RedirectDto> {
    const response = await apiClient.post<RedirectDto>('/api/v1/login', credentials)
    return response.data
  }

  /**
   * Fetch welcome page data per API contract GET /api/v1/welcome
   * Requires valid JWT token in Authorization header (automatically injected)
   * 
   * @returns Promise<WelcomePageDto> with welcome message and user email
   * @throws AxiosError 401 if session is invalid or expired
   */
  async getWelcomePage(): Promise<WelcomePageDto> {
    const response = await apiClient.get<WelcomePageDto>('/api/v1/welcome')
    return response.data
  }

  /**
   * Store authentication token in localStorage
   * 
   * @param token - JWT access token from login response
   * @param email - User email address
   */
  storeToken(token: string, email: string): void {
    localStorage.setItem('access_token', token)
    localStorage.setItem('user_email', email)
  }

  /**
   * Clear authentication token from localStorage (logout)
   */
  clearToken(): void {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_email')
  }

  /**
   * Check if user is authenticated (has valid token in localStorage)
   * Note: This only checks existence, not validity. Backend validates on each request.
   * 
   * @returns boolean indicating if token exists
   */
  isAuthenticated(): boolean {
    return localStorage.getItem('access_token') !== null
  }

  /**
   * Get stored user email from localStorage
   * 
   * @returns User email or null if not stored
   */
  getUserEmail(): string | null {
    return localStorage.getItem('user_email')
  }
}

// Export singleton instance
export default new AuthService()
