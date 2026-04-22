import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/ContactPage.module.css';
import InstagramStrip from '../components/InstagramStrip';
import API from '../api';

const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = React.useState({ loading: false, success: false, error: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: '' });

        try {
            await API.post('/api/contact-enquiries', formData);
            setStatus({ loading: false, success: true, error: '' });
            setFormData({ name: '', email: '', phone: '', message: '' });
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus({ loading: false, success: false, error: error.response?.data?.message || 'Failed to send message' });
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <div className={styles.contactPage}>

            {/* Main Content */}
            <div className={styles.container}>

                {/* Row 1: Intro Heading & Info */}
                <div className={styles.row}>
                    <div className={styles.leftColumn}>
                        <motion.h2
                            className={styles.introHeading}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            We're Ready to Work with You. Get in Touch
                        </motion.h2>
                    </div>
                    <div className={styles.rightColumn}>
                        <div className={styles.infoRow}>
                            <div className={styles.infoBlock}>
                                <h3 className={styles.sectionTitle}>Main Office</h3>
                                <div className={styles.infoList}>
                                    <p>40 Park Ave, Brooklyn, New York</p>
                                    <p>1-800-111-2222</p>
                                    <p>contact@example.com</p>
                                </div>
                            </div>
                            <div className={styles.infoBlock}>
                                <h3 className={styles.sectionTitle}>Social</h3>
                                <div className={styles.infoList}>
                                    <p><a href="#">Facebook</a></p>
                                    <p><a href="#">Twitter</a></p>
                                    <p><a href="#">Instagram</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 2: Map & Form */}
                <div className={`${styles.row} ${styles.rowContent}`}>
                    <div className={styles.leftColumn}>
                        <div className={styles.mapContainer}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564756242!5m2!1sen!2s"
                                className={styles.mapFrame}
                                allowFullScreen=""
                                loading="lazy"
                                title="Google Map"
                            ></iframe>
                        </div>
                    </div>
                    <div className={styles.rightColumn}>
                        <form className={styles.contactForm} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    name="name"
                                    className={styles.inputField}
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <input
                                    type="email"
                                    name="email"
                                    className={styles.inputField}
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    name="phone"
                                    className={styles.inputField}
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <textarea
                                    name="message"
                                    className={styles.textareaField}
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className={styles.submitBtn} disabled={status.loading}>
                                {status.loading ? 'Sending...' : 'Send message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <InstagramStrip />
        </div>
    );
};

export default Contact;
