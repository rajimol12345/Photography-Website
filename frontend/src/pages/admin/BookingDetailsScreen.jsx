import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const BookingDetailsScreen = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const [statusUpdating, setStatusUpdating] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            setLoading(true);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await axios.get(`/api/admin/bookings/${id}`, config);
                setBooking(data);
            } catch (error) {
                console.error('Error fetching booking details:', error);
                setError('Failed to load booking details');
            } finally {
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchBooking();
        }
    }, [id, user]);

    const updateStatusHandler = async (newStatus) => {
        setStatusUpdating(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            const { data } = await axios.put(`/api/admin/bookings/${id}/status`, { status: newStatus }, config);
            setBooking(data);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        } finally {
            setStatusUpdating(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error} <Link to="/admin/bookings">Go Back</Link></div>;
    if (!booking) return <div>Booking not found</div>;

    return (
        <div className="admin-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Link to="/admin/bookings" className="btn btn-secondary">Go Back</Link>
                <h1>Booking Details</h1>
            </div>

            <div className="booking-card" style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                    <div>
                        <h3 style={{ margin: '0 0 10px 0' }}>{booking.name}</h3>
                        <p style={{ margin: '5px 0', color: '#666' }}><strong>Email:</strong> <a href={`mailto:${booking.email}`}>{booking.email}</a></p>
                        <p style={{ margin: '5px 0', color: '#666' }}><strong>Phone:</strong> {booking.phone}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '5px 0', fontSize: '1.2em', fontWeight: 'bold' }}>{booking.service}</p>
                        <p style={{ margin: '5px 0', color: '#999' }}>
                            {new Date(booking.eventDate).toLocaleDateString()}
                        </p>
                        <span style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            background: booking.status === 'confirmed' ? '#e8f5e9' : booking.status === 'cancelled' ? '#ffebee' : '#fff3e0',
                            color: booking.status === 'confirmed' ? '#2e7d32' : booking.status === 'cancelled' ? '#c62828' : '#ef6c00',
                            fontWeight: 'bold',
                            fontSize: '0.9em',
                            textTransform: 'uppercase',
                            display: 'inline-block',
                            marginTop: '10px'
                        }}>{booking.status}</span>
                    </div>
                </div>

                <div className="booking-info" style={{ marginBottom: '20px' }}>
                    <p><strong>Number of People:</strong> {booking.numberOfPeople}</p>
                </div>

                {booking.message && (
                    <div className="booking-message" style={{ marginBottom: '20px' }}>
                        <h4 style={{ marginTop: 0 }}>Message:</h4>
                        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', background: '#f9f9f9', padding: '15px', borderRadius: '4px' }}>
                            {booking.message}
                        </p>
                    </div>
                )}

                {booking.notes && (
                    <div className="booking-notes" style={{ marginBottom: '20px' }}>
                        <h4 style={{ marginTop: 0 }}>Admin Notes:</h4>
                        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', background: '#fffde7', padding: '15px', borderRadius: '4px' }}>
                            {booking.notes}
                        </p>
                    </div>
                )}

                <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                    {booking.status !== 'confirmed' && (
                        <button
                            onClick={() => updateStatusHandler('confirmed')}
                            disabled={statusUpdating}
                            className="btn btn-primary"
                            style={{ backgroundColor: '#2e7d32' }}
                        >
                            Confirm Booking
                        </button>
                    )}
                    {booking.status !== 'cancelled' && (
                        <button
                            onClick={() => updateStatusHandler('cancelled')}
                            disabled={statusUpdating}
                            className="btn btn-primary"
                            style={{ backgroundColor: '#c62828' }}
                        >
                            Cancel Booking
                        </button>
                    )}
                    {booking.status !== 'completed' && booking.status === 'confirmed' && (
                        <button
                            onClick={() => updateStatusHandler('completed')}
                            disabled={statusUpdating}
                            className="btn btn-primary"
                        >
                            Mark Completed
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsScreen;
