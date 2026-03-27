import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogEditScreen = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`/api/admin/blogs/${id}`);
                setTitle(data.title);
                setSlug(data.slug);
                setContent(data.content);
                setCategory(data.category?._id || data.category || '');
                setImageUrl(data.imageUrl || '');
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog:', error);
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

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
        try {
            await axios.put(`/api/admin/blogs/${id}`, {
                title,
                slug,
                content,
                category,
                imageUrl,
            });
            navigate('/admin/blogs');
        } catch (error) {
            console.error('Error updating blog:', error);
            alert(`Update Failed: ${error.response?.data?.message || 'Server error'}`);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-form-screen">
            <h1>Edit Blog Post</h1>
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
                    <input
                        type="text"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                        required
                    />
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
                    Update Blog
                </button>
            </form>
        </div>
    );
};

export default BlogEditScreen;
