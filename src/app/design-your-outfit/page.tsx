"use client";

/*
 * PROTOTYPE ONLY. Custom option values, turnaround wording, fabric handling,
 * studio address and delivery arrangements are dummy values awaiting studio
 * confirmation. Inspiration uploads are UI-only; files are not uploaded.
 */
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import RequireAuth from "@/components/auth/RequireAuth";
import { useAuth } from "@/lib/auth";
import {
  CUSTOM_OPTIONS_NOTICE, DEPARTMENTS, GARMENTS, OCCASIONS, FABRIC_SOURCES,
  OWN_FABRIC_METHODS, FABRICS, COLOURS, NECKLINES, SLEEVES, LENGTHS, FITS,
  EXTRAS, MEASUREMENT_METHODS, STANDARD_SIZES, DELIVERY_METHODS,
  QUOTE_TURNAROUND, RUSH_REQUEST_NOTE, DELIVERY_QUOTE_NOTE,
  OWN_FABRIC_QUANTITY_NOTE, DUMMY_STUDIO_ADDRESS, type VisualOption,
} from "@/data/customOptions";
import {
  clearDraft, getDraft, moveGuestDraftToUser, saveCustomRequest, saveDraft,
} from "@/lib/demoStore";

type Design = {
  department: string; garment: string; occasion: string; fabricSource: string;
  ownFabricMethod: string; fabrics: string[]; colours: string[]; customColour: string;
  neckline: string; sleeves: string; length: string; fit: string; extras: string[];
  inspirationNames: string[]; styleNotes: string; measurementMethod: string;
  measurements: { bust: string; waist: string; hips: string; height: string };
  standardSize: string; dateNeeded: string; deliveryMethod: string; notes: string;
};
const EMPTY: Design = {
  department: "", garment: "", occasion: "", fabricSource: "", ownFabricMethod: "",
  fabrics: [], colours: [], customColour: "", neckline: "", sleeves: "", length: "",
  fit: "", extras: [], inspirationNames: [], styleNotes: "", measurementMethod: "",
  measurements: { bust: "", waist: "", hips: "", height: "" }, standardSize: "",
  dateNeeded: "", deliveryMethod: "", notes: "",
};
const STEP_TITLES = ["Department", "Garment", "Occasion", "Fabric", "Style details", "Measurements", "Delivery & timing", "Review"];

function toggle(values: string[], id: string, limit?: number) {
  if (values.includes(id)) return values.filter((value) => value !== id);
  if (limit && values.length >= limit) return values;
  return [...values, id];
}
function labelFor(options: VisualOption[], id: string) {
  return options.find((option) => option.id === id)?.label ?? "Not selected";
}
function OptionGrid({ options, value, onChange, multi = false, limit }: {
  options: VisualOption[]; value: string | string[]; onChange: (value: string | string[]) => void;
  multi?: boolean; limit?: number;
}) {
  const selected = Array.isArray(value) ? value : [value];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {options.map((option) => {
        const active = selected.includes(option.id);
        return (
          <button key={option.id} type="button" aria-pressed={active}
            onClick={() => onChange(multi ? toggle(selected, option.id, limit) : option.id)}
            className={`flex min-h-[104px] min-w-0 flex-col items-start justify-between gap-3 rounded-2xl border p-4 text-left transition duration-300 ${active ? "border-[var(--color-champagne)] bg-[var(--color-surface)] shadow-[0_8px_30px_rgba(198,151,73,.18)] ring-1 ring-[var(--color-champagne)]" : "border-[var(--color-line)] bg-white hover:border-[var(--color-champagne)]"}`}>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-surface)] text-xl" aria-hidden="true">{option.icon}</span>
            <span className="w-full break-words text-sm font-medium leading-snug">{option.label}</span>
            {option.accent && <span className="h-1.5 w-full rounded-full" style={{ background: option.accent }} />}
          </button>
        );
      })}
    </div>
  );
}

