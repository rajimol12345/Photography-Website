import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/_admin.css'; // Import Admin/Auth styles

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      if (isLogin) {
        const user = await login(email, password);
        if (user.role === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/'); // Redirect regular users to home
        }
      } else {
        const user = await register(name, email, password);
        if (user.role === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message || (isLogin ? 'Invalid credentials' : 'Registration failed'));
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message" style={{ color: 'green', marginBottom: '15px' }}>{message}</p>}

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          {isLogin ? 'Login' : 'Register'}
        </button>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}
            style={{ color: '#5F7D72', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
