import React from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { MetaTagSection } from './components/MetaTagSection';

const sectionMeta = {
  home: {
    title: 'Kerkmann Studio – Design. Technik. Automatisierung.',
    description: 'Kerkmann Studio: Die Verbindung aus Design, Technik und System. Architektur, KI und Automatisierung für visuell, technisch und wirtschaftlich funktionierende Strukturen.',
  },
  about: {
    title: 'Über Mich | Kerkmann Studio',
    description: 'Tim Kerkmann: Technischer Systemplaner, 3D-Künstler und Digitalarchitekt an der Schnittstelle von Architektur, KI und Websystemen.',
  },
  services: {
    title: 'Leistungen | Kerkmann Studio',
    description: 'Entdecken Sie die Leistungen von Kerkmann Studio: 3D- & Architekturvisualisierung, KI-Stockfotografie, Webdesign, Automatisierung und strategische Beratung.',
  },
  portfolio: {
    title: 'Projekte | Kerkmann Studio',
    description: 'Sehen Sie eine Auswahl an Projekten von Kerkmann Studio, darunter Architekturvisualisierungen, KI-Plattformen und interaktive Web-Apps.',
  },
  process: {
    title: 'Arbeitsprozess | Kerkmann Studio',
    description: 'Vom ersten Kontakt bis zur finalen Lieferung – verstehen Sie den strukturierten und effizienten Arbeitsprozess bei Kerkmann Studio.',
  },
  contact: {
    title: 'Kontakt | Kerkmann Studio',
    description: 'Starten Sie Ihr Projekt mit Kerkmann Studio. Nehmen Sie Kontakt auf für eine Zusammenarbeit in den Bereichen Design, Technik und Automatisierung.',
  },
};


const App: React.FC = () => {
  return (
    <div className="bg-white text-anthracite antialiased overflow-x-hidden">
      <main>
        <MetaTagSection title={sectionMeta.home.title} description={sectionMeta.home.description} isDefault>
          <HeroSection />
        </MetaTagSection>
        
        <MetaTagSection title={sectionMeta.about.title} description={sectionMeta.about.description}>
          <AboutSection />
        </MetaTagSection>
        
        <MetaTagSection title={sectionMeta.services.title} description={sectionMeta.services.description}>
          <ServicesSection />
        </MetaTagSection>

        <MetaTagSection title={sectionMeta.portfolio.title} description={sectionMeta.portfolio.description}>
          <PortfolioSection />
        </MetaTagSection>

        <MetaTagSection title={sectionMeta.process.title} description={sectionMeta.process.description}>
          <ProcessSection />
        </MetaTagSection>

        <MetaTagSection title={sectionMeta.contact.title} description={sectionMeta.contact.description}>
          <CTASection />
        </MetaTagSection>

        <MetaTagSection title={sectionMeta.contact.title} description={sectionMeta.contact.description}>
          <Footer />
        </MetaTagSection>
      </main>
    </div>
  );
};

export default App;