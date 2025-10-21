
import React, { useState, useEffect } from 'react';
import { AnimatedSection } from './AnimatedSection';

const portfolioItems = [
  { title: 'Architekturvisualisierungen', imgSrc: 'https://picsum.photos/seed/portfolio1/800/600' },
  { title: 'PixelForge.ai – KI-Stockplattform', imgSrc: 'https://picsum.photos/seed/portfolio2/800/600' },
  { title: 'Kreatierlich – Kinder- & Tierillustrationen', imgSrc: 'https://picsum.photos/seed/portfolio3/800/600' },
  { title: 'Know Your Map – interaktive Spiel-Webapp', imgSrc: 'https://picsum.photos/seed/portfolio4/800/600' },
  { title: 'Automatisierte Prompt-Tools', imgSrc: 'https://picsum.photos/seed/portfolio5/800/600' },
  { title: 'Interior Design Rendering', imgSrc: 'https://picsum.photos/seed/portfolio6/800/600' },
];

interface LightboxProps {
  imageUrl: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ imageUrl, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div className="relative max-w-4xl max-h-[90vh] " onClick={(e) => e.stopPropagation()}>
                <img src={imageUrl} alt="Portfolio Item" className="w-full h-full object-contain rounded-lg shadow-2xl"/>
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 bg-white text-anthracite rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-gray-200 transition"
                    aria-label="Close lightbox"
                >
                    &times;
                </button>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
            `}</style>
        </div>
    );
};


export const PortfolioSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-anthracite mb-16">
            Projekte
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioItems.map((item, index) => (
            <AnimatedSection key={index} delay={`delay-${(index % 3) * 100}`}>
              <div
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(item.imgSrc)}
              >
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="w-full h-full object-cover aspect-video transform group-hover:scale-105 transition-transform duration-500 ease-out-quart"
                />
                <div className="absolute inset-0 bg-anthracite/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white text-lg font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out-quart">{item.title}</h3>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
      {selectedImage && <Lightbox imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
    </section>
  );
};
