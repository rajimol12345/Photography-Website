import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from '../styles/Footer.module.css';

// Simple Icons
const MapPin = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const Phone = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);
const Mail = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const Footer = () => {
    return (
        <footer className={styles.footerSection}>
            <div className={styles.container}>
                <div className={styles.footerGrid}>

                    {/* Column 1: About Us */}
                    <div className={styles.footerColumn}>
                        <h3>About Us</h3>
                        <p className={styles.aboutText}>
                            We're Snap, a team of photographers & videographers. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Est sale definitiones id. Ut quo quem harum munere, eu labore voluptatum mei.
                        </p>
                    </div>

                    {/* Column 2: Contact Us */}
                    <div className={styles.footerColumn}>
                        <h3>Contact Us</h3>
                        <ul className={styles.contactList}>
                            <li className={styles.contactItem}>
                                <span className={styles.icon}><MapPin /></span>
                                40 Park Ave, Brooklyn, New York
                            </li>
                            <li className={styles.contactItem}>
                                <span className={styles.icon}><Phone /></span>
                                1-800-111-2222
                            </li>
                            <li className={styles.contactItem}>
                                <span className={styles.icon}><Phone /></span>
                                1-800-111-3333
                            </li>
                            <li className={styles.contactItem}>
                                <span className={styles.icon}><Mail /></span>
                                contact@example.com
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div className={styles.footerColumn}>
                        <h3>Quick Links</h3>
                        <ul className={styles.linkList}>
                            <li className={styles.linkItem}><Link to="/">Home</Link></li>
                            <li className={styles.linkItem}><Link to="/about">About</Link></li>
                            <li className={styles.linkItem}><Link to="/portfolio">Portfolio</Link></li>
                            <li className={styles.linkItem}><Link to="/faq">FAQ</Link></li>
                            <li className={styles.linkItem}><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Follow */}
                    <div className={styles.footerColumn}>
                        <h3>Follow</h3>
                        <ul className={styles.linkList}>
                            <li className={styles.linkItem}><a href="#">Facebook</a></li>
                            <li className={styles.linkItem}><a href="#">Twitter</a></li>
                            <li className={styles.linkItem}><a href="#">Instagram</a></li>
                            <li className={styles.linkItem}><a href="#">Youtube</a></li>
                            <li className={styles.linkItem}><a href="#">Vimeo</a></li>
                        </ul>
                    </div>

                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        2025 © Snap. Designed by MatchThemes.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
