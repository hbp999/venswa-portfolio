'use client'

import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { HeroContactForm } from './HeroContactForm'

export function HeroSection() {
    return (
        <section className="relative h-[100vh] w-full bg-soft-white overflow-hidden">
            {/* Full Width Hero Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/images/back-design.png"
                    alt="Digital Marketing Illustration"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Hero Content - Text Left, Form Right */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <Container className="h-full flex items-center justify-between gap-10">
                    {/* Left Side text */}
                    <div className="hidden lg:block flex-1 max-w-2xl min-w-[800px] text-center pointer-events-auto pt-20">
                        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl text-dark-text">
                            We Turn Brands Into
                            Digital Experiences
                        </h1>
                        <p className="font-display mt-6 text-lg text-dark-text ">
                            Ready to take your business to the next level? Join the hundreds of companies that trust us with their digital presence.
                        </p>
                    </div>

                    {/* Right Side Form */}
                    <div className="shrink-0 w-[var(--spacing-lg)] pointer-events-auto">
                        <HeroContactForm />
                    </div>
                </Container>
            </div>
        </section>
    )
}