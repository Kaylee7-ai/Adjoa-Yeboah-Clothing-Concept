"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuth } from "@/lib/auth";

function LoginForm() {
  const { logIn } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/profile";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await logIn(email, password);
      router.replace(next.startsWith("/") && !next.startsWith("//") ? next : "/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="wrap section min-h-[70vh] max-w-xl">
      <p className="eyebrow">Welcome back</p>
      <h1 className="section-title mt-3">Sign in to your account.</h1>
      <p className="mb-8 text-sm text-[var(--color-muted)]">Sign in to continue to your saved design or account.</p>
      <div className="mb-6 border border-[var(--color-champagne)]/40 bg-[var(--color-surface)] p-4 text-sm">
        <strong>Prototype account — not secure.</strong>
        <p className="mt-1 text-[var(--color-muted)]">Demo only. Do not use a real or reused password. This is not production authentication.</p>
      </div>
      <form onSubmit={submit} className="grid gap-4">
        <label className="field-label" htmlFor="email">Email address</label>
        <input className="field" id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="field-label" htmlFor="password">Password</label>
        <input className="field" id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p role="alert" className="text-sm text-[var(--color-burgundy)]">{error}</p>}
        <button className="btn w-full" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
      <p className="mt-7 text-sm text-[var(--color-muted)]">New here? <Link className="font-semibold text-[var(--color-espresso)] underline" href={`/signup?next=${encodeURIComponent(next)}`}>Create a demo account</Link></p>
    </main>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<main className="wrap section">Loading sign in…</main>}><LoginForm /></Suspense>;
}
