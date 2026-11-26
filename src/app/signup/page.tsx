"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuth } from "@/lib/auth";

function SignupForm() {
  const { signUp } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/profile";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signUp({ name, email, phone, password });
      router.replace(next.startsWith("/") && !next.startsWith("//") ? next : "/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="wrap section min-h-[70vh] max-w-xl">
      <p className="eyebrow">Your personal account</p>
      <h1 className="section-title mt-3">Create an account.</h1>
      <p className="mb-8 text-sm text-[var(--color-muted)]">Save your custom design, review quote requests and see your orders.</p>
      <div className="mb-6 border border-[var(--color-champagne)]/40 bg-[var(--color-surface)] p-4 text-sm">
        <strong>Prototype account — not secure.</strong>
        <p className="mt-1 text-[var(--color-muted)]">Demo only. Do not use a real or reused password. Replace this prototype with real authentication before launch.</p>
      </div>
      <form onSubmit={submit} className="grid gap-3">
        <label className="field-label" htmlFor="name">Full name</label>
        <input className="field" id="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
        <label className="field-label" htmlFor="email">Email address</label>
        <input className="field" id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="field-label" htmlFor="phone">Phone number</label>
        <input className="field" id="phone" type="tel" autoComplete="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
        <label className="field-label" htmlFor="password">Password (8 characters minimum)</label>
        <input className="field" id="password" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p role="alert" className="text-sm text-[var(--color-burgundy)]">{error}</p>}
        <button className="btn mt-3 w-full" type="submit" disabled={busy}>{busy ? "Creating account…" : "Create demo account"}</button>
      </form>
      <p className="mt-7 text-sm text-[var(--color-muted)]">Already registered? <Link className="font-semibold underline" href={`/login?next=${encodeURIComponent(next)}`}>Sign in</Link></p>
    </main>
  );
}

export default function SignupPage() {
  return <Suspense fallback={<main className="wrap section">Loading sign up…</main>}><SignupForm /></Suspense>;
}
