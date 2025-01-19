import { Link } from '@tanstack/react-router'
import { UserButton, SignedIn, SignedOut } from '@clerk/clerk-react'

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full h-16 glass border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className={`flex items-center gap-6`}>
            <Link
              to="/"
              className="h-12 flex items-center"
            >
              <img
                src="/CrescendoIcon.png"
                alt="Home"
                className="h-full w-auto"
              />
            </Link>
            <SignedIn>
              <Link
                to="/pieceLibrary"
                activeProps={{
                  className: 'font-recia-medium text-primary-500',
                }}
                className="font-recia-regular hover:text-primary-500 transition-colors"
              >
                Library
              </Link>
            </SignedIn>
          </div>
        </div>
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link
                to="/sign-in"
                className="btn-soft"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="btn-gradient"
              >
                Sign Up
              </Link>
            </SignedOut>
        </div>
      </div>
    </nav>
  )
}