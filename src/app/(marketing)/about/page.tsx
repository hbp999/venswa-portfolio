import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default function AboutPage() {
    return (
        <>
            {/* Hero / About the Agency */}
            <Section className="bg-soft-white pt-32 pb-16">
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="font-display text-4xl font-bold tracking-tight text-dark-text sm:text-6xl mb-6">
                            About Venswa Studio
                        </h1>
                        <p className="text-xl leading-relaxed text-dark-text/70 mb-8">
                            Venswa Studio is a digital marketing agency helping businesses grow through strategy, creativity, and consistent online execution.
                        </p>
                        <p className="text-2xl font-semibold text-royal-blue">
                            We don’t just post content — we build brands digitally.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* What We've Done */}
            <Section className="bg-pure-white">
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
                            <Card key={index} className="p-6 h-full bg-soft-white/50 border-none">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-royal-blue shrink-0" />
                                    <p className="font-medium text-dark-text">{item}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Why Choose Venswa */}
            <Section className="bg-soft-white">
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
                                        <div className="h-6 w-6 rounded-full bg-emerald-green/10 flex items-center justify-center text-emerald-green">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-lg text-dark-text/80">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            {/* Abstract visual or image could go here */}
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-royal-blue/5 to-emerald-green/5 flex items-center justify-center">
                                <div className="text-royal-blue font-display text-9xl font-bold opacity-10">V</div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Founders */}
            <Section className="bg-pure-white">
                <Container>
                    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-12 text-center">
                        Meet the Founders
                    </h2>

                    {/* Unified Founder Card */}
                    <div className="max-w-5xl mx-auto">
                        <Card className="overflow-hidden bg-white border-royal-blue/10 shadow-xl rounded-3xl">
                            {/* Shared Image Area */}
                            <div className="relative h-96 w-full bg-gray-100">
                                <Image
                                    src="/images/founders/founder-dummy.png"
                                    alt="Charan Naraharasetty and Sravan Nagulla"
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />

                                {/* Gradient Overlay for merging */}
                                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
                            </div>

                            {/* Content Area */}
                            <div className="px-8 pb-12 pt-4 md:px-12">
                                <div className="grid md:grid-cols-2 gap-12 relative z-10">
                                    {/* Founder 1: Charan */}
                                    <div className="text-center md:text-left">
                                        <h3 className="font-display text-2xl font-bold mb-1 text-dark-text">Charan Naraharasetty</h3>
                                        <p className="text-royal-blue font-medium mb-4">Founder</p>
                                        <p className="text-dark-text/70 mb-6 leading-relaxed">
                                            Strategic visionary focused on scaling businesses through data-driven digital marketing and brand development. With expertise in market analysis and growth strategies, Charan leads the agency's mission to deliver measurable results for clients.
                                        </p>
                                        <a href="tel:9491024999" className="inline-flex items-center gap-2 text-dark-text/70 hover:text-royal-blue transition-colors font-medium justify-center md:justify-start">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            9491024999
                                        </a>
                                    </div>

                                    {/* Founder 2: Sravan */}
                                    <div className="text-center md:text-left">
                                        <h3 className="font-display text-2xl font-bold mb-1 text-dark-text">Sravan Nagulla</h3>
                                        <p className="text-royal-blue font-medium mb-4">Co-Founder</p>
                                        <p className="text-dark-text/70 mb-6 leading-relaxed">
                                            Creative director and operations lead ensuring every project meets the highest standards of quality and innovation. Sravan combines design excellence with operational efficiency to bring client visions to life seamlessly.
                                        </p>
                                        <a href="tel:9966567879" className="inline-flex items-center gap-2 text-dark-text/70 hover:text-royal-blue transition-colors font-medium justify-center md:justify-start">
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
