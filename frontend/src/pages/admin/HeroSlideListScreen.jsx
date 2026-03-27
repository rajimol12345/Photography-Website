import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const HeroSlideListScreen = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const { user } = useAuth();

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await axios.get(`/api/admin/hero-slides?pageNumber=${page}`, config); // Use admin specific endpoint with pagination

                // Backend might return array directly or object {heroSlides, page, pages} depending on my recent change.
                // My recent change to heroSlideController.js returns { heroSlides, page, pages }
                setSlides(data.heroSlides || []);
                setPages(data.pages || 1);
            } catch (error) {
                console.error('Error fetching hero slides:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchSlides();
        }
    }, [page, user]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this slide?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                await axios.delete(`/api/admin/hero-slides/${id}`, config);
                setSlides(slides.filter((slide) => slide._id !== id));
            } catch (error) {
                console.error('Error deleting hero slide:', error);
            }
        }
    };

    return (
        <div className="admin-list-screen">
            <div className="admin-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Hero Slides</h1>
                <Link to="/admin/hero-slides/create" className="btn btn-primary">Create Slide</Link>
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
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>TITLE</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>IMAGE</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>ORDER</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>STATUS</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slides.map((slide) => (
                                    <tr key={slide._id}>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{slide._id}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{slide.title}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                            <img src={slide.imageUrl} alt={slide.title} style={{ width: '100px', height: 'auto', borderRadius: '4px' }} />
                                        </td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{slide.order}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                            {slide.isActive ? (
                                                <span style={{ background: 'green', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>Active</span>
                                            ) : (
                                                <span style={{ background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>Hidden</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                            <Link to={`/admin/hero-slides/${slide._id}/edit`} className="btn btn-edit" style={{ marginRight: '10px', textDecoration: 'none', display: 'inline-block', padding: '6px 12px', fontSize: '14px', backgroundColor: '#5F7D72', color: 'white' }}>Edit</Link>
                                            <button
                                                onClick={() => deleteHandler(slide._id)}
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

export default HeroSlideListScreen;
