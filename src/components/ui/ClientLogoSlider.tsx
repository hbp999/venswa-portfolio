'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'

type ClientRow = {
  id: string
  name: string
  logo_url: string | null
  website: string | null
  sort_order: number | null
  is_featured: boolean | null
}

export function ClientLogoSlider({ clients }: { clients: ClientRow[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Memoize clientGroups to prevent recalculation on every render
  const clientGroups = useMemo(() => {
    const groups = []
    for (let i = 0; i < clients.length; i += 6) {
      groups.push(clients.slice(i, i + 6))
    }
    return groups
  }, [clients])

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (clientGroups.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clientGroups.length)
    }, 4000) // Increased to 4s for better readability

    return () => clearInterval(interval)
  }, [clientGroups.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + clientGroups.length) % clientGroups.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % clientGroups.length)
  }

  if (clients.length === 0) return null

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slider Container */}
      <div className="relative h-32 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {clientGroups.map((group, groupIndex) => (
            <div
              key={`group-${groupIndex}`}
              className="w-full shrink-0 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 items-center px-4"
            >
              {group.map((client) => {
                const content = (
                  <div className="group flex items-center justify-center rounded-[16px] bg-soft-white px-4 py-5 transition-transform hover:scale-[1.02]">
                    {client.logo_url ? (
                      <Image
                        src={client.logo_url}
                        alt={client.name}
                        width={160}
                        height={80}
                        className="h-8 w-auto opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    ) : (
                      <span className="text-sm font-medium text-dark-text/70">
                        {client.name}
                      </span>
                    )}
                  </div>
                )

                if (client.website) {
                  return (
                    <a
                      key={client.id}
                      href={client.website}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={client.name}
                    >
                      {content}
                    </a>
                  )
                }

                return <div key={client.id}>{content}</div>
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      {clientGroups.length > 1 && (
        <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-2">
          {clientGroups.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 w-1.5 rounded-full transition-all ${index === currentIndex
                ? 'bg-royal-blue w-6'
                : 'bg-soft-grey/80 hover:bg-soft-grey'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows */}
      {clientGroups.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-pure-white/80 shadow-sm transition-all hover:bg-pure-white hover:shadow-md border border-soft-grey/20"
            aria-label="Previous clients"
          >
            <svg
              className="h-4 w-4 text-dark-text"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-pure-white/80 shadow-sm transition-all hover:bg-pure-white hover:shadow-md border border-soft-grey/20"
            aria-label="Next clients"
          >
            <svg
              className="h-4 w-4 text-dark-text"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}
