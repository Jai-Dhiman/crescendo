export function LoginButton() {
  return (
    <button 
      onClick={() => window.location.href = 'http://localhost:3000/auth/login/google'}
      className="btn btn-gradient"
    >
      Sign in
    </button>
  );
}