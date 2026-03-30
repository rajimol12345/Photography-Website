import React, { useEffect, useState } from 'react';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const UserListScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user: currentUser } = useAuth(); // rename to avoid conflict

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await API.get('/api/users');
            setUsers(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await API.delete(`/api/users/${id}`);
                setUsers(users.filter((user) => user._id !== id));
            } catch (err) {
                alert(err.response?.data?.message || err.message);
            }
        }
    };

    return (
        <div className="admin-content-container">
            <div className="admin-content-header">
                <h2>Manage Users</h2> {/* Updated Title */}
                {/* Simple count or other action */}
            </div>

            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="table-responsive">
                    <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                        <thead>
                            <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>NAME</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>EMAIL</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ROLE</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user._id}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.name}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                        {user.role === 'Admin' ? (
                                            <span className="badge badge-admin" style={{ background: 'green', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>Admin</span>
                                        ) : (
                                            <span className="badge badge-user" style={{ background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>User</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                        <Link to={`/admin/users/${user._id}`} className="btn btn-edit" style={{ textDecoration: 'none', display: 'inline-block', padding: '6px 12px', fontSize: '14px', backgroundColor: '#5F7D72', color: 'white', marginRight: '10px' }}>View</Link>
                                        <button
                                            className="btn-icon delete"
                                            onClick={() => deleteHandler(user._id)}
                                            disabled={user._id === currentUser._id} // Prevent self-delete
                                            title="Delete"
                                            style={{ cursor: 'pointer', color: 'red' }}
                                        >
                                            <i className="fas fa-trash">Delete</i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserListScreen;
