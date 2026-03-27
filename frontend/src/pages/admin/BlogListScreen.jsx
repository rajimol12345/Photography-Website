import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const BlogListScreen = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [error, setError] = useState(null);

    const { user } = useAuth();

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await axios.get(`/api/admin/blogs?pageNumber=${page}`, config);
                setBlogs(data.blogs || []);
                setPages(data.pages || 1);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError('Failed to fetch blogs.');
            } finally {
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchBlogs();
        }
    }, [page, user]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axios.delete(`/api/admin/blogs/${id}`);
                setBlogs(blogs.filter((blog) => blog._id !== id));
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    return (
        <div className="admin-list-screen">
            <div className="admin-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Blogs</h1>
                <Link to="/admin/blogs/create" className="btn btn-primary">Create Blog</Link>
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
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>DATE</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog._id}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{blog._id}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{blog.title}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{blog.category}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(blog.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                        <Link to={`/admin/blogs/${blog._id}/edit`} className="btn btn-edit" style={{ marginRight: '10px' }}>Edit</Link>
                                        <button onClick={() => deleteHandler(blog._id)} className="btn btn-delete">Delete</button>
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

export default BlogListScreen;
