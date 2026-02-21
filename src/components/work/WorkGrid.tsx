'use client'

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Button } from "@/components/ui/Button";

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

function getFirstMetric(results: Record<string, unknown> | null) {
    if (!results) return null;
    const entries = Object.entries(results);
    if (entries.length === 0) return null;
    const [key, value] = entries[0];
    if (value === null || value === undefined) return null;
    return `${String(value)} ${key.replaceAll("_", " ")}`;
}

export function WorkGrid({ projects }: { projects: ProjectRow[] }) {
    if (projects.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
            >
                <div className="w-16 h-16 bg-bg-surface rounded-full flex items-center justify-center mb-4 text-2xl">
                    🔍
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">No projects found</h3>
                <p className="text-text-secondary max-w-md mb-8">
                    We couldn&apos;t find any projects matching your current filters. Try adjusting your selection.
                </p>
                <Button
                    href="/work"
                    variant="secondary"
                >
                    Clear all filters
                </Button>
            </motion.div>
        );
    }

    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <ProjectCard
                        project={project}
                        metric={getFirstMetric(project.results)}
                    />
                </motion.div>
            ))}
        </div>
    );
}
