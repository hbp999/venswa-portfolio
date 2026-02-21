'use client'

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";

export function WorkHero() {
    return (
        <Section className="bg-bg-surface pt-32 pb-16 md:pt-40 md:pb-24 overflow-x-clip relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-secondary/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-4xl w-full relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-display text-5xl md:text-6xl font-bold tracking-tight text-text-primary mb-6"
                >
                    Our Work
                </motion.h1>
                <motion.p
                    transition={{ delay: 0.4 }}
                    className="mt-5 text-lg leading-7 text-text-secondary sm:text-lg"
                >
                    Discover how we&apos;ve helped ambitious brands transform their digital presence and drive measurable growth through creative strategy.
                </motion.p>
            </div>
        </Section>
    );
}
