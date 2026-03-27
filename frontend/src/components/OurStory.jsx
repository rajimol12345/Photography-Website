import React from 'react';

const OurStory = () => {
  // Placeholder images for awards
  const award1 = '/assets/awards-1.png';
  const award2 = '/assets/awards-2.png';
  const award3 = '/assets/awards-3.png';

  return (
    <section className="our-story-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mb-5">
            <span className="section-subtitle">Meet the Crew</span>
            <h2 className="section-title">We're Snap, a team of photographers & videographers.</h2>
          </div>
        </div>
        <div className="story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}>
          <div className="story-content">
            <h4 style={{ marginBottom: '20px' }}>Working with Snap team sit amet orci eget eros faucibus tincidunt. Duis leo. Sed ringilla mauris sit amet nibh.</h4>
            <p>
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis justo.
            </p>
            <p>
              Ad graeci theophrastus, libris timeam sapientem. Pellentes faucibus sollicitudin ante,at porta felisrutrum eget. Sed ut nisl urna,e get convallis purus pretium facilisis.
            </p>
          </div>
          <div className="story-image">
            <img src="/assets/img-about.jpg" alt="About Us" style={{ width: '100%', borderRadius: '5px' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
