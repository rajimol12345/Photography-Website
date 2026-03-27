import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogPostCard.css';

const BlogPostCard = ({ post }) => {
    return (
        <div className="blog-post-card">
            <div className="post-card-image">
                <Link to={post.link}>
                    <img src={post.image} alt={post.title} />
                </Link>
            </div>
            <div className="post-card-content">
                <div className="post-meta">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                </div>
                <h3 className="post-title">
                    <Link to={post.link}>{post.title}</Link>
                </h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <Link to={post.link} className="read-more-btn">Read More</Link>
            </div>
        </div>
    );
};

export default BlogPostCard;
