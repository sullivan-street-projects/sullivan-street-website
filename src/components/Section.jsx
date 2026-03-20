import { LABEL_CLASSES } from '../constants';

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
          <span className={LABEL_CLASSES}>
            {label}
          </span>
        </div>
      )}
      {children}
    </section>
  </div>
);

export default Section;