function DesignWizard() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [design, setDesign] = useState<Design>(EMPTY);
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [requestReference, setRequestReference] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (user?.id) moveGuestDraftToUser(user.id);
    const owner = user?.id ?? "guest";
    const saved = getDraft(owner) ?? (owner !== "guest" ? getDraft("guest") : null);
    if (saved) {
      const restored = saved as unknown as { design?: Design; step?: number };
      if (restored.design) setDesign({ ...EMPTY, ...restored.design });
      if (typeof restored.step === "number") setStep(Math.min(7, Math.max(0, restored.step)));
    }
    setHydrated(true);
  }, [user?.id]);

  useEffect(() => {
    if (!hydrated || step === 8) return;
    saveDraft(user?.id ?? "guest", { design, step });
  }, [design, step, hydrated, user?.id]);


  useEffect(() => {
    if (!hydrated) return;
    const requested = params.get("garment");
    if (!requested) return;
    const match = GARMENTS.find((option) =>
      requested.toLowerCase().includes(option.label.toLowerCase()) ||
      option.label.toLowerCase().includes(requested.toLowerCase())
    );
    if (match) {
      setDesign((current) => ({
        ...current,
        department: match.departments?.[0] ?? current.department,
        garment: match.id,
      }));
      setStep(1);
    }
  }, [hydrated, params]);

  const update = <K extends keyof Design>(key: K, value: Design[K]) => {
    setDesign((current) => ({ ...current, [key]: value }));
    setFormError("");
  };

  const summary = useMemo(() => [
    labelFor(DEPARTMENTS, design.department), labelFor(GARMENTS, design.garment),
    labelFor(OCCASIONS, design.occasion), ...design.fabrics.map((id) => labelFor(FABRICS, id)),
    ...design.colours.map((id) => labelFor(COLOURS, id)),
  ].filter((value) => value !== "Not selected"), [design]);

  function isValid() {
    if (step === 0) return !!design.department;
    if (step === 1) return !!design.garment;
    if (step === 2) return !!design.occasion;
    if (step === 3) return !!design.fabricSource && (design.fabricSource === "own" ? !!design.ownFabricMethod : design.fabrics.length > 0);
    if (step === 4) return !!design.neckline && !!design.sleeves && !!design.length && !!design.fit;
    if (step === 5) {
      if (!design.measurementMethod) return false;
      if (design.measurementMethod === "manual") return Object.values(design.measurements).every((value) => value.trim().length > 0);
      if (design.measurementMethod === "standard") return !!design.standardSize;
      return true;
    }
    if (step === 6) return !!design.dateNeeded && !!design.deliveryMethod;
    return true;
  }

  function next() {
    if (!isValid()) { setFormError("Please complete the required choice(s) before continuing."); return; }
    setFormError("");
    setStep((current) => Math.min(7, current + 1));
  }

  function requestQuote() {
    if (!user) {
      router.push(`/login?next=${encodeURIComponent("/design-your-outfit")}`);
      return;
    }
    if (!isValid()) {
      setFormError("Please complete the required details before requesting your quote.");
      return;
    }
    const saved = saveCustomRequest(user.id, {
      name: user.name, email: user.email, phone: user.phone,
    }, design as unknown as Record<string, unknown>);
    clearDraft(user.id);
    setRequestReference(saved.reference);
    setStep(8);
  }

  if (!hydrated) return <main className="wrap section">Loading your saved design…</main>;

  const selectedDepartment = labelFor(DEPARTMENTS, design.department);
  const selectedGarment = labelFor(GARMENTS, design.garment);
  const summaryText = summary.length ? summary.join(" · ") : "Your choices will appear here as you design.";

  return (
    <main className="wrap section min-h-[75vh] max-w-5xl">
      <header className="mb-8">
        <p className="eyebrow">Bespoke by Adjoa Yeboah</p>
        <h1 className="section-title mt-3">Design your <em>outfit.</em></h1>
        <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)]">Choose the details you love. The studio reviews your design and sends a quote before any payment is requested.</p>
        <p className="mt-3 inline-flex border border-[var(--color-champagne)]/40 bg-[var(--color-surface)] px-3 py-2 text-[10px] font-bold tracking-[.14em]">{CUSTOM_OPTIONS_NOTICE}</p>
      </header>

      <section aria-label="Your design summary" className="sticky top-[4.5rem] z-30 mb-8 border border-[var(--color-champagne)]/50 bg-[var(--color-ivory)] p-4 shadow-[0_8px_30px_rgba(198,151,73,.12)] md:top-20">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[var(--color-champagne)]">Your design</p>
        <p className="mt-1 break-words text-sm leading-6">{summaryText}</p>
      </section>

      {step < 8 && (
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold">Step {step + 1} of 8</span>
            <span className="text-[var(--color-muted)]">{STEP_TITLES[step]}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-surface)]">
            <div className="h-full bg-[var(--color-champagne)] transition-all duration-300" style={{ width: `${((step + 1) / 8) * 100}%` }} />
          </div>
        </div>
      )}

      {step === 0 && <section className="grid gap-7">
        <div><p className="eyebrow">01 · Required</p><h2 className="mb-4 font-display text-3xl">Who are we designing for?</h2><OptionGrid options={DEPARTMENTS} value={design.department} onChange={(v) => update("department", v as string)} /></div>
      </section>}

      {step === 1 && <section><p className="eyebrow">02 · Required</p><h2 className="mb-5 font-display text-3xl">Choose your garment</h2><OptionGrid options={GARMENTS.filter((option) => !option.departments || option.departments.includes(design.department))} value={design.garment} onChange={(v) => update("garment", v as string)} /></section>}
      {step === 2 && <section><p className="eyebrow">03 · Required</p><h2 className="mb-5 font-display text-3xl">What is the occasion?</h2><OptionGrid options={OCCASIONS} value={design.occasion} onChange={(v) => update("occasion", v as string)} /></section>}

      {step === 3 && <section className="grid gap-8">
        <div><p className="eyebrow">04 · Required</p><h2 className="mb-5 font-display text-3xl">Where will your fabric come from?</h2><OptionGrid options={FABRIC_SOURCES} value={design.fabricSource} onChange={(v) => { update("fabricSource", v as string); update("fabrics", []); update("ownFabricMethod", ""); }} /></div>
        {design.fabricSource === "studio" && <div><h3 className="mb-4 font-display text-2xl">Choose up to two fabrics</h3><OptionGrid options={FABRICS} value={design.fabrics} multi limit={2} onChange={(v) => update("fabrics", v as string[])} /><p className="mt-2 text-xs text-[var(--color-muted)]">Select no more than two fabric types. Fabric availability is a dummy selection to be confirmed.</p></div>}
        {design.fabricSource === "own" && <div className="border border-[var(--color-line)] bg-[var(--color-surface)] p-5"><h3 className="font-display text-2xl">How will you get it to us?</h3><p className="my-3 text-sm">Dummy studio address: {DUMMY_STUDIO_ADDRESS}</p><OptionGrid options={OWN_FABRIC_METHODS} value={design.ownFabricMethod} onChange={(v) => update("ownFabricMethod", v as string)} /><p className="mt-4 text-xs leading-6 text-[var(--color-muted)]">{OWN_FABRIC_QUANTITY_NOTE}</p></div>}
        <div><h3 className="mb-4 font-display text-2xl">Colour palette</h3><OptionGrid options={COLOURS} value={design.colours} multi limit={3} onChange={(v) => update("colours", v as string[])} /><p className="mt-2 text-xs text-[var(--color-muted)]">Choose up to three colours. Custom colour is optional.</p>{design.colours.includes("custom") && <input className="field mt-3" aria-label="Describe your custom colour" placeholder="Describe your custom colour" value={design.customColour} onChange={(e) => update("customColour", e.target.value)} />}</div>
      </section>}

      {step === 4 && <section className="grid gap-7">
        <p className="eyebrow">04 · Required choices</p>
        <div><h2 className="mb-3 font-display text-2xl">Neckline</h2><OptionGrid options={NECKLINES} value={design.neckline} onChange={(v) => update("neckline", v as string)} /></div>
        <div><h2 className="mb-3 font-display text-2xl">Sleeves</h2><OptionGrid options={SLEEVES} value={design.sleeves} onChange={(v) => update("sleeves", v as string)} /></div>
        <div><h2 className="mb-3 font-display text-2xl">Length</h2><OptionGrid options={LENGTHS} value={design.length} onChange={(v) => update("length", v as string)} /></div>
        <div><h2 className="mb-3 font-display text-2xl">Fit / silhouette</h2><OptionGrid options={FITS} value={design.fit} onChange={(v) => update("fit", v as string)} /></div>
        <div><h2 className="mb-3 font-display text-2xl">Finishing touches</h2><OptionGrid options={EXTRAS} value={design.extras} multi onChange={(v) => update("extras", v as string[])} /></div>
        <div><h2 className="mb-2 font-display text-2xl">Inspiration photos</h2><p className="mb-3 text-sm text-[var(--color-muted)]">Choose up to three images. Prototype only: filenames are noted; no files are uploaded or stored.</p><input className="field" type="file" accept="image/*" multiple onChange={(e) => { const files = Array.from(e.target.files ?? []).slice(0, 3); update("inspirationNames", files.map((file) => file.name)); }} /><p className="mt-2 text-xs text-[var(--color-muted)]">{design.inspirationNames.length ? design.inspirationNames.join(", ") : "No inspiration photos selected."}</p></div>
        <div><label className="field-label" htmlFor="styleNotes">Style notes (optional)</label><textarea id="styleNotes" className="field min-h-28" value={design.styleNotes} onChange={(e) => update("styleNotes", e.target.value)} placeholder="Tell the studio anything else about the look…" /></div>
      </section>}

      {step === 5 && <section className="grid gap-6">
        <p className="eyebrow">06 · Required</p><h2 className="font-display text-3xl">How would you like to get fitted?</h2>
        <OptionGrid options={MEASUREMENT_METHODS} value={design.measurementMethod} onChange={(v) => update("measurementMethod", v as string)} />
        {design.measurementMethod === "manual" && <div className="grid gap-3 sm:grid-cols-2"><p className="sm:col-span-2 text-sm text-[var(--color-muted)]">Enter your measurements. The studio will confirm the units and any extra measurements required.</p>{(["bust", "waist", "hips", "height"] as const).map((key) => <label key={key} className="field-label">{key}<input className="field mt-2" inputMode="decimal" value={design.measurements[key]} onChange={(e) => update("measurements", { ...design.measurements, [key]: e.target.value })} placeholder="Enter measurement" /></label>)}<Link className="text-sm underline sm:col-span-2" href="/size-guide">How to measure — view Size Guide ↗</Link></div>}
        {design.measurementMethod === "fitting" && <div className="border border-[var(--color-line)] bg-[var(--color-surface)] p-5"><p className="text-sm">Request a studio fitting. This opens the appointment enquiry page; an appointment is not confirmed until the studio replies.</p><Link className="btn mt-4" href="/book-appointment">Book a fitting ↗</Link></div>}
        {design.measurementMethod === "standard" && <div><p className="mb-3 text-sm">Choose a standard size (dummy size range; studio to confirm).</p><OptionGrid options={STANDARD_SIZES} value={design.standardSize} onChange={(v) => update("standardSize", v as string)} /></div>}
      </section>}

      {step === 6 && <section className="grid gap-7">
        <p className="eyebrow">07 · Required</p><h2 className="font-display text-3xl">When do you need your outfit?</h2>
        <label className="field-label" htmlFor="dateNeeded">Date needed<input id="dateNeeded" className="field mt-2" type="date" min={new Date().toISOString().slice(0, 10)} value={design.dateNeeded} onChange={(e) => update("dateNeeded", e.target.value)} /></label>
        <p className="border-l-2 border-[var(--color-sunset)] pl-4 text-sm leading-6 text-[var(--color-muted)]">{RUSH_REQUEST_NOTE}</p>
        <h3 className="font-display text-2xl">How would you like to receive it?</h3>
        <OptionGrid options={DELIVERY_METHODS} value={design.deliveryMethod} onChange={(v) => update("deliveryMethod", v as string)} />
        <p className="text-xs text-[var(--color-muted)]">{DELIVERY_QUOTE_NOTE}</p>
        <label className="field-label" htmlFor="extraNotes">Anything else the studio should know?<textarea id="extraNotes" className="field mt-2 min-h-28" value={design.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Additional details (optional)" /></label>
      </section>}

      {step === 7 && <section>
        <p className="eyebrow">08 · Review</p><h2 className="mb-6 font-display text-3xl">Your design, at a glance.</h2>
        <div className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {[
            ["Department", selectedDepartment, 0],
            ["Garment", selectedGarment, 1],
            ["Occasion", labelFor(OCCASIONS, design.occasion), 2],
            ["Fabric", design.fabricSource === "own" ? `Own fabric · ${labelFor(OWN_FABRIC_METHODS, design.ownFabricMethod)}` : design.fabrics.map((id) => labelFor(FABRICS, id)).join(", "), 3],
            ["Colours", design.colours.map((id) => labelFor(COLOURS, id)).join(", ") + (design.customColour ? ` · ${design.customColour}` : ""), 3],
            ["Style", [labelFor(NECKLINES, design.neckline), labelFor(SLEEVES, design.sleeves), labelFor(LENGTHS, design.length), labelFor(FITS, design.fit)].join(" · "), 4],
            ["Extras & notes", [...design.extras.map((id) => labelFor(EXTRAS, id)), design.styleNotes, design.inspirationNames.join(", ")].filter(Boolean).join(" · "), 4],
            ["Measurements", design.measurementMethod === "manual" ? Object.entries(design.measurements).map(([key, value]) => `${key}: ${value}`).join(" · ") : design.measurementMethod === "standard" ? `Standard size ${design.standardSize}` : labelFor(MEASUREMENT_METHODS, design.measurementMethod), 5],
            ["Date & delivery", `${design.dateNeeded} · ${labelFor(DELIVERY_METHODS, design.deliveryMethod)}`, 6],
            ["Additional notes", design.notes || "None", 6],
          ].map(([heading, value, editStep]) => <div key={String(heading)} className="flex flex-wrap items-start justify-between gap-4 py-4"><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">{heading}</p><p className="mt-1 break-words text-sm">{String(value)}</p></div><button type="button" onClick={() => setStep(Number(editStep))} className="min-h-11 px-3 text-sm font-semibold underline">Edit</button></div>)}
        </div>
        <div className="mt-7 bg-[var(--color-surface)] p-5"><p className="font-semibold">Quote first — no instant custom price.</p><p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Your request is sent to the studio for review. No payment is collected now. Price, production time and payment terms are confirmed in the studio's quote.</p></div>
        {formError && <p role="alert" className="mt-4 text-sm text-[var(--color-burgundy)]">{formError}</p>}
        <button type="button" className="btn mt-6 w-full" onClick={requestQuote}>Request a Quote</button>
      </section>}

      {step === 8 && <section className="mx-auto max-w-2xl border border-[var(--color-champagne)]/50 bg-[var(--color-surface)] p-8 text-center shadow-[0_8px_30px_rgba(198,151,73,.18)]">
        <span className="text-4xl" aria-hidden="true">✦</span><p className="eyebrow mt-4">Request received</p><h2 className="mt-3 font-display text-4xl">Thank you.</h2>
        <p className="mt-4 text-lg">Request received. The studio will send your price soon.</p>
        <p className="mt-3 text-sm text-[var(--color-muted)]">{QUOTE_TURNAROUND}</p>
        <p className="mt-5 text-xs text-[var(--color-muted)]">Prototype request reference: {requestReference}. The request is saved to this demo account only; no studio notification is sent.</p>
        <Link href="/profile" className="btn mt-7">View My Custom Orders</Link>
      </section>}

      {step < 8 && <div className="mt-10 flex items-center justify-between gap-3 border-t border-[var(--color-line)] pt-5">
        <button type="button" disabled={step === 0} onClick={() => { setFormError(""); setStep((current) => Math.max(0, current - 1)); }} className="min-h-12 min-w-24 border border-[var(--color-line)] px-5 text-sm disabled:opacity-35">Back</button>
        {step < 7 ? <button type="button" onClick={next} disabled={!isValid()} className="btn min-w-32 disabled:cursor-not-allowed disabled:opacity-40">Next</button> : <span className="text-xs text-[var(--color-muted)]">Review your choices above.</span>}
      </div>}
      {formError && step !== 6 && <p role="alert" className="mt-3 text-sm text-[var(--color-burgundy)]">{formError}</p>}
      <p className="mt-8 text-center text-[10px] leading-5 text-[var(--color-muted)]">{CUSTOM_OPTIONS_NOTICE}. No custom price is displayed before studio review.</p>
    </main>
  );
}

export default function DesignYourOutfitPage() {
  return <DesignWizard />;
}
