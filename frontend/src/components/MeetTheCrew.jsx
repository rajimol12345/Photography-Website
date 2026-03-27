import React from 'react';
import '../styles/MeetTheCrew.css';

const MeetTheCrew = () => {
    return (
        <section className="meet-the-crew-section">
            <div className="meet-the-crew-container">
                <div className="meet-the-crew-left">
                    <p className="section-label">About</p>
                    <h2 className="section-heading">Meet the Crew</h2>
                    <p>
                        Veri ubique cu eam, vero dicta ridens ei quo, ex putent menandri accommodare sed. Suscipit lobortis prodesset ut eam. Sale dicta dolore pri et, an aliquam albucius volutpat est.
                    </p>
                    <p>
                        Ad graeci theophrastus, libris timeam sapientem. Pellentes faucibus sollicitudin ante, at porta felis rutrum eget. Sed ut nisl urna,e get convallis purus pretium facilisis. Interdum et malesuada varius mauris eu commodo.
                    </p>
                </div>
                <div className="meet-the-crew-right">
                    <img src="/assets/about-img.png" alt="Meet the Crew" />
                </div>
            </div>
        </section>
    );
};

export default MeetTheCrew;
