import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogItem from '../components/BlogItem';
import BlogSidebar from '../components/BlogSidebar';
import Hero from '../components/Hero/Hero';
import '../styles/Blog.css';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;

    const mockBlogs = [
        { 
            _id: '1', 
            slug: 'into-the-forest-katy-evening-dress', 
            title: 'Into the Forest: Katy Evening Dress', 
            excerpt: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', 
            createdAt: '2023-01-17T10:00:00Z', 
            category: { name: 'Fashion' }, 
            imageUrl: '/assets/gal-1-grid.jpg' 
        },
        { 
            _id: '2', 
            slug: 'jessica-jake-love-story-new-york', 
            title: 'Jessica & Jake : Love Story in New York', 
            excerpt: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', 
            createdAt: '2023-01-15T10:00:00Z', 
            category: { name: 'Street' }, 
            imageUrl: '/assets/gal-2-grid.jpg' 
        },
        { 
            _id: '3', 
            slug: 'lovely-engagement-photos-sandra-peter', 
            title: 'Lovely Engagement Photos of Sandra & Peter', 
            excerpt: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', 
            createdAt: '2023-01-09T10:00:00Z', 
            category: { name: 'Lifestyle' }, 
            imageUrl: '/assets/gal-3-grid.jpg' 
        },
        { 
            _id: '4', 
            slug: 'art-of-natural-light-photography', 
            title: 'The Art of Natural Light Photography', 
            excerpt: 'Learn how to master natural light to create soft, cinematic, and emotionally powerful photographs in any environment.', 
            createdAt: '2026-02-03T10:00:00Z', 
            category: { name: 'Lifestyle' }, 
            imageUrl: '/assets/gal-4-grid.jpg' 
        },
    ];

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('/api/blogs');
                // Ensure we handle the structure returned by getBlogs controller: { blogs, page, pages }
                console.log('API Response:', data); // DEBUG
                const fetchedBlogs = data.blogs || [];
                console.log('Fetched Blogs:', fetchedBlogs); // DEBUG

                // Merge strategies: Static first, then API. Deduplicate by slug or title.
                const mergedBlogs = [...mockBlogs];
                fetchedBlogs.forEach(blog => {
                    const exists = mergedBlogs.some(existing => existing.slug === blog.slug || existing.title === blog.title);
                    if (!exists) {
                        mergedBlogs.push(blog);
                    }
                });

                setBlogs(mergedBlogs);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError('Could not fetch latest blogs. Showing demo content.');
                setBlogs(mockBlogs);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(blogs.length / postsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <div className="blog-page-container">
            <Hero
                image="/assets/slider-1.webp"
                title="Photography Blog"
                subtitle="Latest Stories"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Blog' }
                ]}
            />
            <div className="blog-content-section section-padding">
                <div className="container">
                    <div className="blog-grid-layout">
                        <div className="blog-posts-column">
                            {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
                            <div className="blog-list-wrapper">
                                {loading ? (
                                    <div className="loading-spinner">Loading...</div>
                                ) : (
                                    currentPosts.map((blog) => (
                                        <BlogItem key={blog._id} post={blog} />
                                    ))
                                )}

                                {/* Functional Pagination */}
                                {totalPages > 1 && (
                                    <div className="blog-pagination">
                                        {[...Array(totalPages)].map((_, index) => (
                                            <button
                                                key={index + 1}
                                                onClick={() => paginate(index + 1)}
                                                className={`page-numbers ${currentPage === index + 1 ? 'current' : ''}`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                        {currentPage < totalPages && (
                                            <button
                                                className="next page-numbers"
                                                onClick={() => paginate(currentPage + 1)}
                                            >
                                                &gt;
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="blog-sidebar-column">
                            <BlogSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;