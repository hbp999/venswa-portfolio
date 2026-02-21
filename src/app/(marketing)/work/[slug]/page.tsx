import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Section } from '@/components/layout/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabaseClient'

type ProjectRow = {
  id: string
  title: string
  slug: string | null
  cover_media_url: string | null
  gallery: string[] | null
  results: Record<string, unknown> | null
  industry: string | null
  platforms: string[] | null
  services: string[] | null
  description: string | null
  client: Array<{ name: string; logo_url: string | null; website: string | null }> | null
  created_at: string
}

interface ProjectPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { data: project } = await supabase
    .from('projects')
    .select('title,description,cover_media_url,client:clients(name)')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const clientName = project.client?.[0]?.name ?? 'Client'

  return {
    title: `${project.title} | Venswa Studios`,
    description: project.description || `Case study: ${project.title} for ${clientName}`,
    openGraph: {
      title: `${project.title} - ${clientName} | Venswa Studios`,
      description: project.description || `Case study: ${project.title} for ${clientName}`,
      images: project.cover_media_url ? [project.cover_media_url] : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { data: project } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      slug,
      cover_media_url,
      gallery,
      results,
      industry,
      platforms,
      services,
      description,
      client:clients(name, logo_url, website),
      created_at
    `)
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!project) {
    notFound()
  }

  const projectData = project as ProjectRow
  const client = projectData.client?.[0]

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-bg-surface">
        <div className="max-w-4xl">
          <div className="mb-6">
            {client && (
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-bg-surface flex items-center justify-center text-[10px] text-text-secondary border">Logo</div>
                <div>
                  <div className="text-sm font-medium text-text-secondary">Client</div>
                  <div className="font-display text-lg font-semibold">{client.name}</div>
                </div>
              </div>
            )}
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {projectData.title}
          </h1>

          {projectData.description && (
            <p className="mt-4 text-base text-text-secondary sm:text-lg leading-relaxed">
              {projectData.description}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {projectData.industry && (
              <span className="inline-flex items-center rounded-[12px] bg-accent-primary/10 px-3 py-1 text-sm font-medium text-accent-primary">
                {projectData.industry}
              </span>
            )}
            {projectData.platforms?.map((platform) => (
              <span
                key={platform}
                className="inline-flex items-center rounded-[12px] bg-accent-secondary/10 px-3 py-1 text-sm font-medium text-accent-secondary"
              >
                {platform}
              </span>
            ))}
            {projectData.services?.map((service) => (
              <span
                key={service}
                className="inline-flex items-center rounded-[12px] bg-metallic-gold/10 px-3 py-1 text-sm font-medium text-metallic-gold"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Cover Media */}
      {projectData.cover_media_url && (
        <Section className="bg-bg-primary">
          <div className="max-w-6xl">
            <div className="aspect-16/10 w-full overflow-hidden rounded-[24px] bg-bg-surface flex items-center justify-center text-text-secondary">
              <div className="font-semibold text-lg tracking-widest uppercase text-center px-6">Project Cover Placeholder</div>
            </div>
          </div>
        </Section>
      )}

      {/* Results Section */}
      {projectData.results && Object.keys(projectData.results).length > 0 && (
        <Section className="bg-bg-surface">
          <div className="max-w-4xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Results
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(projectData.results).map(([key, value]) => (
                <Card key={key} className="p-6 text-center">
                  <div className="font-display text-3xl font-bold text-accent-primary">
                    {String(value)}
                  </div>
                  <div className="mt-2 text-sm text-text-secondary">
                    {key.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Gallery Section */}
      {projectData.gallery && projectData.gallery.length > 0 && (
        <Section className="bg-bg-primary">
          <div className="max-w-4xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Gallery
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {projectData.gallery.map((imageUrl, index) => (
                <div key={index} className="aspect-16/10 w-full overflow-hidden rounded-[16px] bg-bg-surface flex items-center justify-center text-text-secondary font-semibold text-xs uppercase">
                  Gallery Image {index + 1}
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="bg-bg-surface">
        <div className="max-w-4xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to achieve similar results?
          </h2>
          <p className="mt-4 text-base text-text-secondary sm:text-lg leading-relaxed">
            Let&apos;s discuss how we can help your brand grow with strategic social media
            marketing and compelling content.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/contact" variant="primary">
              Start a Project
            </Button>
            <Button href="/work" variant="secondary">
              View More Work
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
