import AnimatedArrow from './AnimatedArrow';

const CTAButton = ({ href, onClick, children, variant = 'sm' }) => {
  const isLarge = variant === 'lg';

  const className = isLarge
    ? 'font-serif text-3xl md:text-4xl lg:text-5xl italic inline-flex items-center gap-6 md:gap-10 hover:opacity-70 transition-all text-charcoal'
    : 'font-sans text-micro font-bold uppercase tracking-wider inline-flex items-center gap-4 hover:opacity-70 transition-all text-charcoal';

  const underlineClass = isLarge
    ? 'absolute -bottom-4 left-0 w-full h-[1.5px] bg-charcoal scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500'
    : 'absolute -bottom-2 left-0 w-full h-[1.5px] bg-charcoal scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500';

  const Tag = href ? 'a' : 'button';
  const props = href ? { href } : { onClick };

  return (
    <div className="group relative inline-block">
      <Tag {...props} className={className}>
        {children}
        <AnimatedArrow size={variant} className={isLarge ? 'not-italic' : undefined} />
      </Tag>
      <div className={underlineClass} />
    </div>
  );
};

export default CTAButton;
