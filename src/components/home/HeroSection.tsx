'use client'

import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { HeroContactForm } from './HeroContactForm'

export function HeroSection() {
    return (
        <section className="relative min-h-[100vh] w-full bg-soft-white overflow-hidden flex flex-col">
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
            <div className="relative z-20 flex-grow flex flex-col justify-center">
                <Container className="grid lg:grid-cols-2 gap-12 items-center py-24 lg:py-0">
                    {/* Left Side text */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-dark-text text-balance">
                            We Turn Brands Into
                            Digital Experiences
                        </h1>
                        <p className="mt-6 text-lg text-dark-text">
                            Ready to take your business to the next level? Join the hundreds of companies that trust us with their digital presence.
                        </p>
                    </div>

                    {/* Right Side Form */}
                    <div className="w-full flex justify-center lg:justify-end">
                        <div className="w-full max-w-md lg:max-w-[500px]">
                            <HeroContactForm />
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    )
}