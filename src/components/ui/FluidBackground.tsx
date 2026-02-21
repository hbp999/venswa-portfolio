'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

interface FluidBackgroundProps {
    className?: string;
}

export function FluidBackground({ className = '' }: FluidBackgroundProps) {
    const [isMounted, setIsMounted] = useState(false);

    // We only want this effect active on larger screens for performance 
    // and because touch devices don't have persistent cursors.
    const [isDesktop, setIsDesktop] = useState(true);

    // Mouse position state
    const cursorX = useSpring(0, { stiffness: 40, damping: 20, mass: 1 });
    const cursorY = useSpring(0, { stiffness: 40, damping: 20, mass: 1 });

    // Slower trailing orbs
    const trailX1 = useSpring(0, { stiffness: 20, damping: 30, mass: 2 });
    const trailY1 = useSpring(0, { stiffness: 20, damping: 30, mass: 2 });

    const trailX2 = useSpring(0, { stiffness: 10, damping: 40, mass: 3 });
    const trailY2 = useSpring(0, { stiffness: 10, damping: 40, mass: 3 });

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
        // Basic check for touch device vs precise pointer (mouse)
        const checkDevice = () => {
            setIsDesktop(window.matchMedia('(pointer: fine)').matches);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    useEffect(() => {
        if (!isDesktop || !containerRef.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;

            // Calculate position relative to container
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set raw positions
            cursorX.set(x - 300); // offset by half blur size to center
            cursorY.set(y - 300);

            trailX1.set(x - 400); // 800px wide orb
            trailY1.set(y - 400);

            trailX2.set(x - 250); // 500px wide orb
            trailY2.set(y - 250);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isDesktop, cursorX, cursorY, trailX1, trailY1, trailX2, trailY2]);

    if (!isMounted) return <div className={`absolute inset-0 overflow-hidden pointer-events-none opacity-50 bg-bg-primary ${className}`} />;

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 overflow-hidden pointer-events-none bg-bg-primary select-none ${className}`}
        >
            {/* Base static ambient glow so the background isn't completely dead if mouse isn't moving */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-[120px] mix-blend-screen" />

            {/* Interactive Orbs - Only active on Desktop */}
            {isDesktop ? (
                <>
                    {/* Primary direct follower - Vibrant Cyan */}
                    <motion.div
                        style={{ x: cursorX, y: cursorY }}
                        className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen will-change-transform"
                    />

                    {/* Secondary trailing orb - Deep Indigo/Purple */}
                    <motion.div
                        style={{ x: trailX1, y: trailY1 }}
                        className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#2E4CB8]/10 rounded-full blur-[120px] mix-blend-screen will-change-transform"
                    />

                    {/* Tertiary slower orb - Vibrant Green/Emerald */}
                    <motion.div
                        style={{ x: trailX2, y: trailY2 }}
                        className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#1FB57A]/10 rounded-full blur-[90px] mix-blend-screen will-change-transform"
                    />
                </>
            ) : (
                // Mobile Fallback - slow CSS pulse animation
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent-primary/10 rounded-full blur-[80px] animate-pulse-slow mix-blend-screen" />
                </div>
            )}

            {/* Grain/Noise Overlay for premium texture */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

            {/* Vignette to focus attention center */}
            <div className="absolute inset-0 bg-linear-to-t from-bg-primary via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-linear-to-b from-bg-primary via-transparent to-transparent opacity-40" />
        </div>
    );
}
