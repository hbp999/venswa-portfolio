'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Section } from '@/components/layout/Section'

const clients = [
  { name: "Mandava’s Bhojanam", logo: "/images/client logos/cleanwheels.jpeg" }, // Assuming cleanwheels corresponds to one of them or is new
  { name: "STHIRA Lab Grown Diamonds", logo: "/images/client logos/sthira.png" },
  { name: "Ikas Motif", logo: "/images/client logos/ikas.jpeg" },
  { name: "Studio Ikas", logo: "/images/client logos/ikas2.jpeg" },
  { name: "Trust Hospital", logo: "/images/client logos/trusthospital.jpeg" },
  { name: "Stunnerz", logo: "/images/client logos/stunnerz.jpeg" },
  { name: "Neo Screens", logo: "/images/client logos/neoscreen.jpeg" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const ClientLogos = () => (
  <Section className="py-12 border-y border-soft-grey/70 bg-bg-primary">
    <motion.div variants={fadeUp} className="max-w-7xl mx-auto">
      <p className="text-center text-sm font-medium text-text-secondary mb-8 uppercase tracking-widest">
        Trusted by leading brands
      </p>
    </motion.div>
    <div className="overflow-hidden">
      <div className="flex animate-scroll-left w-max items-center">
        {[...clients, ...clients].map((client, i) => (
          <div
            key={i}
            className="shrink-0 mx-8 md:mx-12 select-none relative h-20 w-40 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
          >
            <Image
              src={client.logo}
              alt={client.name}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  </Section>
);
