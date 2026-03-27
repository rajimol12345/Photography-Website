import React, { useState } from 'react';
import axios from 'axios';
import './BookingPage.css';

const BookingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [message, setMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('loading');
    try {
      const bookingData = { name, email, phone, service, eventDate, numberOfPeople: Number(numberOfPeople), message };
      await axios.post('/api/bookings', bookingData);
      setSubmissionStatus('success');
      setName(''); setEmail(''); setPhone(''); setService(''); setEventDate(''); setNumberOfPeople(1); setMessage('');
    } catch (err) {
      setSubmissionStatus('error');
      const errorMsg = err.response?.data?.message || err.message;
      console.error('Booking Submission Failed:', errorMsg, err.response?.data);
    }
  };

  return (
    <div className="booking-page-container">
      {/* Container is now the centering wrapper */}

      <div className="booking-form-container">
        <h2 className="booking-title">Booking Form</h2>

        <form onSubmit={handleSubmit}>
          {submissionStatus === 'success' && (
            <div className="booking-message-success">
              <p>Request Received! We will contact you soon.</p>
            </div>
          )}

          {submissionStatus === 'error' && (
            <div className="booking-message-error">
              Something went wrong. Please try again.
            </div>
          )}

          <div className="booking-form-grid">
            {/* Row 1: Name, Email */}
            <div className="input-group">
              <label htmlFor="name" className="input-label-styled">Name*</label>
              <input
                type="text"
                id="name"
                className="form-control-styled"
                placeholder="First Last"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email" className="input-label-styled">Email*</label>
              <input
                type="email"
                id="email"
                className="form-control-styled"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Row 2: Phone, Service */}
            <div className="input-group">
              <label htmlFor="phone" className="input-label-styled">Phone*</label>
              <input
                type="tel"
                id="phone"
                className="form-control-styled"
                placeholder="+1 234 567 890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="service" className="input-label-styled">Service*</label>
              <select
                id="service"
                className="form-control-styled"
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
              >
                <option value="" disabled>Please Select</option>
                <option value="Wedding">Wedding</option>
                <option value="Portrait">Portrait</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>

            {/* Row 3: Event Date, People */}
            <div className="input-group">
              <label htmlFor="date" className="input-label-styled">Event Date*</label>
              <input
                type="date"
                id="date"
                className="form-control-styled"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="people" className="input-label-styled">Guests*</label>
              <input
                type="number"
                id="people"
                className="form-control-styled"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                min="1"
                required
              />
            </div>

            {/* Row 4: Message (Full Width) */}
            <div className="input-group full-width">
              <label htmlFor="message" className="input-label-styled">Message</label>
              <textarea
                id="message"
                className="form-control-styled"
                rows="3"
                placeholder="Any specific requests?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            {/* Row 5: Verification (Visual only per request) */}
            <div className="verification-group">
              <input type="checkbox" id="verification" className="verification-checkbox" required />
              <label htmlFor="verification" className="verification-label">I'm not a robot</label>
              {/* Visual placeholder for captcha icon could go here */}
            </div>
          </div>

          <button type="submit" className="btn-booking-submit" disabled={submissionStatus === 'loading'}>
            {submissionStatus === 'loading' ? 'BOOKING...' : 'BOOK'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
