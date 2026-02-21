'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

import logo from '@/assets/logo-removebg-preview.png'
import { Container } from '@/components/layout/Container'
import { HeroContactForm } from './HeroContactForm'

export function HeroScrollAnimation() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollY } = useScroll()

    // Background Animations
    const bgOpacity = useTransform(scrollY, [0, 300], [1, 0])
    const bgBlur = useTransform(scrollY, [0, 300], ["0px", "10px"])
    const bgScale = useTransform(scrollY, [0, 300], [1, 1.05])

    return (
        <div ref={containerRef} className="relative h-[100vh] w-full bg-bg-surface overflow-hidden">
            {/* Full Width Hero Image */}
            <motion.div
                style={{ opacity: bgOpacity, filter: `blur(${bgBlur})`, scale: bgScale }}
                className="relative w-full h-full flex items-center justify-center p-0"
            >
                <Image
                    src="/images/back-design.png"
                    alt="Digital Marketing Illustration"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            {/* Hero Content - Text Left, Form Right */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <Container className="h-full flex items-center justify-between gap-12">
                    {/* Left Side text */}
                    <div className="hidden lg:block flex-1 max-w-2xl min-w-[600px] text-left pointer-events-auto pt-20">
                        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl text-text-primary">
                            Let’s grow your brand digitally.
                        </h1>
                        <p className="mt-6 text-lg text-text-secondary max-w-xl">
                            Ready to take your business to the next level? Join the hundreds of companies that trust us with their digital presence.
                        </p>
                    </div>

                    {/* Right Side Form */}
                    <div className="shrink-0 w-[var(--spacing-lg)] pointer-events-auto">
                        <HeroContactForm />
                    </div>
                </Container>
            </div>
        </div>
    )
}
