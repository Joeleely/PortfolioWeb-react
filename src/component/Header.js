import { useEffect, useState } from 'react';

const Header = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [showHeader, setShowHeader] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleClick = (section) => {
    setActiveLink(section);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsTop(currentScrollY < 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${showHeader ? 'show' : 'hide'} ${isTop ? 'transparent' : ''}`}>
      <a href="" className="logo">Joevry</a>

      <nav className="navbar">
        <a
          href="#home"
          style={{ '--i': 1 }}
          onClick={() => handleClick('home')}
          className={`hover-underline-animation ${activeLink === 'home' ? 'active' : ''}`}
        >
          Home
        </a>
        <a
          href="#about"
          style={{ '--i': 2 }}
          onClick={() => handleClick('about')}
          className={`hover-underline-animation ${activeLink === 'about' ? 'active' : ''}`}
        >
          About
        </a>
        <a
          href="#projects"
          style={{ '--i': 3 }}
          onClick={() => handleClick('projects')}
          className={`hover-underline-animation ${activeLink === 'projects' ? 'active' : ''}`}
        >
          Projects
        </a>
        <a
          href="#gallery"
          style={{ '--i': 4 }}
          onClick={() => handleClick('gallery')}
          className={`hover-underline-animation ${activeLink === 'gallery' ? 'active' : ''}`}
        >
          Gallery
        </a>
      </nav>
    </header>
  );
};

export default Header;