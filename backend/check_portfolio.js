const mongoose = require('mongoose');
require('dotenv').config({ path: 'd:/photography/backend/.env' });
const PortfolioItem = require('d:/photography/backend/models/PortfolioItem');

const checkPortfolio = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const items = await PortfolioItem.find({});
        console.log(`Common Items Count: ${items.length}`);
        console.log('Items:', JSON.stringify(items.map(i => ({ title: i.title, isPublic: i.isPublic })), null, 2));

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkPortfolio();
