import React from 'react';
import { AnimatedSection } from './AnimatedSection';
import { useRecaptchaMailto } from './useRecaptchaMailto';

export const CTASection: React.FC = () => {
  const { triggerMailto, isProtecting, keyWarning, error } = useRecaptchaMailto();

  return (
    <section id="cta" className="bg-petrol text-white">
      <div className="container mx-auto px-6 py-20 md:py-24 text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Bereit für dein Projekt?
          </h2>
        </AnimatedSection>
        <AnimatedSection delay="delay-200">
          <div className="flex flex-col items-center">
            <button
              onClick={triggerMailto}
              disabled={isProtecting}
              className="mt-8 inline-block bg-white text-petrol font-bold py-4 px-10 rounded-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 disabled:bg-opacity-80 disabled:cursor-wait"
            >
              {isProtecting ? 'Prüfe...' : 'Projekt anfragen'}
            </button>
            {keyWarning && (
              <p className="mt-4 text-sm text-yellow-300 animate-pulse">{keyWarning}</p>
            )}
            {error && (
              <p className="mt-4 text-sm text-red-300">{error}</p>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
