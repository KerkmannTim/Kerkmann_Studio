import React, { useRef, useEffect } from 'react';

interface MetaTagSectionProps {
  children: React.ReactNode;
  title: string;
  description: string;
  isDefault?: boolean;
}

export const MetaTagSection: React.FC<MetaTagSectionProps> = ({ children, title, description, isDefault = false }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const updateMetaTags = () => {
    if (document.title !== title) {
      document.title = title;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && metaDesc.getAttribute('content') !== description) {
        metaDesc.setAttribute('content', description);
    }
  };
  
  // Set default tags on initial load
  useEffect(() => {
    if (isDefault) {
        updateMetaTags();
    }
  }, [isDefault, title, description]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            updateMetaTags();
        }
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // Trigger when section is closer to the center of the viewport
        threshold: 0,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [title, description]);

  return <div ref={sectionRef}>{children}</div>;
};
