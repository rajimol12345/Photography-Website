import React from 'react';

const AboutServices = () => {
    const services = [
        { icon: 'fa-camera', title: 'Weddings', desc: 'Est sale definitiones id. Ut quo quem harum munere, eu labore voluptatum mei.' },
        { icon: 'fa-id-card', title: 'Portraits', desc: 'Est sale definitiones id. Ut quo quem harum munere, eu labore voluptatum mei.' },
        { icon: 'fa-tshirt', title: 'Fashion', desc: 'Est sale definitiones id. Ut quo quem harum munere, eu labore voluptatum mei.' },
        { icon: 'fa-newspaper', title: 'Editorial', desc: 'Est sale definitiones id. Ut quo quem harum munere, eu labore voluptatum mei.' },
        { icon: 'fa-video', title: 'Video', desc: 'Est sale definitiones id. Ut quo quem harum munere, eu labore voluptatum mei.' },
        { icon: 'fa-magic', title: 'Retouch', desc: 'Est sale definitiones id. Ut quo quem harum munere, eu labore voluptatum mei.' },
    ];

    return (
        <section className="section bg-white">
            <div className="container">
                <div className="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
                    {services.map((s, index) => (
                        <div key={index} className="service-item-v2 d-flex animated fadeInUp">
                            <div className="service-icon" style={{ fontSize: '40px', color: 'var(--accent)', marginRight: '20px' }}>
                                <i className={`fas ${s.icon}`}></i>
                            </div>
                            <div className="service-content">
                                <h4 style={{ fontSize: '18px', marginBottom: '10px' }}>{s.title}</h4>
                                <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-light)' }}>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutServices;
