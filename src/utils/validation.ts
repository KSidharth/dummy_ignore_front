
/**
 * Client-side input validation utilities per NFR-003.
 * Implements email format validation and empty field checks.
 */

/**
 * Email regex pattern per NFR-003 basic validation requirement.
 * Matches standard email format: localpart@domain.tld
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validate email address format
 * 
 * @param email - Email string to validate
 * @returns true if valid email format, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.trim().length === 0) {
    return false
  }
  return EMAIL_REGEX.test(email.trim())
}

/**
 * Validate password field is not empty
 * 
 * @param password - Password string to validate
 * @returns true if password is non-empty, false otherwise
 */
export function isValidPassword(password: string): boolean {
  return password !== null && password !== undefined && password.length > 0
}

/**
 * Validate login form inputs per NFR-003
 * 
 * @param email - EmailID field value
 * @param password - Password field value
 * @returns Object with isValid flag and error messages per field
 */
export function validateLoginForm(email: string, password: string): {
  isValid: boolean
  emailError: string | null
  passwordError: string | null
} {
  let isValid = true
  let emailError: string | null = null
  let passwordError: string | null = null

  // Validate email format
  if (!email || email.trim().length === 0) {
    isValid = false
    emailError = 'Email address is required'
  } else if (!isValidEmail(email)) {
    isValid = false
    emailError = 'Please enter a valid email address'
  }

  // Validate password not empty
  if (!password || password.length === 0) {
    isValid = false
    passwordError = 'Password is required'
  }

  return {
    isValid,
    emailError,
    passwordError,
  }
}
