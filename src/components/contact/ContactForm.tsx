'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { submitContactForm } from '@/app/actions/contact'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget_range: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const result = await submitContactForm({
        ...formData,
        source_page: 'contact'
      })

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
        })
        setFormData({
          name: '',
          email: '',
          company: '',
          budget_range: '',
          message: ''
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.'
        })
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
            Name <span className="text-accent-primary">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full rounded-[12px] border border-soft-grey bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent-primary/40 focus:ring-2 focus:ring-accent-primary/20 transition-colors"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            Email <span className="text-accent-primary">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-[12px] border border-soft-grey bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent-primary/40 focus:ring-2 focus:ring-accent-primary/20 transition-colors"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-2">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full rounded-[12px] border border-soft-grey bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent-primary/40 focus:ring-2 focus:ring-accent-primary/20 transition-colors"
            placeholder="Company name"
          />
        </div>

        <div>
          <label htmlFor="budget_range" className="block text-sm font-medium text-text-primary mb-2">
            Budget range
          </label>
          <select
            id="budget_range"
            name="budget_range"
            value={formData.budget_range}
            onChange={handleInputChange}
            className="w-full rounded-[12px] border border-soft-grey bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent-primary/40 focus:ring-2 focus:ring-accent-primary/20 transition-colors"
          >
            <option value="">Select budget range</option>
            <option value="under-500">$0 – $500</option>
            <option value="500-1500">$500 – $1,500</option>
            <option value="1500-5000">$1,500 – $5,000</option>
            <option value="5000+">$5,000+</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
            Project description <span className="text-accent-primary">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full min-h-[120px] resize-y rounded-[12px] border border-soft-grey bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent-primary/40 focus:ring-2 focus:ring-accent-primary/20 transition-colors"
            placeholder="What are you trying to achieve? Tell us about your project goals..."
          />
        </div>

        {submitStatus.type && (
          <div
            className={`p-4 rounded-[12px] text-sm ${submitStatus.type === 'success'
              ? 'bg-accent-secondary/10 text-accent-secondary border border-emerald-green/20'
              : 'bg-red-50 text-red-600 border border-red-200'
              }`}
          >
            {submitStatus.message}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
        </Button>
      </form>
    </Card>
  )
}
