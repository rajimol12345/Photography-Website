import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogSection.css';

const BlogSection = () => {
    const blogPosts = [
        {
            id: 1,
            image: '/assets/blog-1.jpg',
            date: 'February 2, 2026',
            title: 'The Best Lenses for Wedding Photography',
            link: '/blog/post-1'
        },
        {
            id: 2,
            image: '/assets/blog-2.jpg',
            date: 'January 28, 2026',
            title: 'How to Choose a Wedding Photographer',
            link: '/blog/post-2'
        },
        {
            id: 3,
            image: '/assets/blog-3.jpg',
            date: 'January 15, 2026',
            title: 'Top 10 Wedding Venues in New York',
            link: '/blog/post-3'
        }
    ];

    return (
        <section className="blog-section">
            <div className="blog-header">
                <p className="section-label">Our Blog</p>
                <h2 className="section-heading">From our Blog</h2>
            </div>
            <div className="blog-grid">
                {blogPosts.map(post => (
                    <div key={post.id} className="blog-post">
                        <div className="post-image">
                            <Link to={post.link}><img src={post.image} alt={post.title} /></Link>
                        </div>
                        <div className="post-content">
                            <p className="post-date">{post.date}</p>
                            <h3 className="post-title"><Link to={post.link}>{post.title}</Link></h3>
                            <Link to={post.link} className="read-more-btn">Read More</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogSection;
