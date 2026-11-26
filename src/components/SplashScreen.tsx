"use client";

export default function SplashScreen() {
  return (
    <div
      role="status"
      aria-label="Loading Adjoa Yeboah Clothing"
      className="ayc-splash fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden text-[#fff7ed]"
    >
      <div className="ayc-splash-glow ayc-splash-glow-one" aria-hidden="true" />
      <div className="ayc-splash-glow ayc-splash-glow-two" aria-hidden="true" />
      <div className="ayc-splash-grain" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="ayc-splash-emblem mb-8 flex h-24 w-24 items-center justify-center rounded-full">
          <span className="ayc-splash-monogram font-serif text-5xl italic">A</span>
        </div>
        <p className="ayc-splash-name font-serif text-2xl tracking-[0.28em] sm:text-3xl">
          ADJOA YEBOAH
        </p>
        <p className="ayc-splash-subtitle mt-3 text-[10px] tracking-[0.52em]">
          C L O T H I N G
        </p>
        <div className="ayc-splash-rule mt-10 h-px w-36 overflow-hidden">
          <div className="ayc-splash-progress h-full w-1/2" />
        </div>
        <span className="sr-only">Loading the storefront</span>
      </div>
      <style jsx>{`
        .ayc-splash {
          background:
            radial-gradient(ellipse at 50% 42%, rgba(107, 36, 49, .42), transparent 34%),
            radial-gradient(ellipse at 50% 100%, rgba(174, 119, 63, .13), transparent 42%),
            linear-gradient(145deg, #09090b 0%, #171014 48%, #0b0a0b 100%);
        }
        .ayc-splash-glow {
          position:absolute; width:min(68vw,620px); aspect-ratio:1; border-radius:50%;
          pointer-events:none; filter:blur(72px); opacity:.26;
          background:radial-gradient(circle,rgba(190,116,78,.5),transparent 66%);
          animation:splash-breathe 5s ease-in-out infinite alternate;
        }
        .ayc-splash-glow-one { top:-38%; left:-24%; }
        .ayc-splash-glow-two { right:-28%; bottom:-48%; animation-delay:-2.5s; background:radial-gradient(circle,rgba(126,35,57,.55),transparent 68%); }
        .ayc-splash-grain {
          position:absolute; inset:0; pointer-events:none; opacity:.12;
          background-image:radial-gradient(rgba(255,255,255,.34) .55px,transparent .7px);
          background-size:5px 5px; mask-image:linear-gradient(transparent,#000 18%,#000 82%,transparent);
        }
        .ayc-splash-emblem {
          border:1px solid rgba(226,189,128,.78);
          background:linear-gradient(145deg,rgba(255,244,223,.08),rgba(119,48,61,.12));
          box-shadow:0 0 0 7px rgba(226,189,128,.035),0 0 34px rgba(226,189,128,.2),inset 0 0 25px rgba(226,189,128,.08);
        }
        .ayc-splash-monogram {
          color:#f3d9aa;
          text-shadow:0 0 10px rgba(255,226,177,.7),0 0 28px rgba(226,189,128,.58),0 0 54px rgba(189,116,77,.3);
        }
        .ayc-splash-name {
          color:#fff8ed;
          text-shadow:0 0 12px rgba(255,240,219,.34),0 0 36px rgba(226,189,128,.22);
        }
        .ayc-splash-subtitle {
          color:#e8bd83;
          text-shadow:0 0 15px rgba(226,189,128,.56);
        }
        .ayc-splash-rule { background:rgba(226,189,128,.18); box-shadow:0 0 18px rgba(226,189,128,.12); }
        .ayc-splash-progress {
          background:linear-gradient(90deg,#9d3948,#f4d7a4 58%,#b9824c);
          box-shadow:0 0 12px rgba(244,215,164,.9),0 0 25px rgba(226,189,128,.55);
          animation:splash 1.25s ease-in-out infinite;
        }
        @keyframes splash { from { transform:translateX(-110%); } to { transform:translateX(220%); } }
        @keyframes splash-breathe { from { transform:scale(.9); opacity:.18; } to { transform:scale(1.12); opacity:.34; } }
        @media(prefers-reduced-motion:reduce) {
          .ayc-splash-glow,.ayc-splash-progress { animation:none; }
        }
      `}</style>
    </div>
  );
}
