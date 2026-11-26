"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
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
  const [showPassword, setShowPassword] = useState(false);
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
    <main className="auth-screen">
      <div className="auth-panel">
        <div className="mb-9 flex justify-center"><BrandLogo /></div>
        <p className="eyebrow text-center">JOIN THE ATELIER</p>
        <h1 className="mt-3 text-center font-display text-5xl leading-[1.04]">Create<br /><em>your account.</em></h1>
        <p className="mx-auto mt-4 max-w-xs text-center text-sm leading-6 text-[var(--color-muted)]">Keep your designs, quotes and orders together.</p>
        <div className="mt-6 rounded-2xl border border-[var(--color-champagne)]/35 bg-[var(--color-sand)] px-4 py-3 text-center text-xs leading-5 text-[var(--color-muted)]"><strong className="text-[var(--color-espresso)]">Demo account · not secure.</strong><br />Do not reuse a real password. This is a local prototype only.</div>
        <form onSubmit={submit} className="mt-7 grid gap-3">
          <label className="auth-field"><UserRound size={18} /><input aria-label="Full name" autoComplete="name" placeholder="Full name" required value={name} onChange={(event) => setName(event.target.value)} /></label>
          <label className="auth-field"><Mail size={18} /><input aria-label="Email address" type="email" autoComplete="email" placeholder="Email address" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label className="auth-field"><Phone size={18} /><input aria-label="Phone number" type="tel" autoComplete="tel" placeholder="Phone number" required value={phone} onChange={(event) => setPhone(event.target.value)} /></label>
          <label className="auth-field"><LockKeyhole size={18} /><input aria-label="Password" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={8} placeholder="Password (8 characters minimum)" required value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></label>
          {error && <p role="alert" className="text-sm text-[var(--color-burgundy)]">{error}</p>}
          <button className="btn mt-2 min-h-[54px] w-full" type="submit" disabled={busy}>{busy ? <><span className="auth-spinner" />Creating account…</> : "Create account"}</button>
        </form>
        <div className="auth-divider"><span>or continue with</span></div>
        <div className="grid grid-cols-3 gap-2">{["Google", "Facebook", "Apple"].map((name) => <button key={name} type="button" disabled className="min-h-12 rounded-full border border-[var(--color-line)] bg-white text-xs font-semibold text-[var(--color-muted)] opacity-70">{name}</button>)}</div>
        <p className="mt-8 text-center text-sm text-[var(--color-muted)]">Already with us? <Link className="font-semibold text-[var(--color-espresso)] underline underline-offset-4" href={`/login?next=${encodeURIComponent(next)}`}>Log in</Link></p>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return <Suspense fallback={<main className="auth-screen">Loading sign up…</main>}><SignupForm /></Suspense>;
}
