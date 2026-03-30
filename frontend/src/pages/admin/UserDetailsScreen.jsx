import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';

const UserDetailsScreen = () => {
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await API.get(`/api/users/${id}`, config);
                setUserProfile(data);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError('Failed to load user details');
            } finally {
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchUser();
        }
    }, [id, user]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error} <Link to="/admin/users">Go Back</Link></div>;
    if (!userProfile) return <div>User not found</div>;

    return (
        <div className="admin-container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Link to="/admin/users" className="btn btn-secondary">Go Back</Link>
                <h1>User Details</h1>
            </div>

            <div className="user-card" style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: '#5F7D72',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        margin: '0 auto 15px auto',
                        textTransform: 'uppercase'
                    }}>
                        {userProfile.name?.charAt(0)}
                    </div>
                    <h2>{userProfile.name}</h2>
                    <span style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        background: userProfile.role === 'Admin' ? 'green' : '#eee',
                        color: userProfile.role === 'Admin' ? 'white' : '#333',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold'
                    }}>
                        {userProfile.role}
                    </span>
                </div>

                <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                    <p style={{ margin: '10px 0', color: '#555' }}>
                        <strong>Email:</strong> <a href={`mailto:${userProfile.email}`}>{userProfile.email}</a>
                    </p>
                    <p style={{ margin: '10px 0', color: '#555' }}>
                        <strong>User ID:</strong> {userProfile._id}
                    </p>
                    <p style={{ margin: '10px 0', color: '#555' }}>
                        <strong>Joined:</strong> {new Date(userProfile.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsScreen;
