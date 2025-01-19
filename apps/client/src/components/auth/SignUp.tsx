import { SignUp } from "@clerk/clerk-react";

export function SignUpPage() {
  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
      <div className="card-basic">
        <SignUp 
          routing="path" 
          path="/sign-up" 
          signInUrl="/sign-in"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-transparent shadow-none",
            }
          }}
        />
      </div>
    </div>
  );
}