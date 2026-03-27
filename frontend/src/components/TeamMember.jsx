import React from 'react';

const TeamMember = ({ member }) => {
  return (
    <div className="team-member">
      <div className="member-photo">
        <img src={member.image} alt={member.name} />
      </div>
      <div className="member-info">
        <h4 className="member-name">{member.name}</h4>
        <p className="member-role">{member.role}</p>
      </div>
    </div>
  );
};

export default TeamMember;