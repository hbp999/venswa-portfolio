'use client'

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo-removebg-preview.png";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Instagram, Youtube, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-soft-white pt-20 pb-12 mt-20" style={{ marginTop: "0px" }}>
      <Container>
        {/* Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-royal-blue to-emerald-green rounded-2xl p-8 md:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden mb-16"
        >
          <div className="relative z-10 text-center md:text-left">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              Ready to get started?
            </h2>
            <p className="text-white/90 text-base md:text-lg">
              Let&apos;s turn your ideas into digital reality.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Button
              href="/contact"
              variant="secondary"
              className="bg-white text-royal-blue hover:bg-soft-white border-none text-base px-6 py-3 h-auto shadow-md whitespace-nowrap"
            >
              Contact Us
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-center text-center">
            <div className="flex justify-center items-center gap-2 w-full">
              <Link href="/" className="block relative">
                <Image
                  src={logo}
                  alt="Venswa Studios"
                  width={200}
                  height={80}
                  className="h-20 w-auto"
                />
              </Link>
            </div>
            <div className="flex justify-center gap-3 w-full">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Youtube, label: 'YouTube' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  className="bg-white p-2 rounded-full border border-soft-grey text-dark-text/70 hover:text-royal-blue hover:border-royal-blue/30 transition-all shadow-sm"
                  aria-label={social.label}
                  whileHover={{ y: -2 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-dark-text text-lg">Company</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-dark-text/70">
              {['About', 'Contact', 'Careers', 'Team'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-royal-blue transition-colors w-fit block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-dark-text text-lg">Services</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-dark-text/70">
              {['Social Media', 'Content Creation', 'Brand Strategy', 'Ad Campaigns'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-royal-blue transition-colors w-fit block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-dark-text text-lg">Resources</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-dark-text/70">
              {['Blog', 'Privacy Policy', 'Terms of Service', 'Case Studies'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-royal-blue transition-colors w-fit block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-soft-grey/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-dark-text/50">
          <p>© {new Date().getFullYear()} Venswa Studios. All rights reserved.</p>
          <div className="w-full md:w-auto h-1 rounded-full bg-gradient-to-r from-royal-blue/20 to-emerald-green/20" />
        </div>
      </Container>
    </footer>
  );
}
