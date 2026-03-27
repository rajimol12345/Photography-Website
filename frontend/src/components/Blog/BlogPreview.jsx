import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogPreview = () => {
    const posts = [
        { id: 1, title: 'The Art of Film Photography', date: 'Oct 12, 2023', category: 'Tips', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
        { id: 2, title: 'Best Locations in Italy', date: 'Sep 28, 2023', category: 'Travel', image: 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
        { id: 3, title: 'Studio Lighting 101', date: 'Sep 15, 2023', category: 'Gear', image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }
    ];

    return (
        <section className="section-padding">
            <div className="container">
                <div className="text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h2 style={{ fontSize: '2.5rem' }}>Latest Journal</h2>
                </div>

                <div className="grid grid-3">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <Link to="/blog" style={{ display: 'block' }}>
                                <div style={{ overflow: 'hidden', marginBottom: '20px' }}>
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        src={post.image}
                                        alt={post.title}
                                        style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-grey-light)', textTransform: 'uppercase', marginBottom: '10px' }}>
                                    {post.date} — {post.category}
                                </div>
                                <h3 style={{ fontSize: '1.4rem' }}>{post.title}</h3>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
