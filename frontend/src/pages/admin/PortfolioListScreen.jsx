import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';

const PortfolioListScreen = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [error, setError] = useState(null);

    const { user } = useAuth();

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await API.get(`/api/admin/portfolio?pageNumber=${page}`, config);
                setItems(data.portfolioItems || []);
                setPages(data.pages || 1);
            } catch (error) {
                console.error('Error fetching portfolio items:', error);
                setError('Failed to fetch portfolio items.');
            } finally {
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchItems();
        }
    }, [page, user]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await API.delete(`/api/admin/portfolio/${id}`);
                setItems(items.filter((item) => item._id !== id));
            } catch (error) {
                console.error('Error deleting portfolio item:', error);
            }
        }
    };

    return (
        <div className="admin-list-screen">
            <div className="admin-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Portfolio Items</h1>
                <Link to="/admin/portfolio/create" className="btn btn-primary">Create Portfolio Item</Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                        <thead>
                            <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>TITLE</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>CATEGORY</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item._id}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item._id}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.title}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.category}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                        <Link to={`/admin/portfolio/${item._id}/edit`} className="btn btn-edit" style={{ marginRight: '10px' }}>Edit</Link>
                                        <button onClick={() => deleteHandler(item._id)} className="btn btn-delete">Delete</button>
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

export default PortfolioListScreen;
