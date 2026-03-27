import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedPortfolio = () => {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock data fallback if API fails or is empty for dev purposes
    const mockItems = [
        { _id: '1', title: 'Fashion Week', category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { _id: '2', title: 'Urban Life', category: 'Lifestyle', imageUrl: 'https://images.unsplash.com/photo-1517865288-978fcb780652?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { _id: '3', title: 'Wild Creatures', category: 'Nature', imageUrl: 'https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { _id: '4', title: 'Modern Arch', category: 'Architecture', imageUrl: 'https://images.unsplash.com/photo-1504913659239-6abc962804d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }
    ];

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                // Remove this timeout in production, just for smoother dev feeling if API is fast
                // await new Promise(resolve => setTimeout(resolve, 500)); 
                const { data } = await axios.get('/api/portfolio').catch(() => ({ data: [] }));
                const items = (Array.isArray(data) ? data : (data?.portfolioItems || [])).filter(item => item.isFeatured || true).slice(0, 4);
                // Fallback to mock if empty
                setPortfolioItems(items.length > 0 ? items : mockItems);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setPortfolioItems(mockItems);
                setLoading(false);
            }
        };
        fetchPortfolio();
    }, []);

    if (loading) return null;

    return (
        <section className="section-padding">
            <div className="container">
                <div className="d-flex justify-between align-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <div>
                        <h4 className="uppercase" style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--color-grey-medium)', marginBottom: '10px' }}>Selected Works</h4>
                        <h2 style={{ fontSize: '2.5rem' }}>Featured Portfolio</h2>
                    </div>
                    <Link to="/portfolio" className="nav-link" style={{ fontSize: '0.9rem' }}>View All Works</Link>
                </div>

                <div className="grid grid-2">
                    {portfolioItems.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="portfolio-item"
                        >
                            <Link to={`/portfolio/${item._id}`} style={{ display: 'block', position: 'relative', overflow: 'hidden' }}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ height: '400px', width: '100%' }}
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </motion.div>
                                <div style={{ paddingTop: '15px' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-grey-light)', textTransform: 'uppercase' }}>{item.category?.name}</span>
                                    <h3 style={{ fontSize: '1.5rem', marginTop: '5px' }}>{item.title}</h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedPortfolio;
