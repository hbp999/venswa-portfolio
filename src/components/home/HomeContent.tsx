'use client'

import { cn } from "@/lib/cn";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ClientLogos } from "@/components/ui/ClientLogos";
import { useRef } from 'react';
import { motion } from 'framer-motion'
import {
    ChevronDown,
    Megaphone,
    Users,
    Camera,
    TrendingUp,
    Video,
    Palette
} from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, staggerItem } from '@/components/providers/MotionProvider'
import { HeroSection } from "@/components/home/HeroSection"; // Changed from HeroScrollAnimation
import { ClientOnly } from "@/components/ui/ClientOnly";

export type ClientRow = {
    id: string;
    name: string;
    logo_url: string | null;
    website: string | null;
    sort_order: number | null;
    is_featured: boolean | null;
};

export type ProjectRow = {
    id: string;
    title: string;
    slug: string | null;
    cover_media_url: string | null;
    results: Record<string, unknown> | null;
    client: Array<{ name: string }> | null;
};

export type ServiceRow = {
    id: string;
    title: string;
    short_desc: string | null;
    sort_order: number | null;
};

export type TestimonialRow = {
    id: string;
    client_name: string | null;
    role: string | null;
    quote: string | null;
    client_logo_url: string | null;
    is_featured: boolean | null;
};

interface HomeContentProps {

    projects: ProjectRow[];
    services: ServiceRow[];
    testimonials: TestimonialRow[];
}

function getFirstMetric(results: Record<string, unknown> | null) {
    if (!results) return null;
    const entries = Object.entries(results);
    if (entries.length === 0) return null;
    const [key, value] = entries[0];
    if (value === null || value === undefined) return null;
    return `${String(value)} ${key.replaceAll("_", " ")} `;
}

