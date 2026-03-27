import React, { useEffect, useState } from 'react';
import axios from 'axios';

const staticTeamMembers = [
  { _id: '1', name: 'John Doe', role: 'Lead Photographer', imageUrl: '/assets/team-1.jpg' },
  { _id: '2', name: 'Jane Smith', role: 'Creative Director', imageUrl: '/assets/team-2.jpg' },
  { _id: '3', name: 'Mike Ross', role: 'Videographer', imageUrl: '/assets/team-3.jpg' },
  { _id: '4', name: 'Sarah Lee', role: 'Editor', imageUrl: '/assets/team-4.jpg' },
];

const TeamSection = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data } = await axios.get('/api/team');
        const fetchedMembers = data.teamMembers || data.team || (Array.isArray(data) ? data : []);
        setTeam([...staticTeamMembers, ...fetchedMembers]);
      } catch (err) {
        console.error(err);
        setTeam(staticTeamMembers);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (loading) return null;

  return (
    <section className="section bg-white team-section">
      <div className="container">
        <div className="section-center animated fadeInUp" style={{ marginBottom: '60px' }}>
          <span className="section-subtitle">Our Team</span>
          <h2 className="section-title">The Creative Minds</h2>
        </div>

        <div className="services-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {team.slice(0, 4).map((m) => (
            <div key={m._id} className="team-item animated fadeInUp">
              <div className="team-image">
                <img src={m.imageUrl} alt={m.name} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{m.name}</h3>
              <span className="section-subtitle" style={{ fontSize: '10px', color: 'var(--text-light)', marginBottom: '15px' }}>{m.role}</span>
              <div className="team-social">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
