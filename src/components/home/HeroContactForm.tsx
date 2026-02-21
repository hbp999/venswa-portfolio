'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { submitContactForm } from '@/app/actions/contact'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, AlertCircle } from 'lucide-react'

export function HeroContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null
        message: string
    }>({ type: null, message: '' })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus({ type: null, message: '' })

        try {
            // Append phone to message since it's not in the base schema yet
            const finalMessage = `Phone: ${formData.phone}\n\n${formData.message}`

            const result = await submitContactForm({
                name: formData.name,
                email: formData.email,
                message: finalMessage,
                source_page: 'home-hero'
            })

            if (result.success) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Received! We will contact you shortly.'
                })
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    message: ''
                })
                // Clear success message after 3 seconds
                setTimeout(() => setSubmitStatus({ type: null, message: '' }), 3000)
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: result.error || 'Something went wrong.'
                })
            }
        } catch {
            setSubmitStatus({
                type: 'error',
                message: 'Network error.'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full p-8 rounded-2xl bg-bg-surface/80 backdrop-blur-xl border border-border-color/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
            <div className="mb-6 text-center">
                <h3 className="text-2xl font-display font-bold text-text-primary mb-2">Get Started</h3>
                <p className="text-text-secondary text-sm">Tell us about your project.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <input
                            name="name"
                            type="text"
                            required
                            placeholder="Name"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-bg-primary/50 border border-border-color text-text-primary placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-sm transition-all hover:bg-bg-primary"
                        />
                    </div>
                    <div className="space-y-1">
                        <input
                            name="phone"
                            type="tel"
                            required
                            placeholder="Phone"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-bg-primary/50 border border-border-color text-text-primary placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-sm transition-all hover:bg-bg-primary"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-bg-primary/50 border border-border-color text-text-primary placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-sm transition-all hover:bg-bg-primary"
                    />
                </div>

                <div className="space-y-1">
                    <textarea
                        name="message"
                        required
                        rows={3}
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-bg-primary/50 border border-border-color text-text-primary placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-sm resize-none transition-all hover:bg-bg-primary"
                    />
                </div>

                <AnimatePresence mode="wait">
                    {submitStatus.type ? (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`rounded-lg px-4 py-3 text-sm flex items-center gap-2 ${submitStatus.type === 'success'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                                }`}
                        >
                            {submitStatus.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            {submitStatus.message}
                        </motion.div>
                    ) : (
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                            className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white border-none shadow-lg shadow-accent-primary/20 py-4 text-base font-bold"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                'Submit Request'
                            )}
                        </Button>
                    )}
                </AnimatePresence>
            </form>
        </motion.div>
    )
}
