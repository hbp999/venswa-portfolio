"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    // Avoid hydration mismatch by only rendering after mount
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10 rounded-full border border-border-color/30"></div>;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group overflow-hidden"
            aria-label="Toggle theme"
        >
            <div className="relative z-10 text-white group-hover:scale-110 transition-transform duration-300">
                {isDark ? (
                    <motion.div
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Sun className="h-5 w-5" />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Moon className="h-5 w-5 text-text-primary group-hover:text-accent-primary" />
                    </motion.div>
                )}
            </div>

            {/* Light theme hover overlay adjustments since button operates on the nav which may be dark/light depending on theme */}
            {!isDark && (
                <div className="absolute inset-0 bg-black/5 object-cover z-0" />
            )}
        </button>
    );
}
