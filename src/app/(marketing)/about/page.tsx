import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { AboutHero } from "@/components/about/AboutHero";

export default function AboutPage() {
    return (
        <>
            {/* Hero / About the Agency */}
            <AboutHero />

            {/* What We've Done */}
            <Section className="bg-bg-primary">
                <Container>
                    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-12">
                        What We’ve Done
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            "Built social media pages from scratch",
                            "Increased reach and engagement",
                            "Created high-quality reels and designs",
                            "Managed complete social media presence",
                            "Developed consistent brand identities",
                            "Improved customer trust and walk-ins"
                        ].map((item, index) => (
                            <Card key={index} className="p-6 h-full bg-bg-surface/50 border-none">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-accent-primary shrink-0" />
                                    <p className="font-medium text-text-primary">{item}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Why Choose Venswa */}
            <Section className="bg-bg-surface">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div>
                            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
                                Why Choose Venswa
                            </h2>
                            <div className="space-y-6">
                                {[
                                    "Creative + strategy-driven approach",
                                    "Strong local market understanding",
                                    "Transparent workflow",
                                    "Founder-led execution",
                                    "Focus on real growth"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="h-6 w-6 rounded-full bg-accent-secondary/10 flex items-center justify-center text-accent-secondary">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-lg text-text-secondary">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-4/3 overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
                            <Image
                                src="/images/4-3image.png"
                                alt="Why Choose Venswa"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Founders */}
            <Section className="bg-bg-primary">
                <Container>
                    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-12 text-center">
                        Meet the Founders
                    </h2>

                    {/* Unified Founder Card */}
                    <div className="max-w-5xl mx-auto">
                        <Card className="overflow-hidden bg-bg-primary border-border-color/60 shadow-[0_10px_40px_rgba(0,0,0,0.2)] p-0 rounded-3xl">
                            {/* Shared Image Area */}
                            <div className="relative h-96 w-full bg-bg-surface">
                                <Image
                                    src="/images/founders/founder-dummy.png"
                                    alt="Charan Naraharasetty and Sravan Nagulla"
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />

                                {/* Gradient Overlay for merging */}
                                <div className="absolute inset-0 bg-linear-to-t from-bg-primary via-bg-primary/50 to-transparent opacity-80" />
                            </div>

                            {/* Content Area */}
                            <div className="px-8 pb-12 pt-4 md:px-12">
                                <div className="grid md:grid-cols-2 gap-12 relative z-10">
                                    {/* Founder 1: Charan */}
                                    <div className="text-center md:text-left">
                                        <h3 className="font-display text-2xl font-bold mb-1 text-text-primary">Charan Naraharasetty</h3>
                                        <p className="text-accent-primary font-medium mb-4">Founder</p>
                                        <p className="text-text-secondary mb-6 leading-relaxed">
                                            Strategic visionary focused on scaling businesses through data-driven digital marketing and brand development. With expertise in market analysis and growth strategies, Charan leads the agency's mission to deliver measurable results for clients.
                                        </p>
                                        <a href="tel:9491024999" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors font-medium justify-center md:justify-start">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            9491024999
                                        </a>
                                    </div>

                                    {/* Founder 2: Sravan */}
                                    <div className="text-center md:text-left">
                                        <h3 className="font-display text-2xl font-bold mb-1 text-text-primary">Sravan Nagulla</h3>
                                        <p className="text-accent-primary font-medium mb-4">Co-Founder</p>
                                        <p className="text-text-secondary mb-6 leading-relaxed">
                                            Creative director and operations lead ensuring every project meets the highest standards of quality and innovation. Sravan combines design excellence with operational efficiency to bring client visions to life seamlessly.
                                        </p>
                                        <a href="tel:9966567879" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors font-medium justify-center md:justify-start">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            9966567879
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Container>
            </Section>
        </>
    );
}
