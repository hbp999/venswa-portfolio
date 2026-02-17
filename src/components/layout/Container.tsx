import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl 2xl:max-w-[1600px] min-[1920px]:max-w-[1800px] px-4 sm:px-6 lg:px-10",
        className,
      )}
    >
      {children}
    </div>
  );
}

