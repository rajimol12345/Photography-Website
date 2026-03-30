import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api';

const TeamMemberEditScreen = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [bio, setBio] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const { data } = await API.get(`/api/team/${id}`);
                setName(data.name || '');
                setRole(data.role || '');
                setImageUrl(data.imageUrl || '');
                setBio(data.bio || '');
                setLoading(false);
            } catch (error) {
                console.error('Error fetching team member:', error);
                setLoading(false);
            }
        };

        fetchMember();
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
            await API.put(`/api/team/${id}`, {
                name,
                role,
                imageUrl,
                bio,
            });
            navigate('/admin/team');
        } catch (error) {
            console.error('Error updating team member:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-form-screen">
            <h1>Edit Team Member</h1>
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
                    <label style={{ display: 'block', marginBottom: '5px' }}>Role</label>
                    <input
                        type="text"
                        placeholder="Enter role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
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
                    <label style={{ display: 'block', marginBottom: '5px' }}>Bio</label>
                    <textarea
                        rows="5"
                        placeholder="Enter bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Update Member
                </button>
            </form>
        </div>
    );
};

export default TeamMemberEditScreen;
