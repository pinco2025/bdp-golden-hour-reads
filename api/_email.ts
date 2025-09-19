import sgMail from '@sendgrid/mail'

const apiKey = process.env.SENDGRID_API_KEY as string
const fromEmail = process.env.SENDGRID_FROM_EMAIL as string
const fromName = (process.env.SENDGRID_FROM_NAME as string) || 'BDP Publications'

if (!apiKey || !fromEmail) {
  console.warn('[serverless] Missing SendGrid env vars')
}

if (apiKey) {
  sgMail.setApiKey(apiKey)
}

export const emailService = {
  async send(options: { to: string; subject: string; html: string; text?: string }) {
    const msg = {
      to: options.to,
      from: { email: fromEmail, name: fromName },
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, '')
    }
    try {
      await sgMail.send(msg)
      return { success: true }
    } catch (error: any) {
      console.error('[serverless] SendGrid error', error?.response?.body || error)
      return { success: false, error }
    }
  },

  async sendWelcomeEmail(data: { name?: string; email: string; profileCompleteUrl: string }) {
    const subject = 'Welcome to BDP Publications'
    const html = `
      <h1>Welcome${data.name ? `, ${data.name}` : ''}!</h1>
      <p>Thanks for subscribing.</p>
      <p><a href="${data.profileCompleteUrl}">Complete your profile</a></p>
    `
    return this.send({ to: data.email, subject, html })
  },

  async sendThankYouEmail(data: { name?: string; email: string; interests?: string[] }) {
    const subject = 'Thanks for completing your profile'
    const html = `
      <h1>Thank you${data.name ? `, ${data.name}` : ''}!</h1>
      <p>We appreciate you completing your profile.</p>
    `
    return this.send({ to: data.email, subject, html })
  },
}


