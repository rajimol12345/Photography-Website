import React from 'react';


import HeroCarousel from '../components/Hero/HeroCarousel';

import AboutStory from '../components/AboutStory';
import ServicesGrid from '../components/ServicesGrid';
import Portfolio from '../components/Portfolio';
import Testimonial from '../components/Testimonial';
import Team from '../components/Team';
import ClientLogos from '../components/ClientLogos';
import CTA from '../components/CTA';
import InstagramStrip from '../components/InstagramStrip';

const Home1 = () => {
    return (
        <div>
            <main>
                <HeroCarousel />
                <AboutStory />
                <ServicesGrid />
                <Portfolio />
                <Testimonial
                    backgroundImage="/assets/test-bg.jpeg"
                />
                <Team />
                <ClientLogos />
                <CTA />
                <InstagramStrip />
            </main>
        </div>
    );
};

export default Home1;
