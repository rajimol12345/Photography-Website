import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';

const TestimonialListScreen = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const { user } = useAuth();

    useEffect(() => {
        const fetchTestimonials = async () => {
            // Reset loading to false if we are just changing pages (optional, but good UI)
            // Actually good to keep it simple
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await API.get(`/api/admin/testimonials?pageNumber=${page}`, config);
                setTestimonials(data.testimonials || []);
                setPages(data.pages || 1);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchTestimonials();
        }
    }, [page, user]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                await API.delete(`/api/admin/testimonials/${id}`, config);
                // Re-fetch or filter. Filtering is faster ui.
                setTestimonials(testimonials.filter((t) => t._id !== id));
            } catch (error) {
                console.error('Error deleting testimonial:', error);
            }
        }
    };

    return (
        <div className="admin-list-screen">
            <div className="admin-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Testimonials</h1>
                <Link to="/admin/testimonials/create" className="btn btn-primary">Create Testimonial</Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                            <thead>
                                <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>AUTHOR</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>DATE</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.map((t) => (
                                    <tr key={t._id}>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{t._id}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{t.clientName}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(t.createdAt).toLocaleDateString()}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                            <Link to={`/admin/testimonials/${t._id}/edit`} className="btn btn-edit" style={{ marginRight: '10px', textDecoration: 'none', display: 'inline-block', padding: '6px 12px', fontSize: '14px', backgroundColor: '#5F7D72', color: 'white' }}>Edit</Link>
                                            <button
                                                onClick={() => deleteHandler(t._id)}
                                                className="btn btn-delete"
                                                style={{ cursor: 'pointer', color: 'red', border: 'none', background: 'none' }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {pages > 1 && (
                        <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <button
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                style={{ padding: '6px 12px', marginRight: '10px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                            >
                                Previous
                            </button>
                            <span style={{ padding: '6px 12px' }}>Page {page} of {pages}</span>
                            <button
                                onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
                                disabled={page === pages}
                                style={{ padding: '6px 12px', marginLeft: '10px', cursor: page === pages ? 'not-allowed' : 'pointer' }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TestimonialListScreen;
