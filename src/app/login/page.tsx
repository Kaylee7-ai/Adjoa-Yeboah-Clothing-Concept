"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { useAuth } from "@/lib/auth";

function LoginForm() {
  const { logIn } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/profile";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
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
    <main className="auth-screen">
      <div className="auth-panel">
        <div className="mb-10 flex justify-center"><BrandLogo /></div>
        <p className="eyebrow text-center">YOUR PERSONAL EDIT</p>
        <h1 className="mt-3 text-center font-display text-5xl leading-[1.04]">Welcome<br /><em>back.</em></h1>
        <p className="mx-auto mt-4 max-w-xs text-center text-sm leading-6 text-[var(--color-muted)]">Log in to pick up where you left off.</p>
        <div className="mt-6 rounded-2xl border border-[var(--color-champagne)]/35 bg-[var(--color-sand)] px-4 py-3 text-center text-xs leading-5 text-[var(--color-muted)]">
          <strong className="text-[var(--color-espresso)]">Demo account · not secure.</strong><br />Use a unique demo password only. Social sign-in is visual only.
        </div>
        <form onSubmit={submit} className="mt-7 grid gap-3">
          <label htmlFor="email" className="sr-only">Email address</label>
          <div className="auth-field"><Mail size={18} /><input id="email" type="email" autoComplete="email" placeholder="Email address" required value={email} onChange={(event) => setEmail(event.target.value)} /></div>
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="auth-field"><LockKeyhole size={18} /><input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Password" required value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
          <button type="button" onClick={() => setNotice("Password reset is not connected in this demo. Create a new demo account if needed.")} className="min-h-10 justify-self-end text-xs font-semibold text-[var(--color-muted)]">Forgot password?</button>
          {error && <p role="alert" className="text-sm text-[var(--color-burgundy)]">{error}</p>}
          {notice && <p role="status" className="text-xs text-[var(--color-muted)]">{notice}</p>}
          <button className="btn mt-2 min-h-[54px] w-full" type="submit" disabled={busy}>{busy ? <><span className="auth-spinner" />Signing in…</> : "Log in"}</button>
        </form>
        <div className="auth-divider"><span>or continue with</span></div>
        <div className="grid grid-cols-3 gap-2">
          {["Google", "Facebook", "Apple"].map((name) => <button key={name} type="button" disabled className="min-h-12 rounded-full border border-[var(--color-line)] bg-white text-xs font-semibold text-[var(--color-muted)] opacity-70">{name}</button>)}
        </div>
        <p className="mt-8 text-center text-sm text-[var(--color-muted)]">New to us? <Link className="font-semibold text-[var(--color-espresso)] underline underline-offset-4" href={`/signup?next=${encodeURIComponent(next)}`}>Create account</Link></p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<main className="auth-screen">Loading sign in…</main>}><LoginForm /></Suspense>;
}
