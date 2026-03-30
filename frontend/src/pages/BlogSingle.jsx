import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import Hero from '../components/Hero/Hero';
import '../styles/BlogSingle.css';

const BlogSingle = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockBlogs = [
      { 
          _id: '1', 
          slug: 'into-the-forest-katy-evening-dress', 
          title: 'Into the Forest: Katy Evening Dress', 
          excerpt: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', 
          content: `
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>
            <h3>The Magic of the Forest</h3>
            <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
          `,
          createdAt: '2023-01-17T10:00:00Z', 
          category: { name: 'Fashion' }, 
          imageUrl: '/assets/gal-1-grid.jpg',
          author: { name: 'Snap Team' }
      },
      { 
          _id: '2', 
          slug: 'jessica-jake-love-story-new-york', 
          title: 'Jessica & Jake : Love Story in New York', 
          excerpt: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', 
          content: `
            <p>New York City provided the perfect backdrop for Jessica and Jake's love story. From the bustling streets of Manhattan to the quiet corners of Central Park, every moment was filled with emotion and beauty.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <h3>Urban Romance</h3>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
          `,
          createdAt: '2023-01-15T10:00:00Z', 
          category: { name: 'Street' }, 
          imageUrl: '/assets/gal-2-grid.jpg',
          author: { name: 'Snap Team' }
      },
      { 
          _id: '3', 
          slug: 'lovely-engagement-photos-sandra-peter', 
          title: 'Lovely Engagement Photos of Sandra & Peter', 
          excerpt: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', 
          content: `
            <p>Sandra and Peter's engagement session was nothing short of magical. The golden hour light created a warm, romantic atmosphere that perfectly captured their love for each other.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <h3>Golden Hour Magic</h3>
            <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
          `,
          createdAt: '2023-01-09T10:00:00Z', 
          category: { name: 'Lifestyle' }, 
          imageUrl: '/assets/gal-3-grid.jpg',
          author: { name: 'Snap Team' }
      },
      { 
          _id: '4', 
          slug: 'art-of-natural-light-photography', 
            title: 'The Art of Natural Light Photography', 
            excerpt: 'Learn how to master natural light to create soft, cinematic, and emotionally powerful photographs in any environment.', 
          content: `
            <p>Natural light is the most powerful tool in a photographer's arsenal. Understanding how to use it effectively can transform your images from ordinary to extraordinary.</p>
            <h3>Finding the Right Light</h3>
            <p>The key to great natural light photography is observation. Pay attention to the direction, quality, and color of the light. Is it hard or soft? Warm or cool? Direct or diffused?</p>
            <p>Experiment with different times of day. The golden hour—shortly after sunrise and before sunset—offers the most flattering light for portraits.</p>
          `,
            createdAt: '2026-02-03T10:00:00Z', 
            category: { name: 'Lifestyle' }, 
            imageUrl: '/assets/gal-4-grid.jpg',
            author: { name: 'Snap Team' } 
        },
  ];

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/api/blogs/slug/${slug}`);
        setBlog(data);
        setLoading(false);
      } catch (err) {
        // Check if slug exists in mock data
        const mockPost = mockBlogs.find(p => p.slug === slug);
        if (mockPost) {
            console.log('Using mock data for:', slug);
            setBlog(mockPost);
            // Clear error if we found a mock post
            setError(null);
        } else {
            console.error('Error fetching blog:', err);
            setError(err.response?.data?.message || err.message);
        }
        setLoading(false);
      }
    };

    const fetchRecentPosts = async () => {
      try {
        const { data } = await API.get('/api/blogs/recent');
        setRecentPosts(data);
      } catch (err) {
        console.error("Failed to fetch recent posts:", err);
      }
    };

    fetchBlog();
    fetchRecentPosts();
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return (
    <div className="container" style={{ padding: '200px 0', textAlign: 'center' }}>
      <p>Loading blog post...</p>
    </div>
  );
  if (error) return (
    <div className="container" style={{ padding: '200px 0', textAlign: 'center' }}>
      <p className="error-message">Error: {error}</p>
    </div>
  );
  if (!blog) return (
    <div className="container" style={{ padding: '200px 0', textAlign: 'center' }}>
      <p>Blog post not found.</p>
    </div>
  );

  return (
    <div className="blog-single-page">
      <Hero
        image={blog.imageUrl || '/assets/slider-1.webp'}
        title={blog.title}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Blog', path: '/blog' },
          { label: blog.category?.name || 'Article' }
        ]}
      />

      <div className="blog-single-container">
        <main className="blog-main-content">
          <div className="blog-meta">
            <span>BY {blog.author?.name || 'Snap Admin'}</span>
            <span>/</span>
            <span>{formatDate(blog.createdAt)}</span>
            <span>/</span>
            <span>{blog.category?.name || 'Uncategorized'}</span>
          </div>

          <div className="blog-content-body">
            <p className="blog-intro">
              {blog.excerpt || "Capturing the essence of the moment is what we strive for in every shoot. This collection represents our latest journey into the heart of visual storytelling."}
            </p>

            <div className="blog-body-text" dangerouslySetInnerHTML={{ __html: blog.content }}></div>

            {/* Inline Gallery Section - Snap Style */}
            <div className="blog-inline-gallery">
              <div className="gallery-item">
                <img src="/assets/gal-1-grid.jpg" alt="Gallery 1" />
              </div>
              <div className="gallery-item">
                <img src="/assets/gal-2-grid.jpg" alt="Gallery 2" />
              </div>
            </div>

            <div className="blog-body-text">
              <p>Veri ubique cu eam, vero dicta ridens ei quo, ex putent menandri accommodare sed. Suscipit lobortis prodesset ut eam. Sale dicta dolore pri et, an aliquam albucius volutpat est. Adipisci interpretaris sea eu, nisl tation nec ut, gubergren sadipscing ei vim. Ancillae torquatos in nec, impetus nostrum ea eos.</p>
            </div>

            <blockquote className="blog-quote">
              <p>"Photography is the only language that can be understood anywhere in the world."</p>
              <cite>— Bruno Barbey</cite>
            </blockquote>

            <div className="blog-body-text">
              <p>Ancillae torquatos in nec, impetus nostrum ea eos. Propriae voluptaria dissentias nam ei, posse diceret inciderint cum ut, gubergren sadipscing ei vim. Adipisci interpretaris sea eu, nisl tation nec ut.</p>
            </div>
          </div>

          {/* Related Posts */}
          <div className="related-posts">
            <h3 className="widget-title">Related Posts</h3>
            <div className="related-grid">
              {recentPosts.slice(0, 3).map(post => (
                <div key={post._id} className="related-card">
                  <Link to={`/blog/${post.slug}`}>
                    <img src={post.imageUrl} alt={post.title} />
                    <h4>{post.title}</h4>
                  </Link>
                  <span className="recent-post-date">{formatDate(post.createdAt)}</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        <aside className="blog-sidebar">
          {/* About Me Widget */}
          <div className="sidebar-widget">
            <h3 className="widget-title">About Me</h3>
            <div className="author-card">
              <div className="author-image">
                <img src="/assets/author.jpg" alt="Author" />
              </div>
              <h4 className="author-name">Snap Studio</h4>
              <p className="author-bio">
                We are a team of visual storytellers passionate about capturing life's most beautiful moments.
              </p>
            </div>
          </div>

          {/* Recent Posts Widget */}
          <div className="sidebar-widget">
            <h3 className="widget-title">Recent Posts</h3>
            <ul className="recent-post-list">
              {recentPosts.map((post) => (
                <li key={post._id} className="recent-post-item">
                  <div className="recent-post-thumb">
                    <img src={post.imageUrl} alt={post.title} />
                  </div>
                  <div className="recent-post-info">
                    <h4><Link to={`/blog/${post.slug}`}>{post.title}</Link></h4>
                    <span className="recent-post-date">{formatDate(post.createdAt)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Widget */}
          <div className="sidebar-widget">
            <h3 className="widget-title">Categories</h3>
            <ul className="snap-bullets" style={{ paddingLeft: '0' }}>
              <li style={{ listStyle: 'none' }}>Weddings</li>
              <li style={{ listStyle: 'none' }}>Portraits</li>
              <li style={{ listStyle: 'none' }}>Editorial</li>
              <li style={{ listStyle: 'none' }}>Lifestyle</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogSingle;
