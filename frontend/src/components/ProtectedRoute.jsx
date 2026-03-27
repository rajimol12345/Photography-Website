import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute - Finalized Role-Based Access Component
 * 
 * @param {Array} allowedRoles - Optional array of roles permitted to view this route
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();

  // 1. Maintain layout integrity during auth check
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Inter, sans-serif',
        color: '#666'
      }}>
        <div className="spinner-container">
          <p>Verifying secure access...</p>
        </div>
      </div>
    );
  }

  // 2. Redirect to login if user session is missing
  if (!isAuthenticated) {
    console.warn('[ROUTING] Unauthorized access attempt. Redirecting to login.');
    return <Navigate to="/login" replace />;
  }

  // 3. Verify specific role permissions (Admin, etc.)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.error(`[ROUTING] Access Forbidden: Role '${user.role}' lacks permission.`);
    // Redirect to home if unauthorized for specific route
    return <Navigate to="/" replace />;
  }

  // 4. Permission Granted: Render Child Routes
  return <Outlet />;
};

export default ProtectedRoute;
