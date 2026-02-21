import React from 'react'
import { cn } from '@/lib/cn'

export interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'soft-white' | 'alternate'
  id?: string
}

export function Section({ 
  children, 
  className, 
  background = 'soft-white',
  id 
}: SectionProps) {
  const backgroundClasses = {
    'white': 'bg-bg-primary',
    'soft-white': 'bg-bg-surface',
    'alternate': 'bg-alternate'
  }

  return (
    <section 
      id={id}
      className={cn(
        'w-full py-16 md:py-24',
        backgroundClasses[background],
        className
      )}
    >
      <div className="container mx-auto px-4 max-w-[1280px]">
        {children}
      </div>
    </section>
  )
}
