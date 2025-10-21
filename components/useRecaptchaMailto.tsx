import { useState, useCallback } from 'react';

// Make grecaptcha available on the window object
declare global {
  interface Window {
    grecaptcha: any;
  }
}

// FIX: Explicitly type RECAPTCHA_SITE_KEY as string to avoid literal type comparison error.
const RECAPTCHA_SITE_KEY: string = '6Lc0kvErAAAAALSlGHU8nDGmHsMqCZtLO23cl63z';
const mailtoLink = "mailto:tim.kerkmann@googlemail.com?subject=Projektanfrage%20via%20Website&body=Hallo%20Herr%20Kerkmann,%0D%0A%0D%0Aich%20habe%20Interesse%20an%20einer%20Zusammenarbeit%20und%20möchte%20folgendes%20Projekt%20anfragen:%0D%0A%0D%0A-%20**Art%20des%20Projekts:**%20(z.B.%20Architekturvisualisierung,%20Webdesign,%20KI-Tool)%0D%0A-%20**Kurze%20Beschreibung:**%0D%0A-%20**Gewünschter%20Zeitrahmen:**%0D%0A%0D%0AIch%20freue%20mich%20auf%20eine%20Rückmeldung.%0D%0A%0D%0AMit%20freundlichen%20Grüßen,%0D%0A%0D%0A[Ihr%20Name]%0D%0A[Ihre%20Firma/Website,%20falls%20zutreffend]";

export const useRecaptchaMailto = () => {
  const [isProtecting, setIsProtecting] = useState(false);
  const [keyWarning, setKeyWarning] = useState('');
  const [error, setError] = useState('');

  const triggerMailto = useCallback(() => {
    if (isProtecting) return;

    setKeyWarning('');
    setError('');

    if (RECAPTCHA_SITE_KEY === 'YOUR_RECAPTCHA_V3_SITE_KEY') {
      console.warn('%c[reCAPTCHA Warning]', 'color: orange; font-weight: bold;', 'Please replace "YOUR_RECAPTCHA_V3_SITE_KEY" with your actual Google reCAPTCHA Site Key to enable spam protection.');
      setKeyWarning('reCAPTCHA key is missing. Spam protection is disabled.');
      setTimeout(() => setKeyWarning(''), 5000);
      return; // STRICT: Block action
    }

    if (typeof window === 'undefined' || !window.grecaptcha) {
      console.error('reCAPTCHA script not loaded.');
      setError('reCAPTCHA konnte nicht geladen werden. Bitte laden Sie die Seite neu.');
      setTimeout(() => setError(''), 5000);
      return; // STRICT: Block action
    }

    setIsProtecting(true);

    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'mailto_click' })
        .then((token: string) => {
          console.log('reCAPTCHA token generated for mailto click:', token);
          window.location.href = mailtoLink;
        })
        .catch((err: any) => {
          console.error('reCAPTCHA execution error:', err);
          setError('reCAPTCHA-Prüfung fehlgeschlagen. Bitte versuchen Sie es erneut.');
          setTimeout(() => setError(''), 5000);
          // STRICT: Do not open mailto link on failure
        })
        .finally(() => {
          setIsProtecting(false);
        });
    });
  }, [isProtecting]);

  return { triggerMailto, isProtecting, keyWarning, error };
};