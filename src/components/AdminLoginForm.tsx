"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminLoginForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl: searchParams.get("callbackUrl") ?? "/admin"
    });

    setIsLoading(false);

    if (!result?.ok) {
      setError("Invalid admin credentials.");
      return;
    }

    window.location.href = result.url ?? "/admin";
  }

  return (
    <form className="admin-panel form-grid" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="email">Admin email</label>
        <input autoComplete="email" id="email" name="email" required type="email" />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input autoComplete="current-password" id="password" name="password" required type="password" />
      </div>
      <button className="button" disabled={isLoading} type="submit">
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
      {error ? <div className="status error">{error}</div> : null}
    </form>
  );
}
