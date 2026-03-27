import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ variant = 'solid' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change state when scrolled past 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Logos
  const lightLogo = '/assets/logo-tilia.png'; // White text for dark/transparent bg
  const darkLogo = '/assets/logo-dark-tilia.png'; // Dark text for white bg

  /* 
    Logic for class names:
    - Base: site-header
    - Variant: transparent-variant or solid-variant
    - Scrolled: scrolled (only relevant if we want sticky behavior changes)
  */
  const headerClass = `${styles['site-header']} ${styles[`${variant}-variant`]} ${isScrolled ? styles.scrolled : ''}`;

  return (
    <header className={headerClass}>
      <div className={styles['main-nav']}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <Link to="/" onClick={closeMenu}>
            {/* 
               If variant is transparent AND NOT scrolled -> show light logo 
               Else (solid variant OR scrolled) -> show dark logo
            */}
            {variant === 'transparent' && !isScrolled ? (
              <img src={lightLogo} alt="Snap Logo" className={styles['logo-img']} />
            ) : (
              <img src={darkLogo} alt="Snap Logo" className={styles['logo-img']} />
            )}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles['nav-container']}>
          <ul className={styles['nav-links']}>
            <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>Home</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>About</NavLink></li>
            <li><NavLink to="/portfolio" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>Portfolio</NavLink></li>
            <li><NavLink to="/gallery" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>Galleries</NavLink></li>
            <li><NavLink to="/blog" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>Blog</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>Contact</NavLink></li>
          </ul>
        </nav>

        {/* Right Side: Book Now & Hamburger */}
        <div className={styles['header-right']}>
          <Link to="/book" className={styles['book-now-btn']}>Book Now</Link>

          <div className={styles.hamburger} onClick={toggleMenu}>
            <span className={styles['hamburger-line']}></span>
            <span className={styles['hamburger-line']}></span>
            <span className={styles['hamburger-line']}></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <nav className={`${styles['nav-links-mobile']} ${styles['nav-open']}`}>
          <ul onClick={closeMenu}>
            <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''}>About</NavLink></li>
            <li><NavLink to="/portfolio" className={({ isActive }) => isActive ? styles.active : ''}>Portfolio</NavLink></li>
            <li><NavLink to="/gallery" className={({ isActive }) => isActive ? styles.active : ''}>Galleries</NavLink></li>
            <li><NavLink to="/blog" className={({ isActive }) => isActive ? styles.active : ''}>Blog</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : ''}>Contact</NavLink></li>
            <li><NavLink to="/book" className={({ isActive }) => isActive ? styles.active : ''}>Book Now</NavLink></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;