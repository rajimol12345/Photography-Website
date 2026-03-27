import React from 'react';
import '../styles/Team.css';

// SVG icons for social media
const FacebookIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h-2v-2h2v-1.5c0-1.99 1.51-3.5 3.5-3.5h1.5v2h-1.5c-.28 0-.5.22-.5.5V9h2l-.5 2h-1.5v6z" />
    </svg>
);
const TwitterIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 7.41c.01.12.01.24.01.36 0 3.67-2.8 7.9-7.9 7.9-1.57 0-3.04-.46-4.27-1.25.22.03.44.04.67.04 1.3 0 2.49-.44 3.44-1.18-.01 0-.01 0 0 0-1.21-.02-2.24-.82-2.6-1.92.17.03.34.05.51.05.25 0 .5-.03.73-.1-1.26-.25-2.2-1.36-2.2-2.68V12c.37.21.8.33 1.25.35C7.08 11.23 6.4 9.17 7.03 7.78c1.36 1.66 3.4 2.74 5.66 2.87-.05-.2-.08-.4-.08-.62 0-1.49 1.21-2.7 2.7-2.7.78 0 1.48.33 1.98.86.62-.12 1.2-.35 1.73-.66-.2.63-.64 1.17-1.2 1.5.55-.07 1.07-.21 1.55-.42-.37.54-.83 1.01-1.36 1.39z" />
    </svg>
);
const InstagramIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.62 6.4c0 .4-.32.72-.72.72h-1.8c-.4 0-.72-.32-.72-.72V5.68c0-.4.32-.72.72-.72h1.8c.4 0 .72.32.72.72v.72zm-2.96 1.94c-1.49 0-2.68 1.2-2.68 2.68s1.2 2.68 2.68 2.68 2.68-1.2 2.68-2.68-1.19-2.68-2.68-2.68zm5.06 5.56c0 .7-.56 1.26-1.26 1.26H6.56c-.7 0-1.26-.56-1.26-1.26V9.64c0-.7.56-1.26 1.26-1.26h2.04c.08-.66.36-1.27.78-1.78-.42-.14-.88-.22-1.36-.22H6.56c-1.52 0-2.76 1.24-2.76 2.76v6.72c0 1.52 1.24 2.76 2.76 2.76h9.88c1.52 0 2.76-1.24 2.76-2.76V13c-.08.66-.36 1.27-.78 1.78.42.14.88.22 1.36.22v.12z" />
    </svg>
);

const Team = () => {
    const teamMembers = [
        { id: 1, name: 'April Ryan', role: 'Photographer', image: '/assets/team-1.png', socials: { fb: '#', tw: '#', ig: '#' } },
        { id: 2, name: 'Robin Smith', role: 'Photographer', image: '/assets/team-2.png', socials: { fb: '#', tw: '#', ig: '#' } },
        { id: 3, name: 'Olivia Nelson', role: 'Videographer', image: '/assets/team-3.png', socials: { fb: '#', tw: '#', ig: '#' } },
        { id: 4, name: 'Jeremy Welch', role: 'Retoucher', image: '/assets/team-4.png', socials: { fb: '#', tw: '#', ig: '#' } },
    ];

    return (
        <section className="team-section">
            <div className="team-header">
                <p className="section-label">Our Team</p>
                <h2 className="section-heading">The Creatives</h2>
            </div>
            <div className="team-grid">
                {teamMembers.map(member => (
                    <div key={member.id} className="team-member">
                        <div className="member-image">
                            <img src={member.image} alt={member.name} />
                        </div>
                        <div className="member-info">
                            <h4 className="member-name">{member.name}</h4>
                            <p className="member-role">{member.role}</p>
                            <div className="social-icons">
                                <a href={member.socials.fb}><FacebookIcon /></a>
                                <a href={member.socials.tw}><TwitterIcon /></a>
                                <a href={member.socials.ig}><InstagramIcon /></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Team;
