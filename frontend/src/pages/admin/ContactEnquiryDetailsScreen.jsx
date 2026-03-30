import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';

const ContactEnquiryDetailsScreen = () => {
    const { id } = useParams();
    const [enquiry, setEnquiry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    // Status update state (optional, if you want inline updates)
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchEnquiry = async () => {
            setLoading(true);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await API.get(`/api/admin/contact-enquiries/${id}`, config);
                setEnquiry(data);
            } catch (error) {
                console.error('Error fetching enquiry details:', error);
                setError('Failed to load enquiry details');
            } finally {
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchEnquiry();
        }
    }, [id, user]);

    const markAsReadHandler = async () => {
        if (!enquiry) return;
        setUpdating(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            // Assuming PUT /:id updates the status, or a specific endpoint
            // Based on router: PUT /:id calls updateEnquiryStatus
            const { data } = await API.put(`/api/admin/contact-enquiries/${id}`, { status: 'read' }, config);
            setEnquiry(data);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error} <Link to="/admin/contact-enquiries">Go Back</Link></div>;
    if (!enquiry) return <div>Enquiry not found</div>;

    return (
        <div className="admin-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Link to="/admin/contact-enquiries" className="btn btn-secondary">Go Back</Link>
                <h1>Enquiry Details</h1>
            </div>

            <div className="enquiry-card" style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>{enquiry.name}</h3>
                    <p style={{ margin: '5px 0', color: '#666' }}><strong>Email:</strong> <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a></p>
                    {enquiry.phone && <p style={{ margin: '5px 0', color: '#666' }}><strong>Phone:</strong> {enquiry.phone}</p>}
                    <p style={{ margin: '5px 0', color: '#999', fontSize: '0.9em' }}>
                        <strong>Date:</strong> {new Date(enquiry.createdAt).toLocaleString()}
                    </p>
                    <p style={{ margin: '5px 0' }}>
                        <strong>Status: </strong>
                        <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            background: enquiry.status === 'new' ? '#e3f2fd' : '#e8f5e9',
                            color: enquiry.status === 'new' ? '#1976d2' : '#2e7d32',
                            fontWeight: 'bold',
                            fontSize: '0.85em',
                            textTransform: 'uppercase'
                        }}>{enquiry.status}</span>
                    </p>
                </div>

                <div className="enquiry-message">
                    <h4 style={{ marginTop: 0 }}>Message:</h4>
                    <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', background: '#f9f9f9', padding: '15px', borderRadius: '4px' }}>
                        {enquiry.message}
                    </p>
                </div>

                {enquiry.status === 'new' && (
                    <div style={{ marginTop: '30px', textAlign: 'right' }}>
                        <button
                            onClick={markAsReadHandler}
                            disabled={updating}
                            className="btn btn-primary"
                        >
                            {updating ? 'Updating...' : 'Mark as Read'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactEnquiryDetailsScreen;
