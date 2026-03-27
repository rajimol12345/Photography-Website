const mongoose = require('mongoose');
require('dotenv').config({ path: 'd:/photography/backend/.env' });
const Gallery = require('d:/photography/backend/models/Gallery');

const seedGalleries = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const galleries = [
            {
                name: 'Sunset Weddings 2023',
                description: 'A collection of beautiful sunset wedding shots.',
                category: 'Weddings',
                isPublic: true,
                items: [
                    { imageUrl: '/assets/gal-1.jpg' },
                    { imageUrl: '/assets/gal-2.jpg' },
                    { imageUrl: '/assets/gal-3.jpg' }
                ]
            },
            {
                name: 'Urban Portraits',
                description: 'City life and street style portraits.',
                category: 'Portraits',
                isPublic: true,
                items: [
                    { imageUrl: '/assets/gal-4.jpg' },
                    { imageUrl: '/assets/gal-5.jpg' }
                ]
            },
            {
                name: 'Mountain Escapes',
                description: 'Couples shoots in the high mountains.',
                category: 'Lifestyle',
                isPublic: true,
                items: [
                    { imageUrl: '/assets/gal-6.jpg' },
                    { imageUrl: '/assets/gal-7.jpg' },
                    { imageUrl: '/assets/gal-8.jpg' }
                ]
            },
            {
                name: 'Vintage Vibes',
                description: 'Retro styled photoshoot.',
                category: 'Fashion',
                isPublic: true,
                items: [
                    { imageUrl: '/assets/slider-1.webp' }
                ]
            },
            {
                name: 'Candid Moments',
                description: 'Unposed, natural laughter and joy.',
                category: 'Weddings',
                isPublic: true,
                items: [
                    { imageUrl: '/assets/gal-1-grid.jpg' },
                    { imageUrl: '/assets/gal-2-grid.jpg' }
                ]
            }
        ];

        for (const g of galleries) {
            await Gallery.create(g);
            console.log(`✅ Created Gallery: ${g.name}`);
        }

        console.log('Gallery Seeding Complete.');
        process.exit();

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

seedGalleries();
