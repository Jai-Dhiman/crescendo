import { Link } from '@tanstack/react-router'
import { useAuth } from '@/lib/auth/AuthProvider'
import { LogoutButton } from './LogoutButton'
import { LoginButton } from './LoginButton'

export function Navigation() {
  const { isAuthenticated, user } = useAuth()
  
  return (
    <nav className="fixed top-0 w-full h-16 glass border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className={`flex items-center ${isAuthenticated ? 'gap-6' : 'gap-2'}`}>
            <Link
              to="/"
              className="h-12 flex items-center"
            >
              <img
                src="/Crescendo1.png"
                alt="Home"
                className="h-full w-auto"
              />
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/pieceLibrary"
                  activeProps={{
                    className: 'font-recia-medium text-primary-500',
                  }}
                  className="font-recia-regular hover:text-primary-500 transition-colors"
                >
                  Library
                </Link>
                <Link
                  to="/piece"
                  activeProps={{
                    className: 'font-recia-medium text-primary-500',
                  }}
                  className="font-recia-regular hover:text-primary-500 transition-colors"
                >
                  Individual Piece
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <div className="relative">
              <input
                className="input-modern w-64"
                placeholder="Search pieces..."
              />
            </div>
          )}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-8 h-8 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-recia-regular">
                  {user?.firstName || user?.email}
                </span>
              </div>
              <LogoutButton />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  )
}