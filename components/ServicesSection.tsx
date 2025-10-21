
import React from 'react';
import { AnimatedSection } from './AnimatedSection';
import { CubeIcon, SparklesIcon, CodeBracketIcon, CogIcon, LightBulbIcon } from './icons';

const services = [
  {
    icon: <CubeIcon className="w-8 h-8 text-copper" />,
    title: '3D- & Architekturvisualisierung',
    description: 'Fotorealistische Renderings für Architektur, Interior, Produkte.',
    delay: 'delay-0'
  },
  {
    icon: <SparklesIcon className="w-8 h-8 text-copper" />,
    title: 'KI-Stockfotografie',
    description: 'Erstellung kommerzieller AI-Bilder mit automatisierten Pipelines.',
    delay: 'delay-100'
  },
  {
    icon: <CodeBracketIcon className="w-8 h-8 text-copper" />,
    title: 'Webdesign & Systeme',
    description: 'Moderne Websites mit Next.js, Tailwind, Framer Motion.',
    delay: 'delay-200'
  },
  {
    icon: <CogIcon className="w-8 h-8 text-copper" />,
    title: 'Automatisierung & KI-Tools',
    description: 'Python-Workflows, Metadaten-Generatoren, Prompt-Systeme.',
    delay: 'delay-300'
  },
  {
    icon: <LightBulbIcon className="w-8 h-8 text-copper" />,
    title: 'Strategie & Beratung',
    description: 'Prozessautomatisierung, Projektstruktur, Trading- & Investment-Coaching.',
    delay: 'delay-400'
  },
];

const ServiceCard: React.FC<{ service: typeof services[0] }> = ({ service }) => {
    return (
        <AnimatedSection className="flex flex-col items-start text-left bg-gray-50/50 p-6 rounded-lg h-full" delay={service.delay}>
            <div className="mb-4">{service.icon}</div>
            <h3 className="font-bold text-lg mb-2 text-anthracite">{service.title}</h3>
            <p className="text-anthracite/70 text-sm leading-relaxed">{service.description}</p>
        </AnimatedSection>
    )
}

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-anthracite mb-16">
            Leistungen
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
