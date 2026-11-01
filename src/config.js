// Site-wide details. Everything marked PLACEHOLDER must be replaced with real information.
export const site = {
  name: 'Iyad Sebti',
  role: 'Event Photographer',
  location: 'Algeria',
  email: 'hello@example.com',            // PLACEHOLDER
  instagramHandle: '@your.handle',        // PLACEHOLDER
  instagramUrl: 'https://instagram.com/', // PLACEHOLDER
  description:
    'Event photography focused on people, emotions and the moments that make every experience unique.',
};

// EmailJS (https://www.emailjs.com). Leave empty until you have an account:
// the contact form will then say honestly that sending is not connected yet.
export const emailjs = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};
export const emailjsReady = Boolean(emailjs.serviceId && emailjs.templateId && emailjs.publicKey);

const base = import.meta.env.BASE_URL;
export const assets = {
  hero: `${base}images/hero/hero.webp`,
  portrait: `${base}images/about/portrait.webp`,
};
