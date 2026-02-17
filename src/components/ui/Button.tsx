import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";

export function Button({
  variant = "primary",
  href,
  className,
  children,
  type,
  onClick,
  disabled,
}: {
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue/50 active:scale-95";

  const styles =
    variant === "primary"
      ? "text-white shadow-[0_10px_40px_-10px_rgba(46,76,184,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(46,76,184,0.4)] hover:-translate-y-0.5 bg-[linear-gradient(135deg,#2E4CB8,#1FB57A)]"
      : "border border-gray-200 bg-white text-dark-text hover:border-royal-blue/30 hover:text-royal-blue hover:bg-royal-blue/5";

  const classes = cn(
    base,
    styles,
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

