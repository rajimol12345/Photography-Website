import React from 'react';
import '../styles/ServicesSection.css';

// Placeholder icons
// Custom Tilia-style icons
const CameraIcon = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="16" width="48" height="36" rx="4" />
        <circle cx="32" cy="34" r="10" />
        <path d="M20 16 L24 10 H40 L44 16" />
        <circle cx="50" cy="22" r="1.5" fill="#222" stroke="none" />
    </svg>
);

const VideoIcon = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="14" width="36" height="36" rx="4" />
        <path d="M44 24 L56 16 V48 L44 40" />
        <circle cx="26" cy="32" r="6" />
    </svg>
);

const DroneIcon = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 32 m-6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0" />
        <path d="M12 16 L26 32" />
        <path d="M52 16 L38 32" />
        <path d="M12 48 L26 32" />
        <path d="M52 48 L38 32" />
        <path d="M8 16 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0" />
        <path d="M48 16 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0" />
        <path d="M8 48 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0" />
        <path d="M48 48 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0" />
    </svg>
);

const AlbumIcon = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="10" width="40" height="44" rx="2" />
        <path d="M12 10 H 8 V 48 A 2 2 0 0 0 10 50 H 52" />
        <path d="M22 20 L28 28 L36 20 L52 38 H12 Z" />
        <circle cx="40" cy="18" r="3" />
    </svg>
);

const LocationIcon = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 58 C 32 58 50 36 50 24 C 50 14 42 6 32 6 C 22 6 14 14 14 24 C 14 36 32 58 32 58 Z" />
        <circle cx="32" cy="24" r="6" />
    </svg>
);

const EventsIcon = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="14" width="44" height="40" rx="2" />
        <path d="M10 24 H 54" />
        <path d="M20 8 V 18" />
        <path d="M44 8 V 18" />
    </svg>
);


const ServicesSection = () => {
    const services = [
        {
            id: 1,
            icon: <CameraIcon />,
            title: 'Photography',
            description: 'We capture your most precious moments and turn them into timeless memories.'
        },
        {
            id: 2,
            icon: <VideoIcon />,
            title: 'Videography',
            description: 'We create beautiful and emotional videos that you will cherish for a lifetime.'
        },
        {
            id: 3,
            icon: <DroneIcon />,
            title: 'Drone',
            description: 'We use the latest drone technology to capture stunning aerial shots.'
        },
        {
            id: 4,
            icon: <AlbumIcon />,
            title: 'Photo Albums',
            description: 'We design and create beautiful photo albums that you will love to share.'
        },
        {
            id: 5,
            icon: <LocationIcon />,
            title: 'Locations',
            description: 'We can help you find the perfect location for your photo shoot.'
        },
        {
            id: 6,
            icon: <EventsIcon />,
            title: 'Events',
            description: 'We cover all types of events, from weddings to corporate events.'
        },
    ];

    return (
        <section className="services-section">
            <div className="services-container">
                {services.map(service => (
                    <div key={service.id} className="service-block">
                        <div className="icon">{service.icon}</div>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-description">{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;
