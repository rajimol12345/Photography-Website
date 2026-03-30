import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const FeaturedPortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data } = await API.get('/api/portfolio');
        const items = Array.isArray(data) ? data : (data.portfolioItems || []);
        setPortfolioItems(items.filter(item => item.isFeatured && item.isPublic).slice(0, 6));
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading || error || portfolioItems.length === 0) return null;

  return (
    <section className="section featured-portfolio">
      <div className="container">
        <div className="portfolio-header animated fadeInUp" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
          <div>
            <span className="section-subtitle" style={{ color: 'var(--accent)' }}>Portfolio</span>
            <h2 className="section-title" style={{ margin: 0 }}>Selected Work</h2>
          </div>
          <Link to="/portfolio" className="btn btn-outline" style={{ fontSize: '10px', padding: '10px 25px' }}>View Portfolio</Link>
        </div>

        <div className="portfolio-grid-masonry">
          {portfolioItems.map((item, index) => (
            <div key={item._id} className={`portfolio-item-v2 animated fadeInUp item-${index % 10}`}>
              <img src={item.imageUrl} alt={item.title} />
              <div className="portfolio-overlay-v2">
                <span className="item-category">{item.category?.name}</span>
                <h3><Link to={`/portfolio/${item._id}`}>{item.title}</Link></h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPortfolio;
