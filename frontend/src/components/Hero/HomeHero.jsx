import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomeHero = () => {
    return (
        <section className="home-hero" style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-white)'
        }}>
            {/* Background Image */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                backgroundImage: 'url("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.6)'
            }} />

            <div className="container text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.2rem',
                        fontWeight: 300,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        marginBottom: '20px',
                        color: 'rgba(255,255,255,0.8)'
                    }}
                >
                    Photography Portfolio
                </motion.h2>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        fontSize: '4.5rem',
                        marginBottom: '40px',
                        color: 'var(--color-white)',
                        fontWeight: 400
                    }}
                >
                    Capturing Moments <br /> Creating Memories
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Link to="/portfolio" style={{
                        display: 'inline-block',
                        border: '1px solid var(--color-white)',
                        padding: '15px 40px',
                        color: 'var(--color-white)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-white)';
                            e.currentTarget.style.color = 'var(--color-black)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--color-white)';
                        }}>
                        View Portfolio
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center'
                }}
            >
                <div style={{
                    width: '1px',
                    height: '60px',
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    margin: '0 auto'
                }}>
                    <motion.div
                        animate={{ y: [0, 60, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            width: '100%',
                            height: '50%',
                            backgroundColor: 'var(--color-white)',
                        }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default HomeHero;
