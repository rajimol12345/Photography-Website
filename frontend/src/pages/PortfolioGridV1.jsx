import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PortfolioGrid from '../components/PortfolioGrid';
import InstagramStrip from '../components/InstagramStrip';

const PortfolioGridV1 = () => {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const { data } = await axios.get('/api/portfolio');
                const items = Array.isArray(data) ? data : (data.portfolioItems || []);
                setPortfolioItems(items);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching portfolio:', err);
                setError('Could not fetch portfolio items from server.');
                setLoading(false);
            }
        };
        fetchPortfolioData();
    }, []);

    return (
        <div className="portfolio-grid-v1-page">
            <main>
                <div className="container" style={{ padding: '80px 0' }}>
                    {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</div>}
                    <PortfolioGrid portfolioItems={portfolioItems} />
                </div>
                <InstagramStrip />
            </main>
        </div>
    );
};

export default PortfolioGridV1;