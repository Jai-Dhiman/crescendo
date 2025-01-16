import { createFileRoute, Outlet } from '@tanstack/react-router'
import { authApi } from '@/lib/api/auth'

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/login': {
      searchParams: {
        redirect?: string
      }
    }
  }
}

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ location }) => {
    try {
      const { authenticated } = await authApi.me()
      if (!authenticated) {
        throw new Response(null, {
          status: 302,
          headers: {
            Location: `/login?redirect=${encodeURIComponent(location.pathname)}`,
          },
        })
      }
    } catch (error) {
      throw new Response(null, {
        status: 302,
        headers: {
          Location: `/login?redirect=${encodeURIComponent(location.pathname)}`,
        },
      })
    }
  },
  component: AppLayout,
})

function AppLayout() {
  return <Outlet />
}