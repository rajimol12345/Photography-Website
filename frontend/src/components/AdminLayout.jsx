import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="admin-dashboard-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/blogs">Manage Blogs</Link></li>
            <li><Link to="/admin/portfolio">Manage Portfolio</Link></li>
            <li><Link to="/admin/galleries">Manage Galleries</Link></li>
            <li><Link to="/admin/bookings">Manage Bookings</Link></li>
            <li><Link to="/admin/contact-enquiries">Contact Enquiries</Link></li>
            <li><Link to="/admin/testimonials">Manage Testimonials</Link></li>
            <li><Link to="/admin/users">Manage Users</Link></li>
            {/* Add more admin navigation links here */}
          </ul>
        </nav>
      </aside>
      <main className="admin-main-content">
        <header className="admin-header">
          {/* Admin Header Content (e.g., Logout, User Info) */}
          <h2>Welcome to Admin Dashboard</h2>
          <div className="admin-header-actions">
            {/* User Dropdown / Logout Button */}
            <Link to="/">Go to Website</Link>
          </div>
        </header>
        <div className="admin-page-content">
          <Outlet /> {/* Renders the child route components */}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
