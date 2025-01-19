import * as React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ErrorComponent,
  RouterProvider,
  createRouter,
} from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Spinner } from '@/components/utils/Spinner'
import { routeTree } from '@/routeTree.gen'
import { ClerkProvider } from '@clerk/clerk-react'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '@/styles/fonts.css'

const queryClient = new QueryClient();
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <Spinner />
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!,
  },
  defaultPreload: 'intent',
})

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/pieceLibrary">
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
      </ClerkProvider>
    </React.StrictMode>,
  )
}
