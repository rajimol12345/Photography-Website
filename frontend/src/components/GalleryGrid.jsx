import React from 'react';
import '../styles/GalleryGrid.css';

const GalleryGrid = ({ images = [] }) => {
    return (
        <section className="gallery-grid-section">
            <div className="gallery-grid-container">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={image.id || index} className="gallery-item">
                            <img src={image.src} alt={`Gallery item ${index + 1}`} />
                        </div>
                    ))
                ) : (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No images found in the gallery.</p>
                )}
            </div>
        </section>
    );
};

export default GalleryGrid;