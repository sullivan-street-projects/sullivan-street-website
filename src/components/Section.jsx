import React from 'react';
import FocusText from './FocusText';

const Section = ({ 
  id, 
  label, 
  children, 
  className = "", 
  divider = true, 
  padding = "py-24 md:py-32 lg:py-48" 
}) => (
  <div className={`max-w-site w-full mx-auto px-6 lg:px-8 ${className}`}>
    {divider && <div className="border-t border-divider" />}
    <section id={id} className={padding}>
      {label && (
        <div className="mb-12 md:mb-16">
          <FocusText>
            <span className="font-sans text-section-label text-label uppercase tracking-widest font-bold">
              {label}
            </span>
          </FocusText>
        </div>
      )}
      <div>
        {children}
      </div>
    </section>
  </div>
);

export default Section;
