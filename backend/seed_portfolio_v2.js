const mongoose = require('mongoose');
require('dotenv').config({ path: 'd:/photography/backend/.env' });
const PortfolioItem = require('d:/photography/backend/models/PortfolioItem');

const seedPortfolio = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const items = [
            {
                title: 'Sophia & James Wedding',
                description: 'A beautiful summer wedding at the lake.',
                imageUrl: '/assets/gal-1-grid.jpg',
                category: 'Wedding',
                isPublic: true
            },
            {
                title: 'Modern Architecture',
                description: 'Exploring the lines and shadows of the city.',
                imageUrl: '/assets/gal-2-grid.jpg',
                category: 'Architecture',
                isPublic: true
            },
            {
                title: 'Nature Explorers',
                description: 'Capturing the wild beauty of the forest.',
                imageUrl: '/assets/gal-3-grid.jpg',
                category: 'Lifestyle',
                isPublic: true
            },
            {
                title: 'The Classic Portrait',
                description: 'Timeless studio portrait photography.',
                imageUrl: '/assets/gal-4-grid.jpg',
                category: 'Portrait',
                isPublic: true
            },
            {
                title: 'Evening Lights',
                description: 'Long exposure shots of city life.',
                imageUrl: '/assets/gal-5-grid.jpg',
                category: 'Street',
                isPublic: true
            }
        ];

        for (const item of items) {
            await PortfolioItem.create(item);
            console.log(`✅ Created Portfolio Item: ${item.title}`);
        }

        console.log('Portfolio Seeding Complete.');
        process.exit();

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

seedPortfolio();
