# Email Setup Guide

## Contact Form Configuration

The portfolio's contact form uses **FormSubmit.co** (free service, no API key required) to send emails to `akshlearn13@gmail.com`.

### Setup Steps:

1. **Verify Your Email (First Time Only)**
   - Visit: `https://formspree.io/f/xzzzjzqk`
   - You should see a form to verify your email
   - Check your email inbox for a verification link
   - Click the verification link
   - Once verified, the form will be active

2. **How It Works**
   - When someone fills out the contact form on your portfolio
   - The data is sent to FormSubmit
   - FormSubmit forwards the email to `akshlearn13@gmail.com`
   - You'll receive the message in your Gmail inbox

3. **Customize Email Recipient**
   - To change the recipient email, update the line in `/scripts/main.js`:
     ```javascript
     const response = await fetch('https://formspree.io/f/xzzzjzqk', {
     ```
   - Change `xzzzjzqk` to your form ID from FormSubmit

4. **Optional: Custom FormSubmit Setup**
   - Alternatively, visit `https://formsubmit.co/`
   - Enter your email: `akshlearn13@gmail.com`
   - You'll receive a unique form ID
   - Replace the fetch URL with your custom ID

## Alternative Services

If FormSubmit doesn't work, you can also use:

### Option 1: EmailJS (Recommended)

1. Visit `https://www.emailjs.com/`
2. Sign up with free tier
3. Get your Service ID, Template ID, and Public Key
4. Replace the form submission code with EmailJS integration

### Option 2: Formspree

1. Visit `https://formspree.io/`
2. Sign up for free
3. Get your form ID
4. Update the fetch URL in main.js

## Current Configuration

**Service:** FormSubmit.co  
**Recipient:** akshlearn13@gmail.com  
**Form ID:** xzzzjzqk  
**Method:** POST JSON with optional reply-to redirect

## Testing the Form

1. Go to your portfolio website
2. Scroll to Contact section
3. Fill in the form with test data
4. Click "Send Message"
5. Check your email inbox for the received message

If you don't receive the email:

- Check spam/junk folder
- Make sure to verify your email first (step 1 above)
- Try refreshing the FormSubmit page to verify again
