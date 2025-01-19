import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@clerk/clerk-react'

export const Route = createFileRoute('/sign-in')({
  component: () => (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
    </div>
  )
})