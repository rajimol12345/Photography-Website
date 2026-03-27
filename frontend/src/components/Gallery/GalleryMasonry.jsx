import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const GalleryMasonry = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const mockImages = Array.from({ length: 8 }).map((_, i) => ({
        _id: i.toString(),
        imageUrl: `https://picsum.photos/seed/${i + 50}/800/${Math.floor(Math.random() * 400 + 600)}`, // Random tall aspect ratios
        title: `Gallery ${i + 1}`
    }));

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data } = await axios.get('/api/gallery').catch(() => ({ data: [] }));
                const items = (Array.isArray(data) ? data : (data?.images || []));
                setImages(items.length > 0 ? items : mockImages);
                setLoading(false);
            } catch (err) {
                setImages(mockImages);
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    if (loading) return null;

    return (
        <section className="section-padding">
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div className="masonry-grid">
                    {images.map((img, index) => (
                        <motion.div
                            key={img._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            style={{ marginBottom: 'var(--spacing-md)', breakInside: 'avoid' }}
                        >
                            <motion.img
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                                src={img.imageUrl}
                                alt={img.title}
                                style={{ width: '100%', display: 'block' }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
            <style>{`
                .masonry-grid {
                    column-count: 2;
                    column-gap: var(--spacing-md);
                }
                @media (max-width: 768px) {
                    .masonry-grid {
                        column-count: 1;
                    }
                }
            `}</style>
        </section>
    );
};

export default GalleryMasonry;
