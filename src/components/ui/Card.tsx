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
        "rounded-3xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50",
        "transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

