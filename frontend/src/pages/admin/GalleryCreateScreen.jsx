import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GalleryCreateScreen = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();

    const uploadFileHandler = async (e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/api/upload', formData, config);
            const uploadedUrls = data.files.map(f => ({ imageUrl: f.url }));
            setImages([...images, ...uploadedUrls]);
            setUploading(false);
        } catch (error) {
            console.error('Error uploading files:', error);
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/admin/galleries', {
                name,
                category,
                description,
                items: images.map(img => ({ imageUrl: img.imageUrl })), // Fix: model expects 'items' with 'imageUrl' objects
            });
            navigate('/admin/galleries');
        } catch (error) {
            console.error('Error creating gallery:', error);
        }
    };

    return (
        <div className="admin-form-screen">
            <h1>Create Gallery</h1>
            <form onSubmit={submitHandler} style={{ maxWidth: '600px' }}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                        required
                    />
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

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
                    <textarea
                        rows="3"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                    ></textarea>
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Upload Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={uploadFileHandler}
                        style={{ marginTop: '10px' }}
                    />
                    {uploading && <p>Uploading...</p>}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                        {images.map((img, idx) => (
                            <img key={idx} src={img.imageUrl} alt="Gallery" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Create Gallery
                </button>
            </form>
        </div>
    );
};

export default GalleryCreateScreen;
