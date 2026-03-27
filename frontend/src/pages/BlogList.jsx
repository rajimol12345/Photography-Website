import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import styles from '../styles/BlogList.module.css';
import InstagramStrip from '../components/InstagramStrip';
import BlogSidebar from '../components/BlogSidebar';

// SVG Icon for Read More
const ArrowRight = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    // Mock data matching Tilia reference style
    const mockBlogs = [
        { _id: '1', title: 'Top 10 Wedding Photography Tips', excerpt: 'Discover the essential tips for capturing the perfect wedding moments...', date: 'Oct 24, 2023', category: 'Weddings', imageUrl: '/assets/blog-1.jpg' },
        { _id: '2', title: 'Best Locations for Portrait Shoots', excerpt: 'Explore the most scenic locations for your next portrait session...', date: 'Oct 10, 2023', category: 'Portraits', imageUrl: '/assets/blog-2.jpg' },
        { _id: '3', title: 'Capturing Natural Light in Photography', excerpt: 'Learn how to master natural light to create stunning images...', date: 'Sep 28, 2023', category: 'Tips', imageUrl: '/assets/blog-3.jpg' },
        { _id: '4', title: 'The Art of Black and White Photography', excerpt: 'Understand the timeless appeal of black and white imagery...', date: 'Sep 15, 2023', category: 'Art', imageUrl: '/assets/gal-2-grid.jpg' },
        { _id: '5', title: 'Choosing the Right Camera Gear', excerpt: 'A guide to selecting the best equipment for your photography style...', date: 'Aug 30, 2023', category: 'Gear', imageUrl: '/assets/gal-5-grid.jpg' },
        { _id: '6', title: 'Editing Workflow for Photographers', excerpt: 'Streamline your post-processing with these editing tips...', date: 'Aug 12, 2023', category: 'Editing', imageUrl: '/assets/gal-6-grid.jpg' },
    ];

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('/api/blogs');
                const fetchedBlogs = Array.isArray(data) ? data : (data?.blogs || []);

                // Merge strategies: Static first, then API. Deduplicate by slug or title.
                // We also normalize the data structure here
                const normalizedFetched = fetchedBlogs.map(blog => ({
                    ...blog,
                    date: new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    category: typeof blog.category === 'object' ? blog.category?.name : blog.category
                }));

                const mergedBlogs = [...mockBlogs];
                normalizedFetched.forEach(blog => {
                    const exists = mergedBlogs.some(existing => existing.title === blog.title);
                    if (!exists) {
                        mergedBlogs.push(blog);
                    }
                });

                setBlogs(mergedBlogs);
            } catch (err) {
                console.error("Failed to fetch blogs, using mock data", err);
                setBlogs(mockBlogs);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className={styles.blogPage}>
            {/* Main Content Area */}
            <div className={styles.container}>
                <div className={styles.contentWrapper}>

                    {/* Left Column: Blog Posts Grid */}
                    <div className={styles.mainContent}>
                        <div className={styles.blogGrid}>
                            {blogs.map((blog) => (
                                <motion.div
                                    className={styles.blogItem}
                                    key={blog._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className={styles.blogCard}>
                                        <div className={styles.imageWrapper}>
                                            <Link to={`/blog/${blog._id}`}>
                                                <img src={blog.imageUrl} alt={blog.title} className={styles.blogImage} />
                                            </Link>
                                        </div>
                                        <div className={styles.cardContent}>
                                            <h2 className={styles.postTitle}>
                                                <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                                            </h2>
                                            <div className={styles.metaInfo}>
                                                {blog.category} <span className={styles.separator}></span> {blog.date}
                                            </div>
                                            <p className={styles.excerpt}>{blog.excerpt}</p>
                                            <Link to={`/blog/${blog._id}`} className={styles.readMore}>
                                                Read More <span className={styles.readMoreIcon}><ArrowRight /></span>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className={styles.pagination}>
                            <Link to="#" className={`${styles.pageLink} ${styles.active}`}>1</Link>
                            <Link to="#" className={styles.pageLink}>2</Link>
                            <Link to="#" className={styles.pageLink}>3</Link>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className={styles.sidebarWrapper}>
                        <BlogSidebar />
                    </div>

                </div>
            </div>

            <InstagramStrip />
            <InstagramStrip />
        </div>
    );
};

export default BlogList;
