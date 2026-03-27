import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogPreview = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('/api/blogs?page=1');
                setBlogs((data.blogs || []).slice(0, 3));
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading || blogs.length === 0) return null;

    return (
        <section className="section bg-light">
            <div className="container">
                <div className="section-center animated fadeInUp" style={{ marginBottom: '60px' }}>
                    <span className="section-subtitle">Our Blog</span>
                    <h2 className="section-title">Latest Stories</h2>
                </div>

                <div className="services-grid">
                    {blogs.map((post) => (
                        <div key={post._id} className="blog-card animated fadeInUp" style={{ background: 'var(--white)' }}>
                            <div className="blog-card-img" style={{ height: '250px' }}>
                                <Link to={`/blog/${post.slug}`}>
                                    <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Link>
                            </div>
                            <div className="blog-card-content" style={{ padding: '30px' }}>
                                <span className="section-subtitle" style={{ fontSize: '10px', marginBottom: '10px' }}>
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>
                                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                </h3>
                                <Link to={`/blog/${post.slug}`} className="btn btn-outline" style={{ fontSize: '10px', padding: '10px 25px' }}>
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
