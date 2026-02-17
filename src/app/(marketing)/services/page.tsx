import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ServiceVisual } from "@/components/3d/ServiceVisual";
import { supabase } from "@/lib/supabaseClient";

import { ServicesHero } from "@/components/services/ServicesHero";

type ServiceRow = {
  id: string;
  title: string;
  short_desc: string | null;
  long_desc: string | null;
  sort_order: number | null;
};

export default async function ServicesPage() {
  const { data: services } = await supabase
    .from("services")
    .select("id,title,short_desc,long_desc,sort_order")
    .order("sort_order", { ascending: true });

  const safeServices = (services ?? []) as ServiceRow[];

  return (
    <>
      <ServicesHero />

      <Section className="bg-soft-white/50 min-h-screen">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {safeServices.map((service) => (
            <div key={service.id} className="h-full">
              <Card className="h-full flex flex-col overflow-hidden p-0 hover:border-royal-blue/30 transition-colors group">
                <div className="relative h-48 w-full bg-soft-grey/30">
                  <ServiceVisual serviceType={service.title} />
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-royal-blue/80 mb-2">
                    Service
                  </p>
                  <h2 className="font-display text-xl font-semibold tracking-tight text-dark-text group-hover:text-royal-blue transition-colors">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm text-dark-text/70 leading-relaxed flex-1">
                    {service.long_desc ?? service.short_desc ?? ""}
                  </p>

                  <div className="mt-6 flex flex-col gap-2">
                    <Button href="/contact" variant="primary" className="w-full justify-center">
                      Get a Quote
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

