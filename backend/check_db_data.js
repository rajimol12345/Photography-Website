const mongoose = require('mongoose');
require('dotenv').config({ path: 'd:/photography/backend/.env' });
const Blog = require('d:/photography/backend/models/Blog');
const PortfolioItem = require('d:/photography/backend/models/PortfolioItem');

const checkData = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.log('No MONGO_URI found in .env');
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const blogCount = await Blog.countDocuments();
        console.log(`Blog Count: ${blogCount}`);

        const portfolioCount = await PortfolioItem.countDocuments();
        console.log(`Portfolio Count: ${portfolioCount}`);

        if (blogCount > 0) {
            const blogs = await Blog.find().limit(1);
            console.log('Sample Blog:', JSON.stringify(blogs[0], null, 2));
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkData();
