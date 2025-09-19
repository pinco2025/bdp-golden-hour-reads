import sgMail from '@sendgrid/mail'

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export interface WelcomeEmailData {
  name?: string
  email: string
  profileCompleteUrl: string
}

export interface ProfileReminderEmailData {
  name?: string
  email: string
  profileCompleteUrl: string
  daysWaiting: number
}

// Email service
export const emailService = {
  // Send any email
  async send(options: EmailOptions) {
    const msg = {
      to: options.to,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: process.env.SENDGRID_FROM_NAME || 'BDP Publications'
      },
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, '') // Strip HTML for text version
    }

    try {
      await sgMail.send(msg)
      console.log(`✅ Email sent successfully to ${options.to}`)
      return { success: true }
    } catch (error) {
      console.error('❌ SendGrid Error:', error)
      return { success: false, error }
    }
  },

  // Send welcome email
  async sendWelcomeEmail(data: WelcomeEmailData) {
    const subject = '🎉 Welcome to BDP Publications - Your Journey Begins!'
    const html = generateWelcomeEmailHTML(data)

    return this.send({
      to: data.email,
      subject,
      html
    })
  },

  // Send profile completion reminder
  async sendProfileReminder(data: ProfileReminderEmailData) {
    const subject = '📝 Complete your BDP Profile - Personalize your experience!'
    const html = generateProfileReminderHTML(data)

    return this.send({
      to: data.email,
      subject,
      html
    })
  },

  // Send profile completion thank you
  async sendThankYouEmail(data: { name?: string; email: string; interests: string[] }) {
    const subject = '✨ Thank you for completing your profile!'
    const html = generateThankYouEmailHTML(data)

    return this.send({
      to: data.email,
      subject,
      html
    })
  }
}

// Welcome Email HTML Template
function generateWelcomeEmailHTML(data: WelcomeEmailData): string {
  const greeting = data.name ? `Hi ${data.name}` : 'Hello there'
  
  return `
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
            Welcome to the BDP Publications community! We're thrilled to have you join thousands of readers who are transforming their lives through evidence-based insights and paradigm-shifting knowledge.
          </div>
          
          <div class="welcome-text">
            At BDP Publications, we craft more than just books – we architect blueprints for transformed lives. From optimizing sleep naturally to building sustainable wealth, from understanding crypto dynamics to planning secure retirements.
          </div>
          
          <div style="text-align: center;">
            <a href="${data.profileCompleteUrl}" class="cta-button">
              📝 Complete Your Profile (Optional)
            </a>
            <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">
              Help us personalize your experience by sharing your interests
            </p>
          </div>
          
          <div class="social-section">
            <h3 style="margin-bottom: 20px; color: #374151;">🌟 Connect with us</h3>
            <div class="social-links">
              <a href="https://www.facebook.com/profile.php?id=61570296240601" class="social-link">📘 Facebook</a>
              <a href="https://instagram.com/bdppublications" class="social-link">📸 Instagram</a>
              <a href="https://in.pinterest.com/bdppublications/" class="social-link">📌 Pinterest</a>
              <a href="https://bdppublications.gumroad.com/" class="social-link">🛍️ Shop</a>
            </div>
            <p style="margin-top: 15px; font-size: 14px; color: #6b7280;">
              Follow us for exclusive content, early book releases, and wellness tips!
            </p>
          </div>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2e7d7a;">
            <h4 style="margin-top: 0; color: #2e7d7a;">🚀 What's Next?</h4>
            <ul style="margin-bottom: 0; color: #374151;">
              <li>Explore our <a href="https://bdppublications.gumroad.com/" style="color: #2e7d7a;">complete catalog</a> of transformative guides</li>
              <li>Complete your profile for personalized book recommendations</li>
              <li>Join our social media community for exclusive content</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p>You're receiving this because you subscribed to BDP Publications.</p>
          <p>📧 Questions? Just reply to this email - we read every message!</p>
          <p style="margin-top: 20px;">
            <strong>BDP Publications</strong><br>
            Transforming lives through evidence-based knowledge
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Profile Reminder Email HTML Template
function generateProfileReminderHTML(data: ProfileReminderEmailData): string {
  const greeting = data.name ? `Hi ${data.name}` : 'Hello'
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Complete Your BDP Profile</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #d4b036, #2e7d7a); padding: 30px 20px; text-align: center; color: white; }
        .content { padding: 30px; }
        .cta-button { display: inline-block; background: #d4b036; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .benefits { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { color: #6b7280; font-size: 14px; text-align: center; padding: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📝 Complete Your Profile</h1>
          <p>Get personalized book recommendations!</p>
        </div>
        
        <div class="content">
          <p>${greeting}! 👋</p>
          
          <p>It's been ${data.daysWaiting} days since you joined BDP Publications, and we'd love to get to know you better!</p>
          
          <div class="benefits">
            <h3>🎯 Why complete your profile?</h3>
            <ul>
              <li><strong>Personalized recommendations</strong> - Books tailored to your interests</li>
              <li><strong>Exclusive content</strong> - Early access to new releases</li>
              <li><strong>Community connection</strong> - Connect with like-minded readers</li>
            </ul>
          </div>
          
          <div style="text-align: center;">
            <a href="${data.profileCompleteUrl}" class="cta-button">
              ✨ Complete Profile (2 minutes)
            </a>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; text-align: center; margin-top: 20px;">
            No pressure - you can always do this later!
          </p>
        </div>
        
        <div class="footer">
          <p>Thanks for being part of the BDP community! 🙏</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Thank You Email HTML Template
function generateThankYouEmailHTML(data: { name?: string; email: string; interests: string[] }): string {
  const greeting = data.name ? `${data.name}` : 'there'
  const interestsList = data.interests.length > 0 ? data.interests.join(', ') : 'various topics'
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - Profile Complete!</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #10b981, #d4b036); padding: 30px 20px; text-align: center; color: white; }
        .content { padding: 30px; }
        .cta-button { display: inline-block; background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .interests-box { background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0; }
        .footer { color: #6b7280; font-size: 14px; text-align: center; padding: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Thank You, ${greeting}!</h1>
          <p>Your profile is now complete!</p>
        </div>
        
        <div class="content">
          <p>Fantastic! Thanks for taking the time to complete your profile. This helps us recommend the perfect books for your journey.</p>
          
          <div class="interests-box">
            <h3>📋 Your interests:</h3>
            <p><strong>${interestsList}</strong></p>
            <p style="font-size: 14px; color: #059669; margin-bottom: 0;">We'll use these to send you personalized recommendations!</p>
          </div>
          
          <p>Based on your interests, here are some immediate recommendations:</p>
          
          <div style="text-align: center;">
            <a href="https://bdppublications.gumroad.com/" class="cta-button">
              🛍️ Explore Our Catalog
            </a>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; text-align: center;">
            Keep an eye on your inbox for personalized recommendations coming soon!
          </p>
        </div>
        
        <div class="footer">
          <p>Welcome to your personalized BDP experience! 🚀</p>
        </div>
      </div>
    </body>
    </html>
  `
}