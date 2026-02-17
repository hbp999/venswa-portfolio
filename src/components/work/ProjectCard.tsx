import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { ArrowUpRight } from 'lucide-react'

type ProjectRow = {
  id: string
  title: string
  slug: string | null
  cover_media_url: string | null
  results: Record<string, unknown> | null
  industry: string | null
  platforms: string[] | null
  services: string[] | null
  client: Array<{ name: string }> | null
  created_at: string
}

export function ProjectCard({
  project,
  metric,
}: {
  project: ProjectRow
  metric: string | null
}) {
  const href = project.slug ? `/work/${project.slug}` : `/work`
  const clientName = project.client?.[0]?.name ?? ""

  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full overflow-hidden p-0 border-soft-grey/60 bg-transparent shadow-none hover:shadow-xl transition-all duration-500 rounded-2xl group flex flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-soft-grey flex items-center justify-center text-dark-text/20">
          <div className="font-semibold text-xs tracking-widest uppercase">Layout Placeholder</div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

          <div className="absolute top-4 right-4 bg-pure-white/90 backdrop-blur-md rounded-full p-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="w-5 h-5 text-dark-text" />
          </div>
        </div>

        <div className="p-6 bg-pure-white flex-1 flex flex-col">
          {clientName && (
            <div className="text-xs font-bold uppercase tracking-wider text-royal-blue/80 mb-2">
              {clientName}
            </div>
          )}

          <h3 className="font-display text-xl font-bold text-dark-text group-hover:text-royal-blue transition-colors duration-300 mb-2">
            {project.title}
          </h3>

          <div className="mt-auto pt-4 flex flex-wrap gap-2">
            {project.services?.slice(0, 2).map(service => (
              <span key={service} className="text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-soft-grey/50 text-dark-text/60">
                {service}
              </span>
            ))}
            {project.industry && (
              <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-soft-grey/50 text-dark-text/60">
                {project.industry}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
