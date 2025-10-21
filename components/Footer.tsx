import React, { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';

// Make grecaptcha available on the window object
declare global {
  interface Window {
    grecaptcha: any;
  }
}

// FIX: Explicitly type RECAPTCHA_SITE_KEY as string to avoid literal type comparison error.
const RECAPTCHA_SITE_KEY: string = '6Lc0kvErAAAAALSlGHU8nDGmHsMqCZtLO23cl63z';

export const Footer: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [keyWarning, setKeyWarning] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Clear previous states on new submission
    setKeyWarning('');
    setSubmitError('');

    if (RECAPTCHA_SITE_KEY === 'YOUR_RECAPTCHA_V3_SITE_KEY') {
        console.warn('%c[reCAPTCHA Warning]', 'color: orange; font-weight: bold;', 'Please replace "YOUR_RECAPTCHA_V3_SITE_KEY" with your actual Google reCAPTCHA Site Key to enable form submission.');
        setKeyWarning('reCAPTCHA key is missing. Form submission is disabled.');
        setTimeout(() => setKeyWarning(''), 5000);
        return; // Block submission
    }

    setIsSubmitting(true);

    if (!window.grecaptcha) {
      console.error('reCAPTCHA script not loaded');
      setSubmitError('reCAPTCHA konnte nicht geladen werden. Bitte laden Sie die Seite neu.');
      setTimeout(() => setSubmitError(''), 5000);
      setIsSubmitting(false);
      return;
    }

    window.grecaptcha.ready(async () => {
      try {
        const recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });
        
        console.log('Form data:', formData);
        console.log('reCAPTCHA Token:', recaptchaToken);
        console.log('This token should be verified on the backend.');

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSubmitted(true); // Show success card
        setFormData({ name: '', email: '', message: '' }); // Clear form fields

        // After 4 seconds, hide the success card and show the form again
        setTimeout(() => {
          setIsSubmitted(false);
        }, 4000);

      } catch (error) {
        console.error('reCAPTCHA execution error:', error);
        setSubmitError('reCAPTCHA-Prüfung fehlgeschlagen. Bitte versuchen Sie es erneut.');
        setTimeout(() => setSubmitError(''), 5000);
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <footer id="contact" className="bg-anthracite text-white/70 py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <h3 className="text-3xl font-bold text-white mb-6">Kontakt</h3>
            <p className="mb-4">
              Haben Sie ein Projekt im Sinn oder möchten Sie mehr erfahren? Ich freue mich auf Ihre Nachricht.
            </p>
            <div className="space-y-2">
              <p>
                <strong>E-Mail:</strong> <a href="mailto:tim.kerkmann@googlemail.com" className="text-copper hover:text-white transition">tim.kerkmann@googlemail.com</a>
              </p>
              <p>
                <strong>Standort:</strong> Deutschland / Remote weltweit verfügbar.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay="delay-200">
            {isSubmitted ? (
              <div className="bg-petrol/50 border border-petrol p-8 rounded-lg text-center h-full flex flex-col justify-center">
                <h4 className="font-bold text-white text-xl mb-2">Vielen Dank!</h4>
                <p>Ihre Nachricht wurde erfolgreich gesendet.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/10 p-3 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-copper transition text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">E-Mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-Mail"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/10 p-3 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-copper transition text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Nachricht</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Ihre Nachricht"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/10 p-3 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-copper transition text-white placeholder:text-white/50"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-copper text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 disabled:bg-opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sende...' : 'Nachricht senden'}
                  </button>
                  {keyWarning && (
                    <p className="mt-3 text-sm text-yellow-300 animate-pulse">{keyWarning}</p>
                  )}
                  {submitError && (
                    <p className="mt-3 text-sm text-red-400">{submitError}</p>
                  )}
                </div>
              </form>
            )}
          </AnimatedSection>
        </div>
        <div className="mt-20 pt-10 border-t border-white/20 text-center text-sm">
          <p>© {new Date().getFullYear() + 1} Kerkmann Studio – Design. Technik. Automatisierung.</p>
        </div>
      </div>
    </footer>
  );
};