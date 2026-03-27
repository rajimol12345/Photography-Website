import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ServicePackageListScreen = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const { user } = useAuth();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                // Updated to support conditional pagination. Pass pageNumber explicitly.
                const { data } = await axios.get(`/api/services?pageNumber=${page}`, config);
                setPackages(data.servicePackages || []);
                setPages(data.pages || 1);
            } catch (error) {
                console.error('Error fetching service packages:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchPackages();
        }
    }, [page, user]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                await axios.delete(`/api/services/${id}`, config);
                setPackages(packages.filter((p) => p._id !== id));
            } catch (error) {
                console.error('Error deleting service package:', error);
            }
        }
    };

    return (
        <div className="admin-list-screen">
            <div className="admin-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Service Packages</h1>
                <Link to="/admin/service-packages/create" className="btn btn-primary">Create Package</Link>
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
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>NAME</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>PRICE</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {packages.map((p) => (
                                    <tr key={p._id}>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{p._id}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{p.name}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{p.price}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                            <Link to={`/admin/service-packages/${p._id}/edit`} className="btn btn-edit" style={{ marginRight: '10px', textDecoration: 'none', display: 'inline-block', padding: '6px 12px', fontSize: '14px', backgroundColor: '#5F7D72', color: 'white' }}>Edit</Link>
                                            <button
                                                onClick={() => deleteHandler(p._id)}
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

export default ServicePackageListScreen;
