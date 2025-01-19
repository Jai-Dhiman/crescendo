import { SignIn } from "@clerk/clerk-react";

export function SignInPage() {
  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
      <div className="card-basic">
        <SignIn 
          routing="path" 
          path="/sign-in" 
          signUpUrl="/sign-up"
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

