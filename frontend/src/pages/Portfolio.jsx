import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PortfolioGrid from '../components/PortfolioGrid';

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const { data } = await axios.get('/api/portfolio');
        const items = Array.isArray(data) ? data : (data.portfolioItems || []);
        setPortfolioItems(items);
        const uniqueCategories = ['All', ...new Set(items.map(item => item.category))].filter(Boolean);
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Could not fetch portfolio items from server.');
        setLoading(false);
      }
    };
    fetchPortfolioData();
  }, []);

  if (loading) return null;

  return (
    <>
      <section className="page-header" style={{ backgroundImage: "url('/assets/slider-1.webp')" }}>
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content animated fadeInUp">
            <span className="section-subtitle" style={{ color: 'var(--white)' }}>Featured Photo Shoots</span>
            <h1 className="page-title">Portfolio Grid v1 3 Cols</h1>
            <div className="breadcrumbs">
              <Link to="/">Home</Link>
              <span className="separator">/</span>
              <span className="current">Portfolio Grid</span>
            </div>
          </div>
        </div>
      </section>

      <div className="section">
        <div className="container" style={{ maxWidth: '100%', padding: '0 30px' }}>
          {error && <div style={{ color: 'red', textAlign: 'center', margin: '20px 0' }}>{error} - Showing static demo data</div>}
          <PortfolioGrid portfolioItems={portfolioItems} filterCategories={categories} />
        </div>
      </div>
    </>
  );
};

export default Portfolio;
