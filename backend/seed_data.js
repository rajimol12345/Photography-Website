const mongoose = require('mongoose');
require('dotenv').config({ path: 'd:/photography/backend/.env' });
const Blog = require('d:/photography/backend/models/Blog');
const PortfolioItem = require('d:/photography/backend/models/PortfolioItem');
const Category = require('d:/photography/backend/models/Category');
const User = require('d:/photography/backend/models/User');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // 1. Get or Create User (Admin)
        let admin = await User.findOne({ role: 'Admin' });
        if (!admin) {
            console.log('creating temp admin...');
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash('123456', salt);
            admin = await User.create({
                name: 'Temp Admin',
                email: 'admin@temp.com',
                password: 'password_hashed_by_hooks_usually', // Hook handles it? No, raw create bypasses save hook on some drivers, but Mongoose .create uses save.
                // Actually, let's just find ANY user
                role: 'Admin'
            });
        }
        // Fallback if creating fails or complicated: find ANY user
        if (!admin) admin = await User.findOne({});
        console.log(`Using Author: ${admin._id}`);

        // 2. Get or Create Category
        let category = await Category.findOne({ slug: 'weddings' });
        if (!category) {
            category = await Category.create({ name: 'Weddings', slug: 'weddings' });
        }
        console.log(`Using Category: ${category._id}`);

        // 3. Create NEW Blog Post
        const newBlog = await Blog.create({
            title: `New Blog Post ${Date.now()}`,
            excerpt: 'This is a dynamically added blog post to test the hybrid data fetching.',
            content: '<p>Content for the dynamic blog post.</p>',
            imageUrl: '/assets/blog-1.jpg', // Use local asset for safety
            author: admin._id,
            category: category._id,
            isPublic: true
        });
        console.log(`✅ Created Blog: ${newBlog.title}`);

        // 4. Create NEW Portfolio Item
        const newPortfolio = await PortfolioItem.create({
            title: `Dynamic Portfolio ${Date.now()}`,
            description: 'Dynamically added portfolio item',
            imageUrl: '/assets/gal-1-grid.jpg',
            category: 'Weddings', // String as per schema
            isPublic: true
        });
        console.log(`✅ Created Portfolio: ${newPortfolio.title}`);

        console.log('Seeding Complete. Exit.');
        process.exit();

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

seedData();
