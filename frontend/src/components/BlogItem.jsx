import React from 'react';
import { Link } from 'react-router-dom';

const BlogItem = ({ post }) => {
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Use slug for routing if available, fallback to id for legacy/mock
  const linkTarget = `/blog/${post.slug || post._id}`;

  return (
    <article className="blog-post-card">
      <div className="post-thumbnail">
        <Link to={linkTarget}>
          <img src={post.imageUrl} alt={post.title} loading="lazy" />
        </Link>
      </div>
      <div className="post-content">
        <h2 className="post-title">
          <Link to={linkTarget}>{post.title}</Link>
        </h2>
        <div className="post-meta">
          <span className="post-date">{date}</span>
          <span className="post-category">
            <Link to="#">{post.category?.name || 'Uncategorized'}</Link>
          </span>
        </div>
        <div className="post-excerpt">
          <p>{post.excerpt}</p>
        </div>
        <div className="post-footer">
          <Link to={linkTarget} className="read-more-link">
            READ MORE
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogItem;
