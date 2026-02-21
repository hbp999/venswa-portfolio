import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl flex flex-col bg-bg-primary border border-border-color/60",
        "transition-all duration-500 hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

