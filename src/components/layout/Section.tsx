import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";

export function Section({
  className,
  containerClassName,
  children,
}: {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("py-12 sm:py-16 lg:py-24", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

