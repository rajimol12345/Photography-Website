import React, { useState, useEffect } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [recentPosts, setRecentPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchSidebarData = async () => {
            try {
                const { data: postsData } = await API.get('/api/blogs?limit=5');
                setRecentPosts(postsData.blogs || []);

                const { data: categoriesData } = await API.get('/api/categories');
                setCategories(categoriesData || []);
                
                // Assuming tags are derived from blogs for now
                const { data: blogsData } = await API.get('/api/blogs');
                const allTags = blogsData.blogs.reduce((acc, blog) => {
                    return [...acc, ...blog.tags];
                }, []);
                setTags([...new Set(allTags)]);

            } catch (error) {
                console.error('Error fetching sidebar data:', error);
            }
        };
        fetchSidebarData();
    }, []);

    return (
        <aside className="sidebar">
            <div className="widget">
                <h3 className="widget-title">About Me</h3>
                <div className="about-me">
                    <img src="/assets/author.jpg" alt="April Ryan" />
                    <p>Hi, I'm April Ryan, a photographer, traveler & blogger. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                </div>
            </div>
            <div className="widget">
                <h3 className="widget-title">Recent Articles</h3>
                <ul>
                    {recentPosts.map(post => (
                        <li key={post._id}>
                            <Link to={`/blog/${post._id}`}>{post.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="widget">
                <h3 className="widget-title">Categories</h3>
                <ul>
                    {categories.map(category => (
                        <li key={category._id}>
                            <Link to={`/blog?category=${category.slug}`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="widget">
                <h3 className="widget-title">Tags</h3>
                <div className="tag-cloud">
                    {tags.map(tag => (
                        <Link key={tag} to={`/blog?tag=${tag}`}>{tag}</Link>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;