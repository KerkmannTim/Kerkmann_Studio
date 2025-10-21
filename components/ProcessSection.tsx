
import React from 'react';
import { AnimatedSection } from './AnimatedSection';
import { PaperAirplaneIcon, PencilSquareIcon, WrenchScrewdriverIcon, CheckBadgeIcon } from './icons';

const processSteps = [
  { icon: <PaperAirplaneIcon className="w-10 h-10 text-copper" />, title: 'Anfrage', delay: 'delay-0' },
  { icon: <PencilSquareIcon className="w-10 h-10 text-copper" />, title: 'Konzept', delay: 'delay-100' },
  { icon: <WrenchScrewdriverIcon className="w-10 h-10 text-copper" />, title: 'Umsetzung', delay: 'delay-200' },
  { icon: <CheckBadgeIcon className="w-10 h-10 text-copper" />, title: 'Lieferung', delay: 'delay-300' },
];

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-anthracite mb-16">
            So arbeite ich
          </h2>
        </AnimatedSection>
        <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-copper/20 -translate-y-1/2 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
                {processSteps.map((step, index) => (
                <AnimatedSection key={index} className="flex flex-col items-center text-center" delay={step.delay}>
                    <div className="bg-white rounded-full p-5 mb-4 border-2 border-copper/20 shadow-sm">
                        {step.icon}
                    </div>
                    <span className="text-sm font-bold text-copper tracking-widest uppercase mb-1">
                        Step {index + 1}
                    </span>
                    <h3 className="font-bold text-xl text-anthracite">{step.title}</h3>
                </AnimatedSection>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};
