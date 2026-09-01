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
    <main className="login-page">
      <div className="login-grid" />
      <div className="login-stars" />
      <div className="login-glow login-glow-blue" />
      <div className="login-glow login-glow-green" />

      <section className="login-main-card">
        <h1>
          Join Our{" "}
          <span>GDG Family</span>
        </h1>

        <p className="login-intro">
          Tell us about yourself !!
        </p>

        <div className="google-login-card">
          <div className="google-card-title">
            <span>Application Form</span>
          </div>

          <p className="google-description">
            Sign in with Google to continue
          </p>

          <button
            className="google-login-button"
            onClick={handleGoogleLogin}
          >
            <span className="google-button-logo">
              <FcGoogle size={20} />
            </span>

            <span>Continue with Google</span>
          </button>
        </div>

        <p className="login-footer">
          By continuing, you agree to participate in the GDG MIT-WPU
          recruitment process.
        </p>
      </section>
    </main>
  );
}