import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '@clerk/clerk-react'

export const Route = createFileRoute('/sign-up')({
  component: () => (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">

        <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
    </div>
  )
})