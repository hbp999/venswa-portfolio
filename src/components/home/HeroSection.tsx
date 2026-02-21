'use client'

import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { HeroContactForm } from './HeroContactForm'
import { FluidBackground } from '@/components/ui/FluidBackground'
import { ParallaxWrapper, MobileParallaxFallback } from '@/components/providers/ParallaxWrapper'

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-primary pt-24 pb-16">
            {/* Interactive Antigravity Mouse Background */}
            <FluidBackground />

            {/* Hero Content - Text Left, Form Right */}
            <div className="container relative z-10 flex flex-col items-center justify-center grow">
                <Container className="grid lg:grid-cols-2 gap-12 items-center py-24 lg:py-0">
                    {/* Left Side text */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-20">
                        {/* Parallax text floats up slower */}
                        <ParallaxWrapper offset={30} className="w-full">
                            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-text-primary text-balance">
                                We Turn Brands Into
                                Digital Experiences
                            </h1>
                            <p className="mt-6 text-lg text-text-secondary">
                                Ready to take your business to the next level? Join the hundreds of companies that trust us with their digital presence.
                            </p>
                        </ParallaxWrapper>

                        {/* Mobile view needs identical layout but without parallax calculation */}
                        <MobileParallaxFallback className="w-full">
                            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-text-primary text-balance">
                                We Turn Brands Into
                                Digital Experiences
                            </h1>
                            <p className="mt-6 text-lg text-text-secondary">
                                Ready to take your business to the next level? Join the hundreds of companies that trust us with their digital presence.
                            </p>
                        </MobileParallaxFallback>
                    </div>

                    {/* Right Side Form */}
                    <div className="w-full flex justify-center lg:justify-end relative z-20">
                        {/* The form floats up slightly faster than the text to create 3D offset */}
                        <ParallaxWrapper offset={60} className="w-full max-w-md lg:max-w-[500px]">
                            <HeroContactForm />
                        </ParallaxWrapper>
                        <MobileParallaxFallback className="w-full max-w-md lg:max-w-[500px]">
                            <HeroContactForm />
                        </MobileParallaxFallback>
                    </div>
                </Container>
            </div>
        </section>
    )
}