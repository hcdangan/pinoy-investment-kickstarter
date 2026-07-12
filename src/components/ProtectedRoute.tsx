import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth/AuthContext'
import { LoadingSpinner } from './ui/LoadingSpinner'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return <>{children}</>
}
