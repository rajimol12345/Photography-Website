import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BookingEditScreen = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const { data } = await axios.get(`/api/admin/bookings/${id}`);
                setBooking(data);
                setStatus(data.status || 'Pending');
                setLoading(false);
            } catch (error) {
                console.error('Error fetching booking:', error);
                setLoading(false);
            }
        };

        fetchBooking();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/admin/bookings/${id}`, { status });
            navigate('/admin/bookings');
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!booking) return <div>Booking not found</div>;

    return (
        <div className="admin-form-screen">
            <h1>Review Booking</h1>
            <div className="booking-details" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #eee' }}>
                <p><strong>Name:</strong> {booking.name}</p>
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>Service:</strong> {booking.serviceType}</p>
                <p><strong>Date:</strong> {new Date(booking.eventDate).toLocaleDateString()}</p>
                <p><strong>People:</strong> {booking.numberOfPeople}</p>
                <p><strong>Message:</strong> {booking.message}</p>
            </div>

            <form onSubmit={submitHandler} style={{ maxWidth: '400px' }}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Update Status
                </button>
            </form>
        </div>
    );
};

export default BookingEditScreen;
