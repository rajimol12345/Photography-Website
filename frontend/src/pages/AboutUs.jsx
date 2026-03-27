import React from 'react';

import ServicesSection from '../components/ServicesSection';
import MeetTheCrew from '../components/MeetTheCrew';
import Team from '../components/Team';
import Testimonial from '../components/Testimonial';
import BookingForm from '../components/BookingForm';
import InstagramStrip from '../components/InstagramStrip';

const AboutUs = () => {
    return (
        <div className="about-us-page">
            <main>
                <ServicesSection />
                <MeetTheCrew />
                <Team />
                <Testimonial
                    backgroundImage="/assets/test-bg.jpeg"
                />
                <BookingForm />
                <InstagramStrip />
            </main>
        </div>
    );
};

export default AboutUs;
