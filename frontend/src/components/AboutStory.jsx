import React, { useState, useEffect, useRef } from 'react';
import '../styles/AboutStory.css';

// Animated Counter Component
const Counter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => {
            if (countRef.current) {
                observer.unobserve(countRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const endValue = parseInt(end);
        if (start === endValue) return;

        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * endValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, isVisible]);

    return <span ref={countRef}>{count}</span>;
};

// SVG Components for Pixel-Perfect Detail
const WavyLine = () => (
    <svg width="60" height="10" viewBox="0 0 60 10" className="wavy-line-svg">
        <path d="M0 5 Q 7.5 0, 15 5 T 30 5 T 45 5 T 60 5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const AboutStory = () => {
    return (
        <section className="about-story-section">
            <div className="about-story-container">
                <div className="about-story-left">
                    <div className="section-label-wrapper">
                        <p className="section-label">Our Story</p>
                        <WavyLine />
                    </div>
                    <h2 className="section-heading">Snap is a Wedding & Portrait Studio based in New York</h2>

                    <div className="awards-row">
                        <img src="/assets/award-1.png" alt="Award 1" className="award-image" />
                        <img src="/assets/award-2.png" alt="Award 2" className="award-image" />
                        <img src="/assets/award-3.png" alt="Award 3" className="award-image" />
                    </div>

                    <div className="about-stats-experience mt-5 pt-4">
                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-number"><Counter end="12" />+</span>
                                <span className="stat-label">Years of <br />Experience</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number"><Counter end="850" />+</span>
                                <span className="stat-label">Happy <br />Clients</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number"><Counter end="25" />+</span>
                                <span className="stat-label">Industry <br />Awards</span>
                            </div>
                        </div>
                        <p className="philosophy-note mt-4">
                            "We don't just take pictures, we capture the soul of the moment. Every click is a story waiting to be told."
                        </p>
                    </div>
                </div>
                <div className="about-story-right">
                    <div className="story-content">
                        <div className="story-image-wrapper mb-5">
                            <img src="/assets/about-img.png" alt="Our Story" style={{ width: '100%', borderRadius: '5px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                        </div>
                        <p>
                            Veri ubique cu eam, vero dicta ridens ei quo, ex putent menandri accommodare sed. Suscipit lobortis prodesset ut eam. Sale dicta dolore pri et, an aliquam albucius volutpat est.
                        </p>
                        <div className="bullet-list-grid">
                            <ul className="snap-bullets">
                                <li>We love what we do</li>
                                <li>We are transparent</li>
                                <li>We listen to your needs</li>
                            </ul>
                            <ul className="snap-bullets">
                                <li>We are respectful</li>
                                <li>We listen to your needs</li>
                                <li>We love what we do</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutStory;