import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="section bg-dark text-center" style={{ padding: '120px 0', backgroundColor: '#111' }}>
      <div className="container animated fadeInUp">
        <span className="section-subtitle" style={{ color: 'var(--white)', opacity: '0.6' }}>Let's Work Together</span>
        <h2 className="section-title" style={{ color: 'var(--white)', fontSize: '3.5rem', marginBottom: '50px' }}>
          Ready to capture your story?
        </h2>
        <div className="cta-buttons">
          <Link to="/contact" className="btn btn-hero" style={{ margin: '10px' }}>Contact Us</Link>
          <Link to="/book" className="btn btn-accent" style={{ margin: '10px' }}>Book Now</Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
