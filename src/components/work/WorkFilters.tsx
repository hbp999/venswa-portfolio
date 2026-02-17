'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { motion, LayoutGroup } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Container } from '../layout/Container'

type FilterOptions = {
  industries: string[]
  platforms: string[]
  services: string[]
}

type CurrentFilters = {
  industry?: string
  platform?: string
  service?: string
}

export function WorkFilters({
  filterOptions,
  currentFilters,
}: {
  filterOptions: FilterOptions
  currentFilters: CurrentFilters
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isSticky, setIsSticky] = useState(false)

  // Track scroll for sticky state styling
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const updateFilter = (filterType: keyof CurrentFilters, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === currentFilters[filterType]) {
      params.delete(filterType)
    } else {
      params.set(filterType, value)
    }

    router.push(`/work?${params.toString()}`, { scroll: false })
  }

  const clearAllFilters = () => {
    router.push('/work', { scroll: false })
  }

  const hasActiveFilters = Object.values(currentFilters).some(Boolean)

  return (
    <div className={`sticky top-20 z-40 transition-all duration-300 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mb-10 ${isSticky
      ? 'bg-pure-white/80 backdrop-blur-md border-b border-soft-grey/50 shadow-sm'
      : 'bg-transparent'
      }`}>
      <Container className="!px-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <LayoutGroup>
            <div className="flex flex-col sm:flex-row gap-8 overflow-x-auto pb-2 scrollbar-hide mask-fade-right w-full">
              <FilterGroup
                title="Industries"
                options={filterOptions.industries}
                type="industry"
                currentFilters={currentFilters}
                updateFilter={updateFilter}
              />
              <FilterGroup
                title="Services"
                options={filterOptions.services}
                type="service"
                currentFilters={currentFilters}
                updateFilter={updateFilter}
              />
              <FilterGroup
                title="Platforms"
                options={filterOptions.platforms}
                type="platform"
                currentFilters={currentFilters}
                updateFilter={updateFilter}
              />
            </div>
          </LayoutGroup>

          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={clearAllFilters}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors shrink-0"
            >
              <span className="relative">Clear Filters</span>
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </Container>
    </div>
  )
}

function FilterGroup({
  title,
  options,
  type,
  currentFilters,
  updateFilter
}: {
  title: string,
  options: string[],
  type: keyof CurrentFilters,
  currentFilters: CurrentFilters,
  updateFilter: (type: keyof CurrentFilters, value: string) => void
}) {
  if (options.length === 0) return null

  return (
    <div className="flex flex-col gap-3 min-w-fit">
      <span className="text-xs font-semibold text-dark-text/40 uppercase tracking-wider pl-1">{title}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = currentFilters[type] === option

          return (
            <button
              key={option}
              onClick={() => updateFilter(type, option)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                ? 'text-white shadow-lg shadow-royal-blue/20'
                : 'text-dark-text/70 hover:text-royal-blue hover:bg-royal-blue/5'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId={`active-pill-${type}`}
                  className="absolute inset-0 bg-royal-blue rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{option}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
