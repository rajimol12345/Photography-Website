import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

const TestimonialCreateScreen = () => {
    const [author, setAuthor] = useState('');
    const [role, setRole] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();

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

            const { data } = await API.post('/api/upload', formData, config);
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
            await API.post('/api/admin/testimonials', {
                clientName: author,
                content,
                rating: Number(rating),
            });
            navigate('/admin/testimonials');
        } catch (error) {
            console.error('Error creating testimonial:', error);
        }
    };

    return (
        <div className="admin-form-screen">
            <h1>Create Testimonial</h1>
            <form onSubmit={submitHandler} style={{ maxWidth: '600px' }}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Author Name</label>
                    <input
                        type="text"
                        placeholder="Enter author name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                        required
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Role / Description</label>
                    <input
                        type="text"
                        placeholder="e.g. Wedding Client"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Rating (1-5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Author Image URL</label>
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
                    <label style={{ display: 'block', marginBottom: '5px' }}>Content</label>
                    <textarea
                        rows="5"
                        placeholder="Enter testimonial content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Create Testimonial
                </button>
            </form>
        </div>
    );
};

export default TestimonialCreateScreen;
