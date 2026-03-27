import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero/Hero';

const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Define hero configuration for different paths
  const heroConfigs = {
    '/': {
      image: '/assets/slider-1.webp',
      title: 'Snap Photography',
      subtitle: 'Capturing Moments, Creating Memories',
      breadcrumbs: [{ label: 'Home', path: '/' }],
      disableDefaultHero: true, // Use HeroCarousel in Home1.jsx instead
    },
    '/about': {
      image: '/assets/img-aboutus.jpg',
      title: 'About Us',
      breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'About' }],
    },
    '/portfolio': {
      image: '/assets/gal-grid-14.jpg',
      title: 'Our Portfolio',
      breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Portfolio' }],
    },
    '/gallery': {
      image: '/assets/gal-grid-14.jpg',
      title: 'Photo Gallery',
      breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Gallery' }],
    },
    '/blog': {
      image: '/assets/slider-1.webp',
      title: 'Blog',
      subtitle: 'Latest News',
      breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Blog' }],
      disableDefaultHero: true,
    },
    '/contact': {
      image: '/assets/contact-page.jpg',
      title: 'Contact',
      subtitle: "We're here to catch your event",
      breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Contact' }],
    },
    // Add other paths as needed
  };

  const currentHeroConfig = heroConfigs[currentPath];
  const shouldShowHero = !!currentHeroConfig;

  // Determine header variant: 'transparent' if hero is shown, 'solid' otherwise
  const headerVariant = shouldShowHero ? "transparent" : "solid";

  return (
    <div className="app-container">
      <Header variant={headerVariant} />

      {shouldShowHero && !currentHeroConfig.disableDefaultHero && (
        <Hero
          image={currentHeroConfig.image}
          title={currentHeroConfig.title}
          subtitle={currentHeroConfig.subtitle}
          breadcrumbs={currentHeroConfig.breadcrumbs}
        />
      )}

      {/* The main-content should start after the hero (if present) or directly after the header (if solid) */}
      <main className="main-content">
        <Outlet /> {/* Renders the current route's component */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
