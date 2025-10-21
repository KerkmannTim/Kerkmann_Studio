
import React from 'react';
import { AnimatedSection } from './AnimatedSection';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-anthracite mb-12">
            Über Tim Kerkmann
          </h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 text-lg text-anthracite/80 space-y-4">
            <AnimatedSection delay="delay-100">
              <p>
                Ich bin technischer Systemplaner, 3D-Künstler und Digitalarchitekt.
                Ich vereine Ingenieursdenken mit Designästhetik.
              </p>
            </AnimatedSection>
            <AnimatedSection delay="delay-200">
              <p>
                Meine Arbeit entsteht an der Schnittstelle von Architektur, KI und Websystemen.
                Ich baue Strukturen, die funktionieren – visuell, technisch, wirtschaftlich.
              </p>
            </AnimatedSection>
          </div>
          <div className="md:col-span-2">
            <AnimatedSection delay="delay-300">
              <blockquote className="border-l-4 border-copper pl-6 py-4 text-2xl font-semibold italic text-anthracite">
                Klarheit. Effizienz. Tiefe.
              </blockquote>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};
