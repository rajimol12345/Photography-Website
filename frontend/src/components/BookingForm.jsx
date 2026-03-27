import React from 'react';
import '../styles/BookingSection.css';

const BookingForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for submission logic
        alert('Message sent!');
    };

    return (
        <section className="booking-section">
            <div className="container">
                <div className="booking-section-row">
                    <div className="booking-content">
                        <span className="section-subtitle">Get In Touch</span>
                        <h2 className="section-title">Book Us for Your Event</h2>
                        <p>
                            Ad graeci theophrastus, libris timeam sapientem. Pellentes faucibus sollicitudin ante, at porta felis rutrum eget. Sed ut nisl urna,e get convallis purus pretium facilisis. Interdum et malesuada varius mauris eu commodo.
                        </p>
                    </div>
                    <div className="booking-form-container-section">
                        <form className="booking-form" onSubmit={handleSubmit}>
                            <div className="booking-form-grid-row">
                                <input type="text" placeholder="Name" className="form-control-section" required />
                                <input type="email" placeholder="Email" className="form-control-section" required />
                                <input type="tel" placeholder="Phone" className="form-control-section" />
                            </div>
                            <textarea placeholder="Message" className="form-control-section" required></textarea>
                            <button type="submit" className="btn-booking-section">Send message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingForm;
