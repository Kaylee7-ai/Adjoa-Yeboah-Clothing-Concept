import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  onClick?: () => void;
  compact?: boolean;
  light?: boolean;
  className?: string;
};

export default function BrandLogo({
  href = "/",
  onClick,
  compact = false,
  light = false,
  className = "",
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="Adjoa Yeboah Clothing home"
      className={`ay-wordmark inline-flex min-w-0 items-center gap-2.5 ${light ? "ay-wordmark-light" : ""} ${className}`}
    >
      <span className="ay-wordmark-mark" aria-hidden="true">
        <span>AY</span>
        <i />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="ay-wordmark-name">Adjoa Yeboah</span>
        {!compact && <span className="ay-wordmark-caption">CLOTHING · ACCRA</span>}
      </span>
    </Link>
  );
}
