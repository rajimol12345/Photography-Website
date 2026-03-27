import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CTA.css';

const CTA = () => {
    return (
        <section className="cta-section">
            <div className="cta-content">
                <h2 className="cta-heading">Looking for a photographer or videographer?</h2>
                <Link to="/contact" className="cta-button">Get In Touch</Link>
            </div>
        </section>
    );
};

export default CTA;
