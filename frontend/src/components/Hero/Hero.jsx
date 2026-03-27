import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = ({ image, title, subtitle, breadcrumbs, fullScreen = true }) => {
  // We stack a linear gradient on top of the image URL
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${image})`,
  };

  return (
    <section className={`hero-section ${fullScreen ? 'full-screen' : ''}`} style={heroStyle}>
      <div className="hero-content">
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        {title && <h1>{title}</h1>}
        
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="breadcrumbs">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.path || index}>
                {crumb.path ? (
                  <Link to={crumb.path}>{crumb.label}</Link>
                ) : (
                  <span className="current-crumb">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <span className="separator"> / </span>}
              </React.Fragment>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
};

export default Hero;