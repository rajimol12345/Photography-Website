import React, { useState } from 'react';
import FilterBar from './FilterBar';
import PortfolioCard from './PortfolioCard';
import '../styles/PortfolioGrid.css';

const staticItems = [
    { id: 1, src: '/assets/gal-1-grid.jpg', title: 'Clara & Andrew', category: 'Lifestyle' },
    { id: 2, src: '/assets/gal-2-grid.jpg', title: 'Street People', category: 'Portrait' },
    { id: 3, src: '/assets/gal-3-grid.jpg', title: 'Ballet Dancers', category: 'Lifestyle' },
    { id: 4, src: '/assets/gal-4-grid.jpg', title: 'Black & White', category: 'Portrait' },
    { id: 5, src: '/assets/gal-5-grid.jpg', title: 'Traditional Royal Wedding', category: 'Wedding' },
    { id: 6, src: '/assets/gal-6-grid.jpg', title: 'Emma & Oliver | Beachside Wedding', category: 'Wedding' },
    { id: 7, src: '/assets/gal-7-grid.jpg', title: 'Evening Lights', category: 'Street' },
    { id: 8, src: '/assets/gal-8-grid.jpg', title: 'The Classic Portrait', category: 'Portrait' },
    { id: 9, src: '/assets/gal-9-grid.jpg', title: 'Nature Explorers', category: 'Lifestyle' },
    { id: 10, src: '/assets/gal-grid-14.jpg', title: 'Modern Architecture', category: 'Architecture' },
    { id: 11, src: '/assets/slider-3.jpg', title: 'Sophia & James Wedding', category: 'Wedding' },
];

const PortfolioGrid = ({ portfolioItems = [] }) => {
    // Merge static and dynamic items, preventing duplicates by title
    const uniqueItemsMap = new Map();
    [...staticItems, ...portfolioItems].forEach(item => {
        if (!uniqueItemsMap.has(item.title)) {
            uniqueItemsMap.set(item.title, item);
        }
    });
    const combinedItems = Array.from(uniqueItemsMap.values());
    const categories = [...new Set(combinedItems.map(item => item.category))].filter(cat => cat && cat !== 'All');

    const [activeFilter, setActiveFilter] = useState('All');

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    const filteredItems = activeFilter === 'All'
        ? combinedItems
        : combinedItems.filter(item => item.category === activeFilter);

    return (
        <>
            <FilterBar
                categories={categories}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
            />
            <section className="portfolio-grid-section">
                <div className="portfolio-grid-container">
                    {filteredItems.map(item => (
                        <PortfolioCard key={item._id || item.id} item={item} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default PortfolioGrid;