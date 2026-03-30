import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api';

const PortfolioEditScreen = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const { data } = await API.get(`/api/admin/portfolio/${id}`);
                setTitle(data.title);
                setCategory(data.category);
                setImageUrl(data.imageUrl);
                setIsFeatured(data.isFeatured);
                setDescription(data.description || '');
                setLoading(false);
            } catch (error) {
                console.error('Error fetching portfolio item:', error);
                setLoading(false);
            }
        };

        fetchItem();
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
            await API.put(`/api/admin/portfolio/${id}`, {
                title,
                category,
                imageUrl,
                isFeatured,
                description,
            });
            navigate('/admin/portfolio');
        } catch (error) {
            console.error('Error updating portfolio item:', error);
            alert(`Update Failed: ${error.response?.data?.message || 'Server error'}`);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-form-screen">
            <h1>Edit Portfolio Item</h1>
            <form onSubmit={submitHandler} style={{ maxWidth: '600px' }}>
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
                    <label style={{ display: 'block', marginBottom: '5px' }}>Image URL</label>
                    <input
                        type="text"
                        placeholder="Enter image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                        required
                    />
                    <input
                        type="file"
                        onChange={uploadFileHandler}
                        style={{ marginTop: '10px' }}
                    />
                    {uploading && <p>Uploading...</p>}
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isFeatured}
                            onChange={(e) => setIsFeatured(e.target.checked)}
                        />
                        {' '} Featured Item
                    </label>
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
                    <textarea
                        rows="5"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Update Item
                </button>
            </form>
        </div>
    );
};

export default PortfolioEditScreen;
