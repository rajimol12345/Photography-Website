import React from 'react';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    { title: 'Blogs', desc: 'Manage blog posts', path: '/admin/blogs' },
    { title: 'Portfolio', desc: 'Manage portfolio items', path: '/admin/portfolio' },
    { title: 'Galleries', desc: 'Manage photo galleries', path: '/admin/galleries' },
    { title: 'Bookings', desc: 'View booking requests', path: '/admin/bookings' },
    { title: 'Hero Slides', desc: 'Manage home hero slider', path: '/admin/hero-slides' },
    { title: 'Service Packages', desc: 'Manage pricing & services', path: '/admin/service-packages' },
    { title: 'Team Members', desc: 'Manage your team', path: '/admin/team' },
    { title: 'Testimonials', desc: 'Manage client feedback', path: '/admin/testimonials' },
  ];

  return (
    <div className="admin-content">
      <h1 style={{ marginBottom: '10px', fontSize: '28px', fontFamily: 'Playfair Display' }}>Dashboard</h1>
      <p style={{ color: '#777', marginBottom: '40px' }}>Welcome back, Administrator.</p>

      {/* Admin Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', marginBottom: '60px' }}>
        {cards.map((card) => (
          <div key={card.path} className="admin-card">
            <h3 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: '500' }}>{card.title}</h3>
            <p style={{ color: '#888', marginBottom: '20px', fontSize: '13px' }}>{card.desc}</p>
            <button
              onClick={() => navigate(card.path)}
              className="btn btn-accent"
              style={{ padding: '10px 25px', fontSize: '11px', width: '100%' }}
            >
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
