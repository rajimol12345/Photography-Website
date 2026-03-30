import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';

const ContactEnquiryListScreen = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const { data } = await API.get('/api/admin/contact-enquiries');
                setEnquiries(data.enquiries || []);
            } catch (error) {
                console.error('Error fetching enquiries:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEnquiries();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this enquiry?')) {
            try {
                await API.delete(`/api/admin/contact-enquiries/${id}`);
                setEnquiries(enquiries.filter((enq) => enq._id !== id));
            } catch (error) {
                console.error('Error deleting enquiry:', error);
            }
        }
    };

    return (
        <div className="admin-list-screen">
            <div className="admin-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Contact Enquiries</h1>
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
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>DATE</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>STATUS</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiries.map((enq) => (
                            <tr key={enq._id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{enq._id}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{enq.name}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{enq.email}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(enq.createdAt).toLocaleDateString()}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{enq.status}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <Link to={`/admin/contact-enquiries/${enq._id}`} className="btn btn-edit" style={{ marginRight: '10px', textDecoration: 'none', display: 'inline-block', padding: '6px 12px', fontSize: '14px' }}>View</Link>
                                    <button onClick={() => deleteHandler(enq._id)} className="btn btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ContactEnquiryListScreen;
