import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <div className="blog-card animated fadeInUp">
      <div className="blog-card-img">
        <Link to={`/blog/${post.slug}`}>
          <img src={post.imageUrl} alt={post.title} />
        </Link>
        <div className="blog-category">
          <Link to={`/blog?category=${post.category?.slug}`}>{post.category?.name || 'Uncategorized'}</Link>
        </div>
      </div>
      <div className="blog-card-content">
        <h3>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <div className="blog-meta">
          <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="separator">|</span>
          <Link to={`/blog/${post.slug}`} className="read-more-link">Read More</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
