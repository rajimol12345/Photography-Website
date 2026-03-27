import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GalleryGrid from '../components/GalleryGrid';

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const { data } = await axios.get('/api/galleries');
        const fetchedGalleries = Array.isArray(data) ? data : (data.galleries || []);
        setGalleries(fetchedGalleries);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchGalleryData();
  }, []);

  if (loading) return null;

  return (
    <>
      <section className="page-header" style={{ backgroundImage: "url('/assets/portfolio1-page.jpg)" }}>
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content animated fadeInUp">
            <span className="section-subtitle" style={{ color: 'var(--white)' }}>Intimate Wedding by the Sea</span>
            <h1 className="page-title">Gallery Masonry 4 Cols</h1>
            <div className="breadcrumbs">
              <Link to="/">Home</Link>
              <span className="separator">/</span>
              <span className="current">Gallery</span>
            </div>
          </div>
        </div>
      </section>

      <div className="section">
        <div className="container" style={{ maxWidth: '100%', padding: '0 30px' }}>
          <GalleryGrid galleries={galleries} />
        </div>
      </div>
    </>
  );
};

export default Gallery;
