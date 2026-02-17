import React from 'react'
import { cn } from '@/lib/cn'

export interface HeadingProps {
  children: React.ReactNode
  className?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export function Heading({ children, className, level = 2 }: HeadingProps) {
  const baseClasses = 'font-display font-semibold text-dark-text'
  
  const sizeClasses = {
    1: 'text-4xl md:text-6xl lg:text-7xl leading-tight',
    2: 'text-3xl md:text-5xl lg:text-6xl leading-tight',
    3: 'text-2xl md:text-4xl lg:text-5xl leading-tight',
    4: 'text-xl md:text-2xl lg:text-3xl leading-tight',
    5: 'text-lg md:text-xl lg:text-2xl leading-tight',
    6: 'text-base md:text-lg lg:text-xl leading-tight'
  }

  if (level === 1) {
    return <h1 className={cn(baseClasses, sizeClasses[level], className)}>{children}</h1>
  } else if (level === 2) {
    return <h2 className={cn(baseClasses, sizeClasses[level], className)}>{children}</h2>
  } else if (level === 3) {
    return <h3 className={cn(baseClasses, sizeClasses[level], className)}>{children}</h3>
  } else if (level === 4) {
    return <h4 className={cn(baseClasses, sizeClasses[level], className)}>{children}</h4>
  } else if (level === 5) {
    return <h5 className={cn(baseClasses, sizeClasses[level], className)}>{children}</h5>
  } else {
    return <h6 className={cn(baseClasses, sizeClasses[level], className)}>{children}</h6>
  }
}

export interface SubheadingProps {
  children: React.ReactNode
  className?: string
}

export function Subheading({ children, className }: SubheadingProps) {
  return (
    <p className={cn('text-lg md:text-xl lg:text-2xl font-body text-dark-text/80 leading-relaxed', className)}>
      {children}
    </p>
  )
}

export interface BodyProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Body({ children, className, size = 'md' }: BodyProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <p className={cn('font-body text-dark-text/70 leading-relaxed', sizeClasses[size], className)}>
      {children}
    </p>
  )
}
