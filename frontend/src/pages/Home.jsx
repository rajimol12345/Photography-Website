import React from 'react';

// Import components for Home page sections
// (These components will be created in subsequent steps)

import AboutPreview from '../components/AboutPreview'; // Import AboutPreview
import TestimonialsSection from '../components/TestimonialsSection';
import FeaturedPortfolio from '../components/FeaturedPortfolio'; // Import FeaturedPortfolio
import ServicesSection from '../components/ServicesSection'; // Import ServicesSection
import TeamSection from '../components/TeamSection'; // Import TeamSection
import CallToAction from '../components/CallToAction'; // Import CallToAction
import BlogPreview from '../components/BlogPreview';

import CategoryHighlights from '../components/CategoryHighlights';
import ClientLogos from '../components/ClientLogos';

const Home = () => {
  return (
    <>
      <AboutPreview />
      <CategoryHighlights />
      <FeaturedPortfolio />
      <TestimonialsSection />
      <TeamSection />
      <ClientLogos />
      <BlogPreview />
      <CallToAction />
    </>
  );
};

export default Home;
