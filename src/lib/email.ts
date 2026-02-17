import { ContactFormData } from '@/app/actions/contact'

// Email notification service
export async function sendLeadNotification(leadData: ContactFormData) {
  try {
    // For now, we'll log the lead data
    // In production, you would integrate with an email service like Resend, SendGrid, or AWS SES
    
    console.log('📧 New Lead Received:', {
      name: leadData.name,
      email: leadData.email,
      company: leadData.company,
      budget: leadData.budget_range,
      message: leadData.message,
      source: leadData.source_page,
      timestamp: new Date().toISOString()
    })

    // TODO: Replace with actual email service integration
    // Example with Resend (would require npm install resend):
    /*
    import { Resend } from 'resend'
    
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'noreply@venswa.com',
      to: ['hello@venswa.com'],
      subject: `New Lead: ${leadData.name} from ${leadData.company || 'No Company'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${leadData.name}</p>
        <p><strong>Email:</strong> ${leadData.email}</p>
        <p><strong>Company:</strong> ${leadData.company || 'Not provided'}</p>
        <p><strong>Budget Range:</strong> ${leadData.budget_range || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${leadData.message}</p>
        <p><strong>Source:</strong> ${leadData.source_page}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `
    })
    */

    return { success: true }
  } catch (error) {
    console.error('Email notification failed:', error)
    return { success: false, error: 'Failed to send email notification' }
  }
}

// Simple spam detection
export function detectSpam(formData: ContactFormData): { isSpam: boolean; reasons: string[] } {
  const reasons: string[] = []
  const { name, email, message } = formData

  // Check for common spam indicators
  if (name.toLowerCase().includes('test') || email.toLowerCase().includes('test')) {
    reasons.push('Contains test keywords')
  }

  if (message.toLowerCase().includes('click here') || message.toLowerCase().includes('buy now')) {
    reasons.push('Contains suspicious marketing language')
  }

  // Check for excessive links
  const linkCount = (message.match(/https?:\/\//g) || []).length
  if (linkCount > 3) {
    reasons.push('Contains excessive links')
  }

  // Check for all caps
  if (message === message.toUpperCase() && message.length > 20) {
    reasons.push('Excessive capitalization')
  }

  return {
    isSpam: reasons.length > 0,
    reasons
  }
}
