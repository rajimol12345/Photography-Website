import React from 'react';
import '../styles/ClientLogos.css';

const ClientLogos = () => {
    const logos = [
        { id: 1, src: '/assets/logo-biz1.png', alt: 'Client 1' },
        { id: 2, src: '/assets/logo-biz2.png', alt: 'Client 2' },
        { id: 3, src: '/assets/logo-biz3.png', alt: 'Client 3' },
        { id: 4, src: '/assets/logo-biz4.png', alt: 'Client 4' },
        { id: 5, src: '/assets/logo-biz5.png', alt: 'Client 5' },
        { id: 6, src: '/assets/logo-biz6.png', alt: 'Client 6' },
        { id: 7, src: '/assets/logo-biz7.png', alt: 'Client 7' },
        { id: 8, src: '/assets/logo-biz8.png', alt: 'Client 8' },
    ];

    return (
        <section className="client-logos-section">
            <div className="client-logos-container">
                {logos.map(logo => (
                    <div key={logo.id} className="client-logo">
                        <img src={logo.src} alt={logo.alt} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ClientLogos;