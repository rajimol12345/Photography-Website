const mongoose = require('mongoose');
require('dotenv').config({ path: 'd:/photography/backend/.env' });
const User = require('d:/photography/backend/models/User');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const userData = {
            name: 'Super Admin',
            email: 'admin@tilia.com',
            password: 'password123',
            role: 'Admin'
        };

        // Check if exists first to avoid duplicate key error
        const exists = await User.findOne({ email: userData.email });
        if (exists) {
            console.log('User already exists. Updating password...');
            exists.password = userData.password; // Will be hashed by pre-save hook
            await exists.save();
            console.log('Password updated.');
        } else {
            const user = await User.create(userData);
            console.log('User created:', user.email);
        }

        console.log('SUCCESS. You can now login with: admin@tilia.com / password123');
        process.exit();
    } catch (error) {
        console.error('Failed:', error);
        process.exit(1);
    }
};

createAdmin();
