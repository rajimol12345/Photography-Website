import React from 'react';
import '../styles/PageHeader.css';

const PageHeader = ({ title, subtitle, backgroundImage }) => {
    return (
        <section 
            className="page-header-section" 
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="page-header-content">
                <h1 className="page-header-title">{title}</h1>
                <p className="page-header-subtitle">{subtitle}</p>
            </div>
        </section>
    );
};

export default PageHeader;