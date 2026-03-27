import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PortfolioCard.css';

const PortfolioCard = ({ item }) => {
    return (
        <div className="portfolio-card">
            <div className="portfolio-card-image">
                <Link to="#">
                    <img src={item.imageUrl || item.src} alt={item.title} />
                </Link>
            </div>
            <div className="portfolio-card-content">
                <h3 className="card-title">
                    <Link to="#">{item.title}</Link>
                </h3>
                <p className="card-category">
                    {typeof item.category === 'object' ? item.category?.name : item.category}
                </p>
            </div>
        </div>
    );
};

export default PortfolioCard;
