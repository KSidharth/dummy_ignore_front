
/**
 * TypeScript type definitions for authentication-related data structures.
 * Mirrors the backend Pydantic schemas for type safety.
 */

/**
 * Login request payload per API contract POST /api/v1/login
 */
export interface LoginRequest {
  EmailID: string
  Password: string
}

/**
 * Login response from backend (not used directly, tokens extracted from RedirectDto)
 */
export interface LoginResponse {
  access_token: string
  token_type: string
  email: string
}

/**
 * Redirect response per API contract for successful login
 */
export interface RedirectDto {
  redirect_url: string
  access_token: string
  token_type: string
}

/**
 * Welcome page response per API contract GET /api/v1/welcome
 */
export interface WelcomePageDto {
  message: string
  email: string
}

/**
 * Error response per API contract
 */
export interface ErrorDto {
  detail: string
}

/**
 * Validation error structure
 */
export interface ValidationError {
  field: string
  message: string
}
