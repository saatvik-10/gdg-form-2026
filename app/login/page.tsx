"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    signIn("google", {
      callbackUrl: "/registration",
    });
  };

  return (
    <main className='h-[100dvh] md:h-auto md:min-h-[100dvh] relative flex flex-col items-center justify-center p-4 pt-6 md:p-16'>
      <div className='flex flex-col items-center justify-center bg-neutral-900 p-6 py-8 rounded-xl md:w-[90%] max-w-[500px] w-full min-h-[200px] h-fit max-h-full overflow-y-auto md:overflow-y-visible gap-6'>
        
        <div className='flex flex-col items-center justify-center flex-grow w-full mt-2'>
          <h1 className="text-3xl font-bold text-center mb-2">
            Join the GDG Family
          </h1>
          <p className='text-sm text-neutral-400 text-center mb-8'>
            Sign in to start your application
          </p>

          <button
            className="flex items-center justify-center gap-2 bg-neutral-100 text-neutral-900 hover:bg-neutral-200 px-4 py-3 rounded-md w-full cursor-pointer transition-colors mt-auto"
            onClick={handleGoogleLogin}
          >
            <span className="google-button-logo">
              <FcGoogle size={20} />
            </span>

            <span className="font-medium">Continue with Google</span>
          </button>

          <p className="text-xs text-center text-neutral-500 mt-4 px-4">
            By continuing, you agree to participate in the GDG MIT-WPU
            recruitment process.
          </p>
        </div>
      </div>
    </main>
  );
}