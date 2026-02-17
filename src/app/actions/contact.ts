'use server'

import { z } from 'zod'
import { supabase } from '@/lib/supabaseClient'
import { sendLeadNotification, detectSpam } from '@/lib/email'

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  budget_range: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  source_page: z.string().default('contact')
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate form data
    const validatedFields = contactFormSchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.issues[0]?.message || 'Validation failed'
      }
    }

    const { name, email, company, budget_range, message, source_page } = validatedFields.data

    // Spam detection
    const spamCheck = detectSpam(validatedFields.data)
    if (spamCheck.isSpam) {
      console.log('Spam detected:', spamCheck.reasons)
      return {
        success: false,
        error: 'Your message appears to be spam. Please contact us directly.'
      }
    }

    // Insert lead into Supabase
    const { error } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        company,
        budget_range,
        message,
        source_page,
        status: 'new',
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('Supabase error:', error)
      return {
        success: false,
        error: 'Failed to save your message. Please try again.'
      }
    }

    // Send email notification
    const emailResult = await sendLeadNotification(validatedFields.data)
    if (!emailResult.success) {
      console.error('Email notification failed:', emailResult.error)
      // Still return success to user, but log the error
    }

    return {
      success: true,
      message: 'Message sent successfully!'
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}
