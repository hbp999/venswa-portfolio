'use client'

import { cn } from "@/lib/cn";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ClientLogos } from "@/components/ui/ClientLogos";
import Image from "next/image";
import { useRef } from 'react';
import { motion } from 'framer-motion'
import {
    ChevronDown,
    Megaphone,
    Users,
    Camera,
    TrendingUp,
    Video,
    Palette,
    ArrowUpRight
} from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, staggerItem } from '@/components/providers/MotionProvider'
import { HeroSection } from "@/components/home/HeroSection"; // Changed from HeroScrollAnimation
import { ClientOnly } from "@/components/ui/ClientOnly";
import { InstagramReels } from "@/components/home/InstagramReels";
import { ParallaxWrapper, MobileParallaxFallback } from "@/components/providers/ParallaxWrapper";

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
            <div className="relative z-10 bg-bg-primary">
                <ClientLogos />

                <Section className="bg-bg-surface relative border-y border-border-color/30">
                    <div className="flex items-end justify-between gap-6">
                        <div className="flex-1 max-w-3xl">
                            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl text-text-primary">
                                Featured work
                            </h2>
                            <p className="mt-3 text-base text-text-secondary sm:text-lg leading-relaxed">
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
                                    className="h-full"
                                >
                                    <ParallaxWrapper
                                        offset={index % 2 === 0 ? 30 : 60}
                                        useViewportScroll={true}
                                        className="h-full"
                                    >
                                        <Link href={href} className="group block h-full">
                                            <Card className="h-full overflow-hidden p-0 bg-bg-primary border-border-color/60 group hover:-translate-y-1">
                                                <div className="relative aspect-4/3 w-full overflow-hidden bg-bg-surface flex items-center justify-center text-text-secondary/40">
                                                    {/* Use AI placeholders for featured work 1 and 2, else generic layout text */}
                                                    {(index === 0 || index === 1) ? (
                                                        <Image
                                                            src={index === 0 ? "/images/placeholders/project_cover_1.png" : "/images/placeholders/project_cover_2.png"}
                                                            alt={project.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="font-semibold text-xs tracking-widest uppercase relative z-10">Layout Placeholder</div>
                                                    )}

                                                    {/* Overlay on hover */}
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-20" />
                                                    <div className="absolute top-4 right-4 z-30 bg-bg-primary/90 backdrop-blur-md rounded-full p-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                        <ArrowUpRight className="w-5 h-5 text-text-primary" />
                                                    </div>
                                                </div>

                                                <div className="p-6 bg-bg-primary flex-1 flex flex-col">
                                                    {clientName && (
                                                        <div className="text-xs font-bold uppercase tracking-wider text-accent-primary/80 mb-2">
                                                            {clientName}
                                                        </div>
                                                    )}
                                                    <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors duration-300 mb-2">
                                                        {project.title}
                                                    </h3>
                                                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                                                        <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-bg-surface/50 text-text-secondary">
                                                            View case study
                                                        </span>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </ParallaxWrapper>
                                    <MobileParallaxFallback className="h-full">
                                        <Link href={href} className="group block h-full">
                                            <Card className="h-full overflow-hidden p-0 bg-bg-primary border-border-color/60 group hover:-translate-y-1">
                                                <div className="relative aspect-4/3 w-full overflow-hidden bg-bg-surface flex items-center justify-center text-text-secondary/40">
                                                    {/* Use AI placeholders for featured work 1 and 2, else generic layout text */}
                                                    {(index === 0 || index === 1) ? (
                                                        <Image
                                                            src={index === 0 ? "/images/placeholders/project_cover_1.png" : "/images/placeholders/project_cover_2.png"}
                                                            alt={project.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="font-semibold text-xs tracking-widest uppercase relative z-10">Layout Placeholder</div>
                                                    )}

                                                    {/* Overlay on hover */}
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-20" />
                                                    <div className="absolute top-4 right-4 z-30 bg-bg-primary/90 backdrop-blur-md rounded-full p-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                        <ArrowUpRight className="w-5 h-5 text-text-primary" />
                                                    </div>
                                                </div>

                                                <div className="p-6 bg-bg-primary flex-1 flex flex-col">
                                                    {clientName && (
                                                        <div className="text-xs font-bold uppercase tracking-wider text-accent-primary/80 mb-2">
                                                            {clientName}
                                                        </div>
                                                    )}
                                                    <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors duration-300 mb-2">
                                                        {project.title}
                                                    </h3>
                                                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                                                        <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-bg-surface/50 text-text-secondary">
                                                            View case study
                                                        </span>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </MobileParallaxFallback>
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

                <Section className="bg-bg-primary">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="flex items-end justify-between gap-6"
                    >
                        <div className="flex-1 max-w-3xl">
                            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl text-text-primary">
                                Services snapshot
                            </h2>
                            <p className="mt-3 text-base text-text-secondary sm:text-lg leading-relaxed">
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
                                "bg-indigo-500/10 text-accent-primary group-hover:bg-accent-primary group-hover:text-white",
                                "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white",
                                "bg-cyan-500/10 text-accent-secondary group-hover:bg-accent-secondary group-hover:text-white",
                                "bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white",
                            ];
                            const colorClass = colors[index % colors.length];

                            return (
                                <motion.div key={service.id} variants={staggerItem} className="h-full">
                                    <ParallaxWrapper
                                        offset={index % 2 === 0 ? 20 : 50}
                                        useViewportScroll={true}
                                        className="h-full"
                                    >
                                        <Card className="p-8 h-full bg-bg-surface group hover:border-accent-primary/40 hover:-translate-y-1">
                                            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm", colorClass)}>
                                                <Icon className="h-7 w-7" />
                                            </div>
                                            <div className="mt-6 font-display text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                                                {service.title}
                                            </div>
                                            <p className="mt-3 text-base leading-relaxed text-text-secondary">
                                                {service.short_desc ?? ""}
                                            </p>
                                        </Card>
                                    </ParallaxWrapper>
                                    <MobileParallaxFallback className="h-full">
                                        <Card className="p-8 h-full bg-bg-surface group hover:border-accent-primary/40 hover:-translate-y-1">
                                            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm", colorClass)}>
                                                <Icon className="h-7 w-7" />
                                            </div>
                                            <div className="mt-6 font-display text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                                                {service.title}
                                            </div>
                                            <p className="mt-3 text-base leading-relaxed text-text-secondary">
                                                {service.short_desc ?? ""}
                                            </p>
                                        </Card>
                                    </MobileParallaxFallback>
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

                <InstagramReels />

                {testimonials.length > 0 ? (
                    <Section className="bg-bg-surface relative border-y border-border-color/30">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="max-w-4xl"
                        >
                            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl text-text-primary">
                                Testimonials
                            </h2>
                            <p className="mt-3 text-base text-text-secondary sm:text-lg leading-relaxed">
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
                                    <Card className="p-8 h-full relative overflow-hidden group hover:border-accent-primary/30 transition-colors hover:-translate-y-1">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Megaphone className="h-24 w-24 text-text-secondary" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary font-bold">
                                                    {t.client_name?.[0] || 'V'}
                                                </div>
                                                <div>
                                                    <div className="font-display text-base font-semibold text-text-primary">
                                                        {t.client_name ?? ""}
                                                    </div>
                                                    <div className="text-xs text-text-secondary">
                                                        {t.role ?? ""}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mt-6 text-sm italic leading-7 text-text-secondary">
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
                            <Button href="/contact" variant="secondary" className="bg-white text-accent-primary hover:bg-gray-50 border-0 py-5 px-10 text-lg font-bold shadow-xl transition-all hover:scale-105">
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
