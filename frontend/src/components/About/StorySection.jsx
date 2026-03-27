import React from 'react';
import { motion } from 'framer-motion';

const StorySection = () => {
    return (
        <section className="section-padding">
            <div className="container">
                <div className="grid grid-2" style={{ alignItems: 'center', gap: 'var(--spacing-xl)' }}>
                    {/* Text First on Desktop for variation if needed, but Tilia usually Image Left. Let's do Image Left */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1554048612-387768052bf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            alt="Our Story"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 style={{ fontSize: '2rem', marginBottom: '30px' }}>Capturing the Essence</h3>
                        <p style={{ marginBottom: '20px', fontSize: '1.05rem', color: 'var(--color-grey-dark)' }}>
                            Founded in 2015, Snap started as a small passion project. We believe that photography is more than just clicking a shutter; it's about seeing the world in a unique way.                        </p>
                        <p style={{ marginBottom: '30px', fontSize: '1.05rem', color: 'var(--color-grey-dark)' }}>
                            Our approach is documentary-style, letting moments unfold naturally. We step back and let the magic happen, capturing the raw emotions and genuine interactions.
                        </p>
                        <img
                            src="/assets/signature.png"
                            alt=""
                            style={{ height: '40px', opacity: 0.7 }}
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default StorySection;
