import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookingListScreen = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await axios.get('/api/admin/bookings');
                setBookings(data.bookings || []);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div className="admin-list-screen">
            <div className="admin-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Bookings</h1>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>NAME</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>EMAIL</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>SERVICE</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>DATE</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>STATUS</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{booking._id}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{booking.name}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{booking.email}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{booking.service}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(booking.eventDate).toLocaleDateString()}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{booking.status || 'New'}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <Link to={`/admin/bookings/${booking._id}`} className="btn btn-edit" style={{ textDecoration: 'none', display: 'inline-block', padding: '6px 12px', fontSize: '14px', backgroundColor: '#5F7D72', color: 'white' }}>View Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookingListScreen;
