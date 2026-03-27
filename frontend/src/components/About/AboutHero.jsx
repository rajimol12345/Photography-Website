import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => {
    return (
        <section className="about-hero" style={{
            paddingTop: 'var(--spacing-xxl)',
            paddingBottom: 'var(--spacing-lg)',
            backgroundColor: 'var(--color-white)'
        }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-center" style={{ fontSize: '4rem', marginBottom: '20px' }}>About Us</h1>
                    <p className="text-center" style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        color: 'var(--color-grey-medium)',
                        fontSize: '1.2rem'
                    }}>
                        We are a team of visual storytellers passionate about capturing life's most beautiful moments.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutHero;
