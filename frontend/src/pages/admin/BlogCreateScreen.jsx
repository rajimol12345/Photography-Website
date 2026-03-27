import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogCreateScreen = () => {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]); // List of available categories
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Fetch Categories for Dropdown
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('/api/categories');
                const cats = Array.isArray(data) ? data : data.categories || [];
                setCategories(cats);
                if (cats.length > 0) setCategory(cats[0]._id); // Default to first
            } catch (err) {
                console.error('Failed to load categories', err);
            }
        };
        fetchCategories();
    }, []);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('images', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/api/upload', formData, config);

            setImageUrl(data.files[0].url);
            setUploading(false);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await axios.post('/api/admin/blogs', {
                title,
                slug,
                excerpt,
                content,
                category, // Sends the ID from the select
                imageUrl,
            });
            navigate('/admin/blogs');
        } catch (error) {
            console.error('Error creating blog:', error);
            setError(error.response?.data?.message || 'Failed to create blog');
        }
    };

    return (
        <div className="admin-form-screen">
            <h1>Create Blog Post</h1>
            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
            <form onSubmit={submitHandler} style={{ maxWidth: '800px' }}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                        required
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Slug</label>
                    <input
                        type="text"
                        placeholder="Enter slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Excerpt</label>
                    <textarea
                        placeholder="Enter a brief excerpt (max 300 characters)"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', minHeight: '80px' }}
                        maxLength={300}
                        required
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Image URL</label>
                    <input
                        type="text"
                        placeholder="Enter image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                    />
                    <input
                        type="file"
                        onChange={uploadFileHandler}
                        style={{ marginTop: '10px' }}
                    />
                    {uploading && <p>Uploading...</p>}
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                        required
                    >
                        <option value="">Select a Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group" style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Content</label>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        style={{ height: '300px', marginBottom: '50px' }}
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', background: '#5F7D72', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Create Blog
                </button>
            </form>
        </div>
    );
};

export default BlogCreateScreen;
