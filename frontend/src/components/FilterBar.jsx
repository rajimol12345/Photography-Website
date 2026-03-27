import React from 'react';
import '../styles/FilterBar.css';

const FilterBar = ({ categories, activeFilter, onFilterChange }) => {
    return (
        <section className="filter-bar-section">
            <div className="filter-bar-container">
                <button 
                    onClick={() => onFilterChange('All')}
                    className={activeFilter === 'All' ? 'active' : ''}
                >
                    Show All
                </button>
                {categories.map(category => (
                    <button 
                        key={category}
                        onClick={() => onFilterChange(category)}
                        className={activeFilter === category ? 'active' : ''}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default FilterBar;
