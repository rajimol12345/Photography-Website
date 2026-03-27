import React from 'react';
import '../styles/ServicesGrid.css';

// Placeholder SVG icons similar to the reference
const WeddingIcon = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M32 54 C 42 54 50 42 50 32 C 50 22 42 10 32 10 C 22 10 14 22 14 32 C 14 42 22 54 32 54 Z" />
        <path d="M32 40 L 40 32 L 32 24 L 24 32 Z" />
    </svg>
);
const PortraitIcon = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="12" y="12" width="40" height="40" rx="4" />
        <circle cx="32" cy="28" r="6" />
        <path d="M20 44 C 20 36 24 32 32 32 C 40 32 44 36 44 44" />
    </svg>
);
const FashionIcon = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 20 L 32 10 L 44 20 L 44 44 L 32 54 L 20 44 Z" />
        <path d="M32 32 L 44 20" />
        <path d="M20 20 L 32 32" />
    </svg>
);
const EditorialIcon = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="10" y="14" width="44" height="36" />
        <path d="M10 24 L 54 24" />
        <path d="M24 14 L 24 50" />
    </svg>
);


const ServicesGrid = () => {
    const services = [
        { 
            id: 1, 
            icon: <WeddingIcon />, 
            title: 'Weddings',
            description: 'Est sale definitiones id. Ut quo quem harum munere, eu labore voluptatum mei.'
        },
        { 
            id: 2, 
            icon: <PortraitIcon />, 
            title: 'Portraits',
            description: 'Est sale definitiones id. Ut quo quem harum munere, eu labore voluptatum mei.'
        },
        { 
            id: 3, 
            icon: <FashionIcon />, 
            title: 'Fashion',
            description: 'Est sale definitiones id. Ut quo quem harum munere, eu labore voluptatum mei.'
        },
        { 
            id: 4, 
            icon: <EditorialIcon />, 
            title: 'Editorial',
            description: 'Est sale definitiones id. Ut quo quem harum munere, eu labore voluptatum mei.'
        },
    ];

    return (
        <section className="services-grid-section">
            <div className="services-grid-container">
                {services.map(service => (
                    <div key={service.id} className="service-card">
                        <div className="icon">{service.icon}</div>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-description">{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesGrid;
