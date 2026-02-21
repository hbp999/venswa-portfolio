'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ServiceVisualProps {
  serviceType: string
  className?: string
}

export function ServiceVisual({ serviceType, className = "" }: ServiceVisualProps) {
  const prefersReducedMotion = useReducedMotion()

  // Different gradient combinations based on service type
  const getGradientForService = (type: string) => {
    const gradients: Record<string, string> = {
      'Social Media Management': 'bg-[radial-gradient(circle_at_20%_30%,rgba(46,76,184,0.25),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(31,181,122,0.20),transparent_55%)]',
      'Content Creation': 'bg-[radial-gradient(circle_at_30%_20%,rgba(212,166,63,0.25),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(46,76,184,0.20),transparent_50%)]',
      'Ad Campaigns': 'bg-[radial-gradient(circle_at_25%_25%,rgba(31,181,122,0.25),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(212,166,63,0.20),transparent_45%)]',
      'Brand Strategy': 'bg-[radial-gradient(circle_at_40%_30%,rgba(46,76,184,0.22),transparent_50%),radial-gradient(circle_at_60%_70%,rgba(212,166,63,0.22),transparent_50%)]',
      'Video Production': 'bg-[radial-gradient(circle_at_35%_35%,rgba(31,181,122,0.23),transparent_55%),radial-gradient(circle_at_65%_65%,rgba(46,76,184,0.23),transparent_45%)]',
      'Influencer Marketing': 'bg-[radial-gradient(circle_at_30%_40%,rgba(212,166,63,0.24),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(31,181,122,0.24),transparent_50%)]'
    }
    return gradients[type] || gradients['Social Media Management']
  }

  if (prefersReducedMotion) {
    return (
      <div className={`aspect-4/3 w-full rounded-[20px] ${getGradientForService(serviceType)} ${className}`} />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        ease: "easeInOut"
      }}
      className={`aspect-4/3 w-full rounded-[20px] ${getGradientForService(serviceType)} ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Animated shapes based on service type */}
        {serviceType.includes('Social') && (
          <>
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-24 h-24 rounded-full border-2 border-accent-primary/30"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1.2, 1, 1.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-16 h-16 rounded-full border-2 border-emerald-green/40"
            />
          </>
        )}

        {serviceType.includes('Content') && (
          <>
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-20 h-20 rounded-lg bg-metallic-gold/20"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute w-16 h-16 rounded-lg bg-accent-primary/20"
            />
          </>
        )}

        {serviceType.includes('Ad') && (
          <>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-28 h-28 rounded-full bg-accent-secondary/20"
            />
            <motion.div
              animate={{
                scale: [1.3, 1, 1.3],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-20 h-20 rounded-full bg-metallic-gold/20"
            />
          </>
        )}

        {serviceType.includes('Strategy') && (
          <>
            <motion.div
              animate={{
                rotate: [0, 45, -45, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 bg-accent-primary/20"
              style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
            />
          </>
        )}

        {serviceType.includes('Video') && (
          <>
            <motion.div
              animate={{
                rotate: [0, 180, 360],
                borderRadius: ['20%', '50%', '20%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-32 h-20 bg-accent-secondary/20"
            />
          </>
        )}

        {serviceType.includes('Influencer') && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
                className="absolute w-12 h-12 rounded-full bg-metallic-gold/20"
                style={{
                  top: `${30 + i * 20}%`,
                  left: `${25 + i * 25}%`
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  )
}
