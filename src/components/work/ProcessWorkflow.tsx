'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { cn } from '@/lib/cn';
import {
    Search,
    Lightbulb,
    PenTool,
    Rocket,
    BarChart3,
    CheckCircle2
} from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "Understand Your Business",
        icon: Search,
        color: "bg-blue-500",
        description: "We start by learning about your business, goals, target audience, and competitors. Every strategy is custom-built, not copied."
    },
    {
        id: 2,
        title: "Plan the Right Strategy",
        icon: Lightbulb,
        color: "bg-indigo-500",
        description: "Based on your goals, we create a clear plan covering:",
        details: [
            "Content strategy",
            "Platform selection",
            "Ads & lead generation",
            "CRM & automation (if required)"
        ]
    },
    {
        id: 3,
        title: "Create High-Impact Content",
        icon: PenTool,
        color: "bg-purple-500",
        description: "Our creative team designs:",
        details: [
            "Reels, posts & carousels",
            "Ad creatives & scripts",
            "Brand-consistent visuals",
            "FlashShoot instant reels for events"
        ]
    },
    {
        id: 4,
        title: "Execute & Publish",
        icon: Rocket,
        color: "bg-rose-500",
        description: "We implement the strategy with:",
        details: [
            "Scheduled posting",
            "Ad campaign setup",
            "Website & landing page integration",
            "CRM lead tracking"
        ]
    },
    {
        id: 5,
        title: "Track, Optimize & Scale",
        icon: BarChart3,
        color: "bg-emerald-500",
        description: "We continuously monitor performance:",
        details: [
            "Reach, engagement & leads",
            "Campaign optimization",
            "Monthly performance reports",
            "Strategy refinement for growth"
        ]
    }
];

export function ProcessWorkflow() {
    const [activeStep, setActiveStep] = useState(0);

    // Rotation logic:
    // We want the active step to always be at the "East" (0 degrees) position to face the card.
    // Step 0 starts at -90deg (North).
    // Steps are spaced 360/5 = 72deg apart.
    // To bring Step 0 to 0deg (East), we rotate +90deg.
    // The general formula to bringing the current active step to 0deg:
    // rotation = 90 - (activeStep * (360 / steps.length))
    const rotation = 90 - (activeStep * (360 / steps.length));

    return (
        <Section className="py-24 overflow-hidden relative">
            <div className="absolute inset-0 bg-soft-white/50 -z-10" />

            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-4">
                {/* Circular Diagram Container */}
                {/* Increased size from max-w-[500px] to max-w-[600px] and added padding */}
                <div className="relative aspect-square w-full max-w-[600px] mx-auto flex items-center justify-center">

                    {/* Rotating Container */}
                    <motion.div
                        className="relative w-full h-full"
                        animate={{ rotate: rotation }}
                        transition={{ type: "spring", stiffness: 60, damping: 20 }}
                    >
                        {/* Connecting Circle Line */}
                        <div className="absolute inset-12 rounded-full border-2 border-dashed border-slate-200" />

                        {/* Orbiting Steps */}
                        {steps.map((step, index) => {
                            // Position calculation based on standard circle
                            const stepAngle = (index * (360 / steps.length)) - 90;
                            const rad = (stepAngle * Math.PI) / 180;
                            const radius = 42; // % from center
                            const left = 50 + radius * Math.cos(rad);
                            const top = 50 + radius * Math.sin(rad);

                            return (
                                <motion.button
                                    key={step.id}
                                    onClick={() => setActiveStep(index)}
                                    className={cn(
                                        "absolute w-20 h-20 -ml-10 -mt-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-20 border-4",
                                        activeStep === index
                                            ? "scale-110 bg-white border-white ring-4 ring-black/5"
                                            : "bg-white hover:bg-slate-50 border-slate-50 grayscale hover:grayscale-0"
                                    )}
                                    style={{
                                        left: `${left}%`,
                                        top: `${top}%`,
                                    }}
                                >
                                    {/* Counter-rotate the content inside so icons stay upright */}
                                    <motion.div
                                        animate={{ rotate: -rotation }}
                                        transition={{ type: "spring", stiffness: 60, damping: 20 }}
                                        className="w-full h-full flex items-center justify-center"
                                    >
                                        <div className={cn(
                                            "w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300",
                                            activeStep === index ? step.color : "bg-slate-100 text-slate-400"
                                        )}>
                                            <step.icon className={cn("w-7 h-7", activeStep === index ? "text-white" : "")} />
                                        </div>
                                    </motion.div>
                                </motion.button>
                            );
                        })}
                    </motion.div>

                    {/* Center Static Content */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Increased center circle size */}
                        <div className="w-48 h-48 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center z-10">
                            <span className="text-sm font-bold text-dark-text uppercase tracking-widest">Value Addition</span>
                        </div>
                    </div>

                    {/* Visual Connector to the Right */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 hidden lg:flex items-center z-0">
                        <div className="w-12 h-0.5 border-t-2 border-dashed border-slate-300" />
                        <div className="w-3 h-3 bg-slate-300 rounded-full -ml-1.5" />
                    </div>

                </div>

                {/* Content Panel */}
                <div className="relative">
                    {/* Desktop Connector Point */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-6 h-6 bg-white rotate-45 border-l border-b border-slate-100 hidden lg:block z-10" />

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 min-h-[400px] flex flex-col justify-center relative z-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <span className={cn("px-4 py-1.5 rounded-full text-sm font-bold text-white uppercase tracking-wider shadow-sm", steps[activeStep].color)}>
                                        Step 0{activeStep + 1}
                                    </span>
                                </div>

                                <h3 className="text-3xl md:text-4xl font-bold text-dark-text mb-6">
                                    {steps[activeStep].title}
                                </h3>

                                <p className="text-xl text-dark-text/70 mb-10 leading-relaxed font-light">
                                    {steps[activeStep].description}
                                </p>

                                {steps[activeStep].details && (
                                    <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                                        {steps[activeStep].details.map((detail, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="flex items-start gap-3"
                                            >
                                                <div className={cn("mt-1 p-0.5 rounded-full shrink-0", steps[activeStep].color.replace('bg-', 'bg-opacity-20 text-'))}>
                                                    <CheckCircle2 className={cn("w-5 h-5", steps[activeStep].color.replace('bg-', 'text-'))} />
                                                </div>
                                                <span className="text-dark-text/80 text-lg font-medium">{detail}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </Section>
    );
}

function PropsIcon({ icon: Icon }: { icon: any }) {
    return <Icon className="w-8 h-8" />;
}
