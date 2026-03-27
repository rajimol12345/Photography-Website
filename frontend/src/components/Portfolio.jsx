import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Portfolio.css';

const portfolioItems = [
    { id: 1, src: '/assets/gal-1-grid.jpg', title: 'The Bride', category: 'Wedding' },
    { id: 2, src: '/assets/gal-2-grid.jpg', title: 'The Groom', category: 'Portraits' },
    { id: 3, src: '/assets/gal-3-grid.jpg', title: 'Ceremony', category: 'Wedding' },
    { id: 4, src: '/assets/gal-4-grid.jpg', title: 'The Cake', category: 'Details' },
    { id: 5, src: '/assets/gal-5-grid.jpg', title: 'Details', category: 'Photography' },
    { id: 6, src: '/assets/gal-6-grid.jpg', title: 'The Kiss', category: 'Wedding' },
    { id: 7, src: '/assets/gal-7-grid.jpg', title: 'The Dance', category: 'Fashion' },
    { id: 8, src: '/assets/gal-8-grid.jpg', title: 'The Bouquet', category: 'Fashion' },
    { id: 9, src: '/assets/gal-9-grid.jpg', title: 'The Vows', category: 'Wedding' },
    { id: 10, src: '/assets/gal-grid-14.jpg', title: 'The Guests', category: 'Event' },
];

const Portfolio = () => {
    return (
        <section className="portfolio-section">
            <div className="container">
                <div className="portfolio-header-wrapper">
                    <div className="portfolio-header-left">
                        <span className="section-subtitle">Our Portfolio</span>
                        <h2 className="section-title">Selected Work</h2>
                    </div>
                    <div className="portfolio-header-right">
                        <Link to="/portfolio" className="btn-outline">VIEW ALL WORKS</Link>
                    </div>
                </div>
                
                <div className="portfolio-masonry-grid">
                    {portfolioItems.slice(0, 6).map(item => (
                        <div key={item.id} className="portfolio-card-item">
                            <div className="portfolio-image-wrapper">
                                <img src={item.src} alt={item.title} className="img-fluid" />
                                <div className="portfolio-hover-overlay">
                                    <div className="hover-content">
                                        <span className="portfolio-cat">{item.category}</span>
                                        <h4 className="portfolio-name">{item.title}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;