export function HomeContent({ projects, services, testimonials }: HomeContentProps) {
    return (
        <>
            {/* Force rebuild */}
            <ClientOnly>
                <HeroSection />
            </ClientOnly>

            {/* Content that scrolls over the sticky hero */}
            <div className="relative z-10 bg-white">
                <ClientLogos />

                <Section className="bg-soft-white">
                    <div className="flex items-end justify-between gap-6">
                        <div className="flex-1 max-w-3xl">
                            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                                Featured work
                            </h2>
                            <p className="mt-3 text-base text-dark-text/70 sm:text-lg leading-relaxed">
                                Campaigns and content built to drive measurable outcomes.
                            </p>
                        </div>
                        <div className="hidden sm:block">
                            <Button href="/work" variant="secondary">
                                View all
                            </Button>
                        </div>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="mt-10 grid gap-6 md:grid-cols-3"
                    >
                        {projects.map((project, index) => {
                            const metric = getFirstMetric(project.results);
                            const href = project.slug ? `/ work / ${project.slug} ` : "/work";
                            const clientName = project.client?.[0]?.name ?? "";

                            return (
                                <motion.div
                                    key={project.id}
                                    variants={staggerItem}
                                >
                                    <Link href={href} className="group">
                                        <Card className="h-full overflow-hidden p-0 transition-transform group-hover:-translate-y-px">
                                            <div className="relative aspect-16/10 w-full bg-soft-grey flex items-center justify-center text-dark-text/20">
                                                <div className="font-semibold text-xs tracking-widest uppercase">Layout Placeholder</div>
                                            </div>
                                            <div className="p-6">
                                                {clientName && (
                                                    <div className="text-xs font-medium text-dark-text/60">
                                                        {clientName}
                                                    </div>
                                                )}
                                                <div className="mt-2 font-display text-lg font-semibold">
                                                    {project.title}
                                                </div>
                                                <div className="mt-2 text-sm text-dark-text/70">
                                                    View case study →
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    <div className="mt-8 sm:hidden">
                        <Button href="/work" variant="secondary" className="w-full">
                            View all work
                        </Button>
                    </div>
                </Section>

                <Section className="bg-pure-white">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="flex items-end justify-between gap-6"
                    >
                        <div className="flex-1 max-w-3xl">
                            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                                Services snapshot
                            </h2>
                            <p className="mt-3 text-base text-dark-text/70 sm:text-lg leading-relaxed">
                                Venswa Studio is a digital marketing agency focused on helping brands grow through strategy, creativity, and consistent execution across Instagram, Facebook, and YouTube.
                            </p>
                        </div>
                        <div className="hidden sm:block">
                            <Button href="/services" variant="secondary">
                                Explore services
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="mt-10 grid gap-6 md:grid-cols-3"
                    >
                        {services.map((service, index) => {
                            // Simple icon mapping based on title
                            const title = service.title.toLowerCase();
                            let Icon = Megaphone;
                            if (title.includes('content') || title.includes('production')) Icon = Camera;
                            if (title.includes('manage') || title.includes('social')) Icon = Users;
                            if (title.includes('ad') || title.includes('campaign')) Icon = TrendingUp;
                            if (title.includes('strategy') || title.includes('brand')) Icon = Palette;
                            if (title.includes('video')) Icon = Video;

                            // Alternate colors for a more dynamic look
                            const colors = [
                                "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
                                "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
                                "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
                                "bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white",
                            ];
                            const colorClass = colors[index % colors.length];

                            return (
                                <motion.div key={service.id} variants={staggerItem}>
                                    <Card className="p-8 h-full group hover:border-transparent hover:shadow-xl transition-all duration-300">
                                        <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm", colorClass)}>
                                            <Icon className="h-7 w-7" />
                                        </div>
                                        <div className="mt-6 font-display text-xl font-bold text-dark-text group-hover:text-royal-blue transition-colors">
                                            {service.title}
                                        </div>
                                        <p className="mt-3 text-base leading-relaxed text-dark-text/60">
                                            {service.short_desc ?? ""}
                                        </p>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    <div className="mt-8 sm:hidden">
                        <Button href="/services" variant="secondary" className="w-full">
                            Explore services
                        </Button>
                    </div>
                </Section>

                {testimonials.length > 0 ? (
                    <Section className="bg-soft-white">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="max-w-4xl"
                        >
                            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                                Testimonials
                            </h2>
                            <p className="mt-3 text-base text-dark-text/70 sm:text-lg leading-relaxed">
                                What clients say after we ship the work.
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="mt-10 grid gap-6 md:grid-cols-2"
                        >
                            {testimonials.map((t) => (
                                <motion.div
                                    key={t.id}
                                    variants={staggerItem}
                                >
                                    <Card className="p-8 h-full relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Megaphone className="h-24 w-24 text-dark-text" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-full bg-royal-blue/10 flex items-center justify-center text-royal-blue font-bold">
                                                    {t.client_name?.[0] || 'V'}
                                                </div>
                                                <div>
                                                    <div className="font-display text-base font-semibold">
                                                        {t.client_name ?? ""}
                                                    </div>
                                                    <div className="text-xs text-dark-text/60">
                                                        {t.role ?? ""}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mt-6 text-sm italic leading-7 text-dark-text/80">
                                                &ldquo;{t.quote ?? ""}&rdquo;
                                            </p>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </Section>
                ) : null}

                {/* <Section className="bg-white" containerClassName="py-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="rounded-[40px] bg-gradient-to-br from-[#2E4CB8] via-[#2E4CB8] to-[#1FB57A] px-8 py-20 text-white sm:px-16 sm:py-28 relative overflow-hidden shadow-2xl"
                    >
                        {/* Decorative background elements 
                        <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-white/10 blur-3xl pointer-events-none mix-blend-overlay" />
                        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none mix-blend-overlay" />

                        <div className="relative flex flex-col items-center text-center gap-10">
                            <div className="max-w-3xl">
                                <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl text-white">
                                    Let’s grow your brand digitally.
                                </h2>
                                <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
                                    Ready to take your business to the next level? Join the hundreds of companies that trust us with their digital presence.
                                </p>
                            </div>
                            <Button href="/contact" variant="secondary" className="bg-white text-royal-blue hover:bg-gray-50 border-0 py-5 px-10 text-lg font-bold shadow-xl transition-all hover:scale-105">
                                Start a Project
                            </Button>
                        </div>
                    </motion.div>
                </Section>

                {/* End of scrolling content 
                */}
            </div>
        </>
    );
}
