import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogSidebar.css';

const BlogSidebar = () => {
    const recentPosts = [
        { id: 1, title: 'Into the Forest: Katy Evening Dress', date: 'January 17, 2023', image: '/assets/gal-1-grid.jpg', link: '#' },
        { id: 2, title: 'Jessica & Jake: Love Story in New York', date: 'January 15, 2023', image: '/assets/gal-2-grid.jpg', link: '#' },
        { id: 3, title: 'Lovely Engagement Photos of Sandra & Peter', date: 'January 9, 2023', image: '/assets/gal-3-grid.jpg', link: '#' },
    ];

    const categories = [
        { name: 'Fashion', count: 5 },
        { name: 'Lifestyle', count: 3 },
        { name: 'News', count: 2 },
        { name: 'Street', count: 4 }
    ];

    const tags = ['dress', 'engagement', 'fashion', 'love', 'outdoor', 'photo', 'photos', 'portrait', 'sea', 'wedding'];

    return (
        <aside className="blog-sidebar">
            {/* 1. About Me Widget */}
            <div className="sidebar-widget about-me-widget">
                <h4 className="widget-title">About Me</h4>
                <img src="/assets/author.jpg" alt="About Me" className="author-image" />
                <p>
                    Hi, I'm April Ryan, a photographer, traveler & blogger. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                </p>
            </div>

            {/* 2. Search Widget */}
            <div className="sidebar-widget search-widget">
                <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Search..." className="search-input" />
                    <button type="submit" className="search-submit">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            </div>

            {/* 3. Categories Widget */}
            <div className="sidebar-widget categories-widget">
                <h4 className="widget-title">Categories</h4>
                <ul className="categories-list">
                    {categories.map(cat => (
                        <li key={cat.name}>
                            <Link to="#">{cat.name}</Link>
                            <span className="category-count">({cat.count})</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 4. Recent Posts Widget */}
            <div className="sidebar-widget recent-articles-widget">
                <h4 className="widget-title">Recent Articles</h4>
                <ul className="recent-articles-list">
                    {recentPosts.map(post => (
                        <li key={post.id}>
                            <div className="article-thumb-wrapper">
                                <img src={post.image} alt={post.title} className="article-thumb" />
                            </div>
                            <div className="article-info">
                                <h5 className="article-title"><Link to={post.link}>{post.title}</Link></h5>
                                <span className="article-date">{post.date}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 5. Tags Widget */}
            <div className="sidebar-widget tags-widget">
                <h4 className="widget-title">Tags</h4>
                <div className="tags-list">
                    {tags.map(tag => (
                        <Link key={tag} to="#">{tag}</Link>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default BlogSidebar;
