import React, { useEffect, useState } from 'react';
import API from '../../api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PortfolioGrid = ({ columns = 3 }) => {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const mockItems = Array.from({ length: 9 }).map((_, i) => ({
        _id: i.toString(),
        title: `Project ${i + 1}`,
        category: 'Photography',
        imageUrl: `https://picsum.photos/seed/${i + 10}/800/1000` // Vertical aspect ratio
    }));

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const { data } = await API.get('/api/portfolio').catch(() => ({ data: [] }));
                const items = (Array.isArray(data) ? data : (data?.portfolioItems || []));
                setPortfolioItems(items.length > 0 ? items : mockItems);
                setLoading(false);
            } catch (err) {
                setPortfolioItems(mockItems);
                setLoading(false);
            }
        };
        fetchPortfolio();
    }, []);

    // Grid columns style
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 'var(--spacing-md)'
    };

    if (loading) return null;

    return (
        <section className="section-padding">
            <div className="container">
                {/* Filter placeholders could go here */}

                <div style={gridStyle}>
                    {portfolioItems.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link to={`/portfolio/${item._id}`} className="portfolio-item-hover">
                                <div style={{ overflow: 'hidden', position: 'relative' }}>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ width: '100%', aspectRatio: '4/5' }}
                                    >
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        {/* Overlay */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: 'rgba(255,255,255,0.9)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                padding: '20px'
                                            }}
                                        >
                                            <span style={{ fontSize: '0.9rem', color: 'var(--color-grey-medium)', textTransform: 'uppercase', marginBottom: '10px' }}>
                                                {item.category?.name}
                                            </span>
                                            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{item.title}</h3>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
            {/* Simple Responsive Fix for Mobile */}
            <style>{`
                @media (max-width: 768px) {
                    div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default PortfolioGrid;
