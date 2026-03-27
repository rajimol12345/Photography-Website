import React from 'react';
import '../styles/InstagramStrip.css';

// Placeholder Icon
const InstagramIcon = () => <i className="fab fa-instagram"></i>;

const InstagramStrip = () => {
    const images = [
        { id: 1, src: '/assets/insta-1.webp', alt: 'Instagram 1' },
        { id: 2, src: '/assets/insta-2.jpeg', alt: 'Instagram 2' },
        { id: 3, src: '/assets/insta-3.webp', alt: 'Instagram 3' },
        { id: 4, src: '/assets/insta-4.webp', alt: 'Instagram 4' },
        { id: 5, src: '/assets/insta-5.jpeg', alt: 'Instagram 5' },
        { id: 6, src: '/assets/insta-6.jpeg', alt: 'Instagram 6' },
    ];

    return (
        <section className="instagram-strip-section">
            {images.map(image => (
                <a key={image.id} href="#" className="instagram-item">
                    <img src={image.src} alt={image.alt} />
                    <div className="overlay">
                        <InstagramIcon />
                    </div>
                </a>
            ))}
        </section>
    );
};

export default InstagramStrip;
