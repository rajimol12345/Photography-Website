import React from 'react';
import { Link } from 'react-router-dom';

const AboutPreview = () => {
  return (
    <section className="section about-preview section-padding">
      <div className="container">
        <div className="row align-items-center">
          {/* Image Column */}
          <div className="col-lg-6 mb-5 mb-lg-0 animated fadeInUp">
            <div className="about-image-wrapper">
              <img src="/assets/img-aboutus.jpg" alt="About Snap Studio" className="img-fluid" />
            </div>
          </div>

          {/* Content Column */}
          <div className="col-lg-6 pl-lg-5 animated fadeInUp">
            <span className="section-subtitle">Our Story</span>
            <h2 className="section-title mb-4">Snap is a Wedding & Portrait Studio based in New York</h2>

            <p className="about-description mb-4">
              We love photography and travel for meeting new beautiful people all over the world.
              Propriae voluptaria dissentias nam ei, posse diceret inciderint cum ut, gubergren sadipscing ei vim.
            </p>

            <div className="about-awards mb-5">
              <div className="d-flex justify-content-between flex-wrap">
                <div className="award-item text-center mb-3">
                  <img src="/assets/award-1.png" alt="Best Portrait 2020" style={{ maxHeight: '60px', marginBottom: '10px' }} />
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Wedding Photo Award 2020</div>
                </div>
                <div className="award-item text-center mb-3">
                  <img src="/assets/award-2.png" alt="Best Wedding 2021" style={{ maxHeight: '60px', marginBottom: '10px' }} />
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Best Photographers 2021</div>
                </div>
                <div className="award-item text-center mb-3">
                  <img src="/assets/award-3.png" alt="Top Studio 2022" style={{ maxHeight: '60px', marginBottom: '10px' }} />
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Modern Photographers 2022</div>
                </div>
              </div>
            </div>

            <ul className="about-list list-unstyled">
              <li className="mb-2"><Link to="/portfolio?category=Wedding" style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ddd', paddingBottom: '2px' }}>Wedding Photography</Link></li>
              <li className="mb-2"><Link to="/portfolio?category=Portrait" style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ddd', paddingBottom: '2px' }}>Portrait Photography</Link></li>
              <li className="mb-2"><Link to="/portfolio?category=Fashion" style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ddd', paddingBottom: '2px' }}>Fashion Photography</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
