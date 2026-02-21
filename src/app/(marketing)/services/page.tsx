import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

  const getImageForService = (title: string) => {
    const mapping: Record<string, string> = {
      'Social Media Management': '/images/services/social_media.png',
      'Content Strategy & Branding': '/images/services/strategy.png',
      'Professional Shoots': '/images/services/shoots.png',
      'Design & Editing': '/images/services/design.png',
      'Posting & Scheduling': '/images/services/scheduling.png',
      'Growth Strategy': '/images/services/growth.png',
      'Paid Ads': '/images/services/ads.png',
    };
    return mapping[title] || '/images/placeholders/hero_dark_abstract.png';
  };

  return (
    <>
      <ServicesHero />

      <Section className="bg-bg-surface/50 min-h-screen">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {safeServices.map((service) => (
            <div key={service.id} className="h-full">
              <Link href="/contact" className="group block h-full">
                <Card className="h-full overflow-hidden p-0 bg-bg-primary border-border-color/60 group hover:-translate-y-1">
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-bg-surface flex items-center justify-center text-text-secondary">
                    <Image
                      src={getImageForService(service.title)}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-20" />
                    <div className="absolute top-4 right-4 z-30 bg-bg-primary/90 backdrop-blur-md rounded-full p-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-text-primary" />
                    </div>
                  </div>

                  <div className="p-6 bg-bg-primary flex-1 flex flex-col">
                    <div className="text-xs font-bold uppercase tracking-wider text-accent-primary/80 mb-2">
                      Service
                    </div>
                    <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors duration-300 mb-2">
                      {service.title}
                    </h3>
                    <p className="mt-auto pt-4 text-sm text-text-secondary leading-relaxed flex-1">
                      {service.long_desc ?? service.short_desc ?? ""}
                    </p>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

