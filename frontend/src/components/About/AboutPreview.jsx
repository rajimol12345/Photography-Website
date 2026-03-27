import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutPreview = () => {
    return (
        <section className="section-padding" style={{ backgroundColor: 'var(--color-off-white)' }}>
            <div className="container">
                <div className="grid grid-2" style={{ alignItems: 'center', gap: 'var(--spacing-xl)' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1554048612-387768052bf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Photographer"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h4 className="uppercase" style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--color-grey-medium)', marginBottom: '20px' }}>About Me</h4>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Visual Storyteller <br /> Based in New York</h2>
                        <p style={{ marginBottom: '30px', color: 'var(--color-grey-medium)' }}>
                            I believe in the power of visual storytelling. My approach is personal, intimate, and focused on capturing the essence of the moment. With over 10 years of experience, I help brands and individuals tell their stories through compelling imagery.
                        </p>
                        <Link to="/about" style={{
                            display: 'inline-block',
                            borderBottom: '1px solid var(--color-dark)',
                            paddingBottom: '5px',
                            textTransform: 'uppercase',
                            fontSize: '0.8rem',
                            letterSpacing: '1px'
                        }}>
                            Read My Story
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutPreview;
