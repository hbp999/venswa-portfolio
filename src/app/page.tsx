import { supabase } from "@/lib/supabaseClient";
import dynamic from "next/dynamic";
import type { ProjectRow, ServiceRow, TestimonialRow } from "@/components/home/HomeContent";

const HomeContent = dynamic(() => import("@/components/home/HomeContent").then(mod => mod.HomeContent), {
  loading: () => <div className="flex h-[50vh] w-full items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-soft-grey border-t-royal-blue" />
      <p className="text-sm font-medium text-text-secondary animate-pulse">Loading experience...</p>
    </div>
  </div>
});

export default async function Home() {
  const [{ data: projects }, { data: services }, { data: testimonials }] =
    await Promise.all([
      supabase
        .from("projects")
        .select(
          "id,title,slug,cover_media_url,results,client:clients(name)",
        )
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3),
      supabase
        .from("services")
        .select("id,title,short_desc,sort_order")
        .order("sort_order", { ascending: true })
        .limit(6),
      supabase
        .from("testimonials")
        .select("id,client_name,role,quote,client_logo_url,is_featured")
        .eq("is_featured", true)
        .limit(4),
    ]);


  const safeProjects = (projects ?? []).map((project, index) => ({
    ...project,
    cover_media_url: project.cover_media_url || `/demo-project-${index + 1}.jpg`
  })) as unknown as ProjectRow[];
  const safeServices = (services ?? []) as ServiceRow[];
  const safeTestimonials = (testimonials ?? []) as TestimonialRow[];

  return (
    <HomeContent
      projects={safeProjects}
      services={safeServices}
      testimonials={safeTestimonials}
    />
  );
}
