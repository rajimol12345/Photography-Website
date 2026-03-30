import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';

const GalleryListScreen = () => {
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [error, setError] = useState(null);

    const { user } = useAuth(); // Access user context to ensure headers are ready or use explicitly

    useEffect(() => {
        const fetchGalleries = async () => {
            setLoading(true); // Start loading
            setError(null);
            try {
                // Determine headers explicitly to avoid race conditions on refresh
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await API.get(`/api/admin/galleries?pageNumber=${page}`, config);
                setGalleries(data.galleries || []);
                setPages(data.pages || 1);
            } catch (error) {
                console.error('Error fetching galleries:', error);
                setError('Failed to fetch galleries.');
            } finally {
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchGalleries();
        }
    }, [page, user]); // Re-run if user/token becomes available (fixes refresh race)

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this gallery?')) {
            try {
                await API.delete(`/api/admin/galleries/${id}`);
                setGalleries(galleries.filter((gal) => gal._id !== id));
            } catch (error) {
                console.error('Error deleting gallery:', error);
            }
        }
    };

    return (
        <div className="admin-list-screen">
            <div className="admin-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Galleries</h1>
                <Link to="/admin/galleries/create" className="btn btn-primary">Create Gallery</Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                        <thead>
                            <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>NAME</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>CATEGORY</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ITEMS COUNT</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {galleries.map((gal) => (
                                <tr key={gal._id}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{gal._id}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{gal.name}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{gal.category?.name || gal.category}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{gal.items ? gal.items.length : 0}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                        <Link to={`/admin/galleries/${gal._id}/edit`} className="btn btn-edit" style={{ marginRight: '10px' }}>Edit</Link>
                                        <button onClick={() => deleteHandler(gal._id)} className="btn btn-delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    {pages > 1 && (
                        <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                style={{ padding: '5px 10px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                            >
                                Previous
                            </button>
                            <span>Page {page} of {pages}</span>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page === pages}
                                style={{ padding: '5px 10px', cursor: page === pages ? 'not-allowed' : 'pointer' }}
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

export default GalleryListScreen;
