import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroCarousel.module.css';

const HeroCarousel = () => {
    const slides = [
        {
            id: 1,
            image: '/assets/slider-1.webp',
            subtitle: 'Welcome to Snap',            title: 'Timeless Locations',
            description: 'Capturing moments in the most beautiful places.',
            link: '/portfolio'
        },
        {
            id: 2,
            image: '/assets/slider-2.jpeg',
            subtitle: 'Wedding Photography',
            title: 'Unforgettable Moments',
            description: 'Creating memories that last a lifetime.',
            link: '/contact'
        },
        {
            id: 3,
            image: '/assets/slider-3.jpg',
            subtitle: 'Portrait Studio',
            title: 'Natural Beauty',
            description: 'Professional portraits for you and your family.',
            link: '/about'
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextSlide = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [isAnimating, slides.length]);

    const prevSlide = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, [isAnimating, slides.length]);

    const goToSlide = (index) => {
        if (isAnimating || currentSlide === index) return;
        setIsAnimating(true);
        setCurrentSlide(index);
    };

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    // Reset animation state after transition
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 1000); // Match transition duration
        return () => clearTimeout(timer);
    }, [currentSlide]);

    return (
        <section className={styles.heroCarousel}>
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className={styles.overlay}></div>
                    <div className={styles.contentContainer}>
                        <div className={styles.content}>
                            <h5 className={`${styles.subtitle} ${index === currentSlide ? styles.animateSubtitle : ''}`}>
                                {slide.subtitle}
                            </h5>
                            <h1 className={`${styles.title} ${index === currentSlide ? styles.animateTitle : ''}`}>
                                {slide.title}
                            </h1>
                            {slide.description && (
                                <p className={`${styles.description} ${index === currentSlide ? styles.animateDesc : ''}`}>
                                    {slide.description}
                                </p>
                            )}
                            <div className={`${styles.btnWrapper} ${index === currentSlide ? styles.animateBtn : ''}`}>
                                <Link to={slide.link} className={styles.ctaBtn}>
                                    Find More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevSlide} aria-label="Previous Slide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>
            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextSlide} aria-label="Next Slide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>

            {/* Pagination Dots */}
            <div className={styles.pagination}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroCarousel;
