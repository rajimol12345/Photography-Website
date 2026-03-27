import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const GalleryEditScreen = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data } = await axios.get(`/api/admin/galleries/${id}`);
                setName(data.name);
                setCategory(data.category?.name || data.category || ''); // Robust category handling
                setDescription(data.description || '');
                setImages(data.items || []); // Use 'items' from model
                setLoading(false);
            } catch (error) {
                console.error('Error fetching gallery:', error);
                setLoading(false);
            }
        };

        fetchGallery();
    }, [id]);

    const uploadFileHandler = async (e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));
        setUploading(true);

        try {
            // Note: Let the browser set Content-Type to multipart/form-data with boundary
            // transformRequest: (data, headers) => {
            //     delete headers.common['Content-Type']; // Only if necessary, but usually axios handles FormData correctly
            //     return data;
            // },
            const { data } = await axios.post('/api/upload', formData); // Token is handled by global defaults

            const uploadedUrls = data.files.map(f => ({ imageUrl: f.url }));
            setImages([...images, ...uploadedUrls]);
            setUploading(false);
        } catch (error) {
            console.error('Error uploading files:', error.response?.data?.message || error.message);
            alert(`Upload Failed: ${error.response?.data?.message || 'Unknown error'}`); // Simple alert for admin feedback
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/admin/galleries/${id}`, {
                name,
                category,
                description,
                items: images.map(img => ({ imageUrl: img.imageUrl })),
            });
            navigate('/admin/galleries');
        } catch (error) {
            console.error('Error updating gallery:', error.response?.data?.message || error.message);
            alert(`Update Failed: ${error.response?.data?.message || 'Server error'}`);
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-form-screen">
            <h1>Edit Gallery</h1>
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
                    <label style={{ display: 'block', marginBottom: '5px' }}>Gallery Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={uploadFileHandler}
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                    />
                    {uploading && <p>Uploading...</p>}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {images.map((img, idx) => (
                            img.imageUrl ? (
                                <div key={idx} style={{ position: 'relative' }}>
                                    <img
                                        src={img.imageUrl}
                                        alt="Gallery"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        onError={(e) => { e.target.style.display = 'none'; }} // Hide if fails to load
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '10px' }}
                                    >X</button>
                                </div>
                            ) : null
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Update Gallery
                </button>
            </form>
        </div>
    );
};

export default GalleryEditScreen;
