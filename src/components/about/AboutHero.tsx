'use client'

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";

export function AboutHero() {
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
                    About Venswa Studio
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <p className="mt-5 text-xl leading-relaxed text-text-secondary mb-8">
                        Venswa Studio is a digital marketing agency helping businesses grow through strategy, creativity, and consistent online execution.
                    </p>
                    <p className="text-2xl font-semibold text-accent-primary">
                        We don’t just post content — we build brands digitally.
                    </p>
                </motion.div>
            </div>
        </Section>
    );
}
