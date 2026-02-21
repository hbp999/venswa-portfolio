'use client'

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo-removebg-preview.png";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Our Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { scrollY } = useScroll()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }

    if (latest > (pathname === '/' ? 280 : 10)) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${scrolled
        ? 'bg-bg-primary/80 backdrop-blur-md border-b border-border-color/50'
        : 'bg-transparent'
        }`}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="relative z-50">
          <Image
            src={logo}
            alt="Venswa Studios"
            width={150}
            height={60}
            className="h-15 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <div className="flex items-center gap-1 rounded-full bg-white/5 backdrop-blur-2xl px-2 py-1.5 border border-white/10 ring-1 ring-white/10 shadow-2xl overflow-hidden">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.href}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`relative block px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-full ${isActive ? 'text-white' : 'text-text-secondary hover:text-text-primary'
                      }`}
                  >
                    {/* Hover state glass effect */}
                    {!isActive && (
                      <motion.div
                        variants={{
                          hover: { opacity: 1, scale: 1 },
                          tap: { scale: 0.98, opacity: 0.8 },
                        }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 bg-text-primary/5 backdrop-blur-md rounded-full z-0 border border-text-primary/10"
                      />
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="activeNavDesktop"
                        className="absolute inset-0 bg-linear-to-br from-accent-primary to-accent-secondary rounded-full shadow-[0_4px_20px_rgba(99,102,241,0.4)] backdrop-blur-sm"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <motion.span
                      className="relative z-10"
                      variants={{
                        hover: { y: 0 },
                      }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button href="/contact" variant="primary" className="hidden sm:inline-flex">
            Start a Project
          </Button>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-white origin-center rounded-full"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-white origin-center rounded-full"
            />
          </button>
        </div>
      </Container>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-bg-surface md:hidden flex flex-col pt-24 pb-10 px-6"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-3xl font-display font-bold tracking-tight ${isActive ? 'text-accent-primary' : 'text-text-primary'
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex justify-center"
            >
              <ThemeToggle />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <Button
                href="/contact"
                variant="primary"
                className="w-full justify-center text-lg py-6"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start a Project
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

