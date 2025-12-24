export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80; // Height of header/breathing room
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
  }
};
