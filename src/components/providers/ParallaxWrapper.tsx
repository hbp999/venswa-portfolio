'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

interface ParallaxWrapperProps {
    children: React.ReactNode;
    /** 
     * Positive offset moves element UP while scrolling down (standard parallax). 
     * Negative offset moves element DOWN while scrolling down.
     */
    offset?: number;
    className?: string;
    /** 
     * If true, the parallax effect waits until the specific element enters the viewport. 
     * Useful for elements further down the page. Default is false (global scroll tracking).
     */
    useViewportScroll?: boolean;
}

export function ParallaxWrapper({
    children,
    offset = 50,
    className = '',
    useViewportScroll = false
}: ParallaxWrapperProps) {
    const shouldReduceMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);

    // Global scroll progress (0 to 1 anywhere on page)
    const { scrollYProgress: globalScrollYProgress } = useScroll();

    // Element-specific scroll progress (0 to 1 as it tracks through viewport)
    const { scrollYProgress: viewportScrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const activeScrollProgress = useViewportScroll ? viewportScrollYProgress : globalScrollYProgress;

    // Apply smooth spring damping so scrolling isn't jittery
    const springProgress = useSpring(activeScrollProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map scroll progress (0 to 1) to absolute Y translation
    // For viewport scroll (elements further down), map from offset (bottom) to -offset (top)
    // For global scroll (hero elements), start at 0 (natural position) and move to offset
    const yTransform = useTransform(
        springProgress,
        [0, 1],
        useViewportScroll ? [offset, -offset] : [0, offset]
    );

    // Completely disable on mobile screens or if user prefers reduced motion
    // Next.js hydration requires we don't return null conditionally based on window size
    // So we apply the transform via framer-motion inline styles which handles it

    // In production we often want parallax disabled entirely on mobile (< 768px)
    // as it conflicts heavily with mobile browser "snap" scrolling layers 
    // and drains battery.

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            ref={ref}
            style={{ y: yTransform }}
            className={`will-change-transform ${className} hidden md:block`}
        >
            {children}
        </motion.div>
    );
}

// Mobile fallback that doesn't animate, preventing hydration mismatch
export function MobileParallaxFallback({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`md:hidden ${className}`}>
            {children}
        </div>
    );
}
