import React from 'react';
import GalleryMasonry from '../components/Gallery/GalleryMasonry';
import { motion } from 'framer-motion';

const GalleryMasonry2 = () => {
    return (
        <div className="gallery-page">
            <main>
                <section style={{ paddingTop: 'var(--spacing-xxl)', paddingBottom: 'var(--spacing-md)' }}>
                    <div className="container text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{ fontSize: '3.5rem' }}
                        >
                            Gallery
                        </motion.h1>
                    </div>
                </section>
                <GalleryMasonry />
            </main>
        </div>
    );
};

export default GalleryMasonry2;
