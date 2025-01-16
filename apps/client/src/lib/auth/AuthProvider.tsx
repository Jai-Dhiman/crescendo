import { createContext, useContext, ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import { User } from '@/types/auth';

interface AuthContextType {
  user: User | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: authApi.me,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const handleLogout = async () => {
    queryClient.cancelQueries({ queryKey: ['auth'] });
    await authApi.logout();
    queryClient.setQueryData(['auth'], { authenticated: false, user: undefined });
    queryClient.removeQueries();
  };

  const value: AuthContextType = {
    user: data?.user,
    isAuthenticated: !!data?.authenticated,
    isLoading,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}