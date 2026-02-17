'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <Container className="flex h-[60vh] flex-col items-center justify-center text-center">
            <h2 className="font-display text-2xl font-semibold text-dark-text">
                Something went wrong!
            </h2>
            <p className="mt-2 text-dark-text/70 max-w-md">
                We apologize for the inconvenience. Please try again or contact support if the problem persists.
            </p>
            <div className="mt-6 flex gap-4">
                <Button onClick={() => reset()} variant="primary">
                    Try again
                </Button>
                <Button href="/" variant="secondary">
                    Go Home
                </Button>
            </div>
        </Container>
    )
}
