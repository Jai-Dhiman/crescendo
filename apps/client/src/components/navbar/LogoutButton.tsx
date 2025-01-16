import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import { useNavigate } from '@tanstack/react-router';

export function LogoutButton() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(['auth'], { authenticated: false });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      navigate({ to: '/' });
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      className="btn btn-outline"
    >
      Sign Out
    </button>
  );
}