import React from 'react';
import { AnimatedSection } from './AnimatedSection';
import ParticleBackground from './ParticleBackground';
import { useRecaptchaMailto } from './useRecaptchaMailto';

export const HeroSection: React.FC = () => {
  const { triggerMailto, isProtecting, keyWarning, error } = useRecaptchaMailto();

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center text-white text-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-anthracite z-0">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite to-transparent"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <AnimatedSection>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter">
                Ich baue, was andere nur anklicken.
            </h1>
        </AnimatedSection>
        <AnimatedSection delay="delay-200">
            <p className="mt-4 max-w-3xl text-lg md:text-xl text-white/80">
                Architektur. KI. Automatisierung. – Die Verbindung aus Design, Technik und System.
            </p>
        </AnimatedSection>
        <AnimatedSection delay="delay-300">
          <div className="flex flex-col items-center">
            <button 
              onClick={triggerMailto} 
              disabled={isProtecting}
              className="mt-8 inline-block bg-copper text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 disabled:bg-opacity-50 disabled:cursor-wait"
            >
                {isProtecting ? 'Prüfe...' : 'Projekt anfragen'}
            </button>
            {keyWarning && (
                <p className="mt-3 text-sm text-yellow-400 animate-pulse">{keyWarning}</p>
            )}
            {error && (
                <p className="mt-3 text-sm text-red-400">{error}</p>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
