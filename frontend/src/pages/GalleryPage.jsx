import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import GalleryGrid from '../components/GalleryGrid';
import GalleryPagination from '../components/GalleryPagination';
import InstagramStrip from '../components/InstagramStrip';
import '../styles/GalleryPage.css';

const GalleryPage = () => {
    const [galleries, setGalleries] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchGalleries = async () => {
            try {
                const { data } = await axios.get('/api/galleries');
                setGalleries(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching galleries:', error);
                setLoading(false);
            }
        };
        fetchGalleries();
    }, []);

    const prevGallery = {
        link: '#',
        image: '/assets/thumb-3.jpg',
        title: 'Previous Gallery'
    };
    const nextGallery = {
        link: '#',
        image: '/assets/thumb-1.jpg',
        title: 'Next Gallery'
    };

    // Use dynamic images if available, otherwise use static ones for professional look
    const dynamicImages = galleries.flatMap(g =>
        g.isPublic ? g.items.map(item => ({ id: item._id, src: item.imageUrl })) : []
    );

    const staticImages = [
        { id: 1, src: '/assets/gal-1-grid.jpg' },
        { id: 2, src: '/assets/gal-2-grid.jpg' },
        { id: 3, src: '/assets/gal-3-grid.jpg' },
        { id: 4, src: '/assets/gal-4-grid.jpg' },
        { id: 5, src: '/assets/gal-5-grid.jpg' },
        { id: 6, src: '/assets/gal-6-grid.jpg' },
        { id: 7, src: '/assets/gal-7-grid.jpg' },
        { id: 8, src: '/assets/gal-8-grid.jpg' },
        { id: 9, src: '/assets/gal-9-grid.jpg' },
        { id: 10, src: '/assets/gal-grid-14.jpg' },
        { id: 11, src: '/assets/slider-3.jpg' },
        { id: 12, src: '/assets/slider-2.jpeg' },
    ];

    const displayImages = dynamicImages.length > 0 ? dynamicImages : staticImages;

    return (
        <div className="gallery-page">
            <main>
                <div className="container" style={{ padding: '80px 0' }}>
                    <GalleryGrid images={displayImages} />
                </div>
                <GalleryPagination prev={prevGallery} next={nextGallery} />
                <InstagramStrip />
            </main>
        </div>
    );
};

export default GalleryPage;

