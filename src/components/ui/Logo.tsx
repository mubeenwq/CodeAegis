import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
  compact?: boolean;
}

export function Logo({ href = "/", compact = false }: LogoProps) {
  if (compact) {
    return (
      <Link href={href} className="inline-flex items-center focus:outline-none">
        <Image
          src="/images/codeaegis-icon.svg"
          alt="CodeAegis Icon"
          width={40}
          height={40}
          priority
        />
      </Link>
    );
  }

  return (
    <Link href={href} className="inline-flex items-center focus:outline-none group">
      <Image
        src="/images/codeaegis-logo.svg"
        alt="CodeAegis — From Intent to Prevent"
        width={160}
        height={72}
        priority
        className="transition-opacity group-hover:opacity-90"
      />
    </Link>
  );
}
