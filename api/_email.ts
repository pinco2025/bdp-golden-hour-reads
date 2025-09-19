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
    const subject = '🎉 Welcome to BDP Publications - Your Journey Begins!'
    const greeting = data.name ? `Hi ${data.name}` : 'Hello there'
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to BDP Publications</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #2e7d7a, #d4b036); padding: 40px 20px; text-align: center; color: white; }
          .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
          .tagline { opacity: 0.9; font-size: 16px; }
          .content { padding: 40px 30px; }
          .welcome-text { font-size: 18px; color: #374151; margin-bottom: 25px; }
          .cta-button { display: inline-block; background: #2e7d7a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .social-section { background: #f9fafb; padding: 30px; margin: 30px 0; border-radius: 8px; text-align: center; }
          .social-links { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; }
          .social-link { display: inline-block; background: white; padding: 12px; border-radius: 50%; text-decoration: none; color: #374151; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .footer { color: #6b7280; font-size: 14px; text-align: center; padding: 20px; }
          @media (max-width: 600px) { .container { margin: 10px; } .content, .social-section { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">📚 BDP Publications</div>
            <div class="tagline">Beyond Digital Paradigms</div>
          </div>
          <div class="content">
            <h1 style="color: #2e7d7a; margin-bottom: 20px;">${greeting}! 🎉</h1>
            <div class="welcome-text">
              Welcome to the BDP Publications community! We're thrilled to have you.
            </div>
            <div style="text-align: center;">
              <a href="${data.profileCompleteUrl}" class="cta-button">📝 Complete Your Profile (Optional)</a>
              <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">Help us personalize your experience</p>
            </div>
            <div class="social-section">
              <h3 style="margin-bottom: 20px; color: #374151;">🌟 Connect with us</h3>
              <div class="social-links">
                <a href="https://www.facebook.com/profile.php?id=61570296240601" class="social-link">📘</a>
                <a href="https://instagram.com/bdppublications" class="social-link">📸</a>
                <a href="https://in.pinterest.com/bdppublications/" class="social-link">📌</a>
                <a href="https://bdppublications.gumroad.com/" class="social-link">🛍️</a>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>You're receiving this because you subscribed to BDP Publications.</p>
          </div>
        </div>
      </body>
      </html>
    `
    return this.send({ to: data.email, subject, html })
  },

  async sendThankYouEmail(data: { name?: string; email: string; interests?: string[] }) {
    const subject = 'Thanks for completing your profile'
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #10b981, #d4b036); padding: 30px 20px; text-align: center; color: white; }
          .content { padding: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Thank You${data.name ? `, ${data.name}` : ''}!</h1>
            <p>Your profile is complete</p>
          </div>
          <div class="content">
            <p>We appreciate you completing your profile.</p>
          </div>
        </div>
      </body>
      </html>
    `
    return this.send({ to: data.email, subject, html })
  },
}


