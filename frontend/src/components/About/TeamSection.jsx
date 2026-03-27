import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const TeamSection = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    const mockTeam = [
        { _id: '1', name: 'Alex Doe', role: 'Lead Photographer', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
        { _id: '2', name: 'Maria Smith', role: 'Creative Director', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
        { _id: '3', name: 'John Brown', role: 'Videographer', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }
    ];

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const { data } = await axios.get('/api/team').catch(() => ({ data: [] }));
                const items = (Array.isArray(data) ? data : (data?.teamMembers || []));
                setTeam(items.length > 0 ? items : mockTeam);
                setLoading(false);
            } catch (err) {
                setTeam(mockTeam);
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    if (loading) return null;

    return (
        <section className="section-padding" style={{ backgroundColor: 'var(--color-off-white)' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h2 style={{ fontSize: '2.5rem' }}>Our Team</h2>
                </div>

                <div className="grid grid-3">
                    {team.slice(0, 3).map((member, index) => (
                        <motion.div
                            key={member._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div style={{ marginBottom: '20px', overflow: 'hidden' }}>
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                    src={member.imageUrl}
                                    alt={member.name}
                                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                                />
                            </div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{member.name}</h3>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-grey-medium)', textTransform: 'uppercase', letterSpacing: '1px' }}>{member.role}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
