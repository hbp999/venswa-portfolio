import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Heart, MessageCircle, Instagram, ChevronLeft, ChevronRight, Video } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { fadeInUp, staggerContainer, staggerItem } from '@/components/providers/MotionProvider';

// Mock data representing recent Instagram Reels
const REELS_DATA = [
    {
        id: '1',
        thumbnail: '/images/reels/reel_1.png',
        views: '12.4K',
        likes: '842',
        comments: '45',
        link: 'https://instagram.com/venswastudios',
        alt: 'Social Media Strategy Breakdown Reel'
    },
    {
        id: '2',
        thumbnail: '/images/reels/reel_2.png',
        views: '8.1K',
        likes: '612',
        comments: '28',
        link: 'https://instagram.com/venswastudios',
        alt: 'Behind the scenes cinematic shoot'
    },
    {
        id: '3',
        thumbnail: '/images/reels/reel_3.png',
        views: '15.2K',
        likes: '1.2K',
        comments: '89',
        link: 'https://instagram.com/venswastudios',
        alt: '3D Motion Graphics Showcase'
    },
    {
        id: '4',
        thumbnail: '/images/reels/reel_4.png',
        views: '9.6K',
        likes: '744',
        comments: '34',
        link: 'https://instagram.com/venswastudios',
        alt: 'Growth Marketing Tips'
    },
    // Duplicating for extra scroll length in demo
    {
        id: '5',
        thumbnail: '/images/reels/reel_1.png',
        views: '5.4K',
        likes: '342',
        comments: '12',
        link: 'https://instagram.com/venswastudios',
        alt: 'Client Success Story'
    },
];

export function InstagramReels() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollState = () => {
        if (!carouselRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setCanScrollLeft(scrollLeft > 0);
        // Add a small 10px buffer for rounding issues and flex gaps at the end
        setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10);
    };

    // Check on mount and listen to scroll events
    useEffect(() => {
        checkScrollState();
        const ref = carouselRef.current;
        if (ref) {
            ref.addEventListener('scroll', checkScrollState);
            window.addEventListener('resize', checkScrollState);
        }
        return () => {
            if (ref) {
                ref.removeEventListener('scroll', checkScrollState);
                window.removeEventListener('resize', checkScrollState);
            }
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;

        // Exact card width + gap ensures we smoothly cross the CSS snap threshold
        const isMobile = window.innerWidth < 640;
        const itemWidth = isMobile ? 260 : 300;
        const gap = isMobile ? 16 : 24;
        const scrollAmount = itemWidth + gap;

        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <Section className="bg-bg-primary overflow-hidden relative border-y border-border-color/30">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex items-end justify-between gap-6 relative z-10"
            >
                <div className="flex-1 max-w-3xl">
                    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl text-text-primary">
                        Follow the process
                    </h2>
                    <p className="mt-3 text-base text-text-secondary sm:text-lg leading-relaxed">
                        Step behind the scenes. We document our creative workflows, marketing frameworks, and agency life directly on Instagram.
                    </p>
                </div>

                <div className="hidden sm:flex items-center gap-4">
                    <Button href="https://instagram.com/venswastudios" variant="secondary" target="_blank" rel="noopener noreferrer">
                        View profile
                    </Button>
                </div>
            </motion.div>

            {/* Carousel Container */}
            <div className="relative mt-10">
                {/* Navigation Buttons */}
                <div className="absolute top-[calc(50%-1rem)] -translate-y-1/2 left-2 sm:left-4 z-20 hidden sm:block">
                    <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); scroll('left'); }}
                        disabled={!canScrollLeft}
                        className={`p-3 rounded-full border border-border-color backdrop-blur-md transition-all shadow-lg ${canScrollLeft ? 'bg-bg-surface/90 hover:bg-bg-primary text-text-primary hover:scale-110' : 'bg-bg-surface/50 text-text-secondary/40 cursor-not-allowed'}`}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                </div>

                <div className="absolute top-[calc(50%-1rem)] -translate-y-1/2 right-2 sm:right-4 z-20 hidden sm:block">
                    <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); scroll('right'); }}
                        disabled={!canScrollRight}
                        className={`p-3 rounded-full border border-border-color backdrop-blur-md transition-all shadow-lg ${canScrollRight ? 'bg-bg-surface/90 hover:bg-bg-primary text-text-primary hover:scale-110' : 'bg-bg-surface/50 text-text-secondary/40 cursor-not-allowed'}`}
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
                >
                    <div
                        ref={carouselRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-4 mix-blend-normal"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {REELS_DATA.map((reel) => (
                            <motion.a
                                key={reel.id}
                                variants={staggerItem}
                                href={reel.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex-none w-[260px] sm:w-[300px] aspect-9/16 rounded-2xl md:rounded-3xl overflow-hidden snap-center group shadow-2xl"
                            >
                                {/* Dark Base */}
                                <div className="absolute inset-0 bg-bg-surface" />

                                {/* Thumbnail */}
                                <Image
                                    src={reel.thumbnail}
                                    alt={reel.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 640px) 260px, 300px"
                                />

                                {/* Heavy Gradient Overlay for Text Readability */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                                {/* Persistent Play Icon */}
                                <div className="absolute top-4 right-4">
                                    <div className="p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                                        <Video className="w-4 h-4 text-white" />
                                    </div>
                                </div>

                                {/* Center Play Button on Hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 scale-90 group-hover:scale-100">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 text-white shadow-2xl">
                                        <Play className="w-6 h-6 ml-1 fill-white" />
                                    </div>
                                </div>

                                {/* Meta Data */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex items-center gap-4 mb-3 opacity-90">
                                        <div className="flex items-center gap-1.5 font-medium">
                                            <Play className="w-4 h-4" />
                                            <span className="text-sm shadow-black drop-shadow-md">{reel.views}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 font-medium">
                                            <Heart className="w-4 h-4" />
                                            <span className="text-sm shadow-black drop-shadow-md">{reel.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 font-medium">
                                            <MessageCircle className="w-4 h-4" />
                                            <span className="text-sm shadow-black drop-shadow-md">{reel.comments}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm font-medium line-clamp-2 text-white/90 group-hover:text-white transition-colors drop-shadow-lg">
                                        {reel.alt}
                                    </p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
