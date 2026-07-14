import React from 'react';

const CTAButton = ({ href, onClick, children, variant = 'sm' }) => {
  const isLarge = variant === 'lg';

  const arrowSizeClass = isLarge ? 'text-4xl lg:text-6xl' : 'text-lg';
  const arrowAnimClass = isLarge ? 'animate-arrow-nudge-lg' : 'animate-arrow-nudge';

  const textClass = isLarge
    ? 'font-serif text-3xl md:text-4xl lg:text-5xl italic transition-colors duration-300 text-charcoal group-hover:text-charcoal/70'
    : 'font-sans text-micro font-bold uppercase tracking-wider transition-colors duration-300 text-charcoal group-hover:text-charcoal/70';

  const wrapperClass = isLarge
    ? 'inline-flex items-center gap-6 md:gap-10'
    : 'inline-flex items-center gap-4';

  const underlineClass = isLarge
    ? 'absolute -bottom-4 left-0 w-full h-[1.5px] bg-charcoal scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 delay-100'
    : 'absolute -bottom-2 left-0 w-full h-[1.5px] bg-charcoal scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 delay-100';

  const Tag = href ? 'a' : 'button';
  const isExternal = href && (href.startsWith('http') || href.startsWith('//'));
  const props = href
    ? { href, ...(isExternal && { target: '_blank', rel: 'noopener noreferrer' }) }
    : { onClick };

  return (
    <div className="group relative inline-block">
      <Tag {...props} className={`${wrapperClass} cursor-pointer`}>
        <span className={`relative z-10 ${textClass}`}>{children}</span>
        <span
          aria-hidden="true"
          className={`${arrowSizeClass} ${arrowAnimClass} ${isLarge ? 'not-italic relative z-10' : 'relative z-10'}`}
        >
          →
        </span>
        <div className={underlineClass} />
      </Tag>
    </div>
  );
};

export default CTAButton;
