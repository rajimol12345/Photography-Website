const mongoose = require('mongoose');
require('dotenv').config({ path: 'd:/photography/backend/.env' });
const User = require('d:/photography/backend/models/User');

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const users = await User.find({}, 'name email role');
        console.log('Existing Users:', JSON.stringify(users, null, 2));

        if (users.length === 0) {
            console.log('NO USERS FOUND.');
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUsers();
