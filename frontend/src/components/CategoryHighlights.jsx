import React from 'react';

const CategoryHighlights = () => {
    const categories = [
        { icon: 'fas fa-ring', title: 'Weddings', desc: 'Capturing your most precious moments with elegance and style.' },
        { icon: 'fas fa-user-alt', title: 'Portraits', desc: 'Timeless portraits that reflect your unique personality.' },
        { icon: 'fas fa-vogue', title: 'Fashion', desc: 'Creative fashion photography for brands and individuals.' },
        { icon: 'fas fa-newspaper', title: 'Editorial', desc: 'Compelling visual stories for magazines and publications.' },
    ];

    return (
        <section className="category-highlights">
            <div className="category-highlights-overlay"></div>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="highlights-grid">
                    {categories.map((cat, index) => (
                        <div key={index} className="highlight-item animated fadeInUp">
                            <div className="highlight-icon">
                                <i className={cat.icon}></i>
                            </div>
                            <h3>{cat.title}</h3>
                            <p>{cat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryHighlights;
