import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/GalleryPagination.css';

const GalleryPagination = ({ prev, next }) => {
    return (
        <section className="gallery-pagination-section">
            <div className="gallery-pagination-container">
                {prev ? (
                    <Link to={prev.link} className="pagination-link prev">
                        <div className="pagination-thumb">
                            <img src={prev.image} alt="Previous Gallery" />
                        </div>
                        <div className="pagination-text">
                            <span className="pagination-label">Previous Gallery</span>
                        </div>
                    </Link>
                ) : <div className="spacer"></div>}
                
                {next ? (
                    <Link to={next.link} className="pagination-link next">
                        <div className="pagination-text">
                            <span className="pagination-label">Next Gallery</span>
                        </div>
                        <div className="pagination-thumb">
                            <img src={next.image} alt="Next Gallery" />
                        </div>
                    </Link>
                ) : <div className="spacer"></div>}
            </div>
        </section>
    );
};

export default GalleryPagination;
