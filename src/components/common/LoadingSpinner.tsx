
/**
 * Loading spinner component for async operations.
 * Displays centered animated spinner.
 */

interface LoadingSpinnerProps {
  message?: string
}

/**
 * LoadingSpinner component with optional message
 */
function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  )
}

export default LoadingSpinner
