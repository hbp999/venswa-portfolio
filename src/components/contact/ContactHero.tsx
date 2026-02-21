'use client'

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";

export function ContactHero() {
    return (
        <Section className="bg-soft-white pt-32 pb-16 md:pt-40 md:pb-24 overflow-x-clip relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-blue/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-green/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-4xl w-full relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-display text-5xl md:text-6xl font-bold tracking-tight text-dark-text mb-6"
                >
                    Contact Us
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-5 text-lg leading-7 text-dark-text/70 sm:text-lg"
                >
                    Tell us about your brand and goals. Let&apos;s create something amazing together.
                </motion.p>
            </div>
        </Section>
    );
}
