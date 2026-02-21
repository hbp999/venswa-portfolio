import { Section } from "@/components/layout/Section";
import { supabase } from "@/lib/supabaseClient";
import { WorkHero } from "@/components/work/WorkHero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { ProcessWorkflow } from "@/components/work/ProcessWorkflow";
import { ClientLogos } from "@/components/ui/ClientLogos";

type ProjectRow = {
  id: string;
  title: string;
  slug: string | null;
  cover_media_url: string | null;
  results: Record<string, unknown> | null;
  industry: string | null;
  platforms: string[] | null;
  services: string[] | null;
  client: Array<{ name: string }> | null;
  created_at: string;
};

export default async function WorkPage() {
  const { data: projects } = await supabase
    .from("projects")
    .select(
      "id,title,slug,cover_media_url,results,industry,platforms,services,client:clients(name),created_at"
    )
    .eq("published", true)
    .order("created_at", { ascending: false });

  const safeProjects = (projects ?? []) as unknown as ProjectRow[];

  return (
    <>
      <WorkHero />

      <ProcessWorkflow />

      <Section className="bg-bg-surface/50 min-h-screen pt-0">
        <WorkGrid projects={safeProjects} />
      </Section>

      <ClientLogos />
    </>
  );
}
