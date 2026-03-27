const mongoose = require('mongoose');
require('dotenv').config({ path: 'd:/photography/backend/.env' });
const Testimonial = require('d:/photography/backend/models/Testimonial');

const seedTestimonials = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing to avoid duplicates if preferred, but user said "add 5"
        const testimonials = [
            {
                clientName: 'Emily & David',
                content: 'The photos are absolutely breathtaking! They captured every special moment of our wedding day perfectly.',
                rating: 5,
                isPublic: true
            },
            {
                clientName: 'Michael Thompson',
                content: 'Professional, creative, and a joy to work with. Highly recommended for any corporate events.',
                rating: 5,
                isPublic: true
            },
            {
                clientName: 'Sarah Jenkins',
                content: 'I loved my portrait session. I felt so comfortable and the results are stunning!',
                rating: 4,
                isPublic: true
            },
            {
                clientName: 'James & Lisa',
                content: 'Best photography team in town. Efficient, friendly, and very talented.',
                rating: 5,
                isPublic: true
            },
            {
                clientName: 'Robert Wilson',
                content: 'Great experience from start to finish. The final album exceeded all our expectations.',
                rating: 5,
                isPublic: true
            }
        ];

        for (const t of testimonials) {
            await Testimonial.create(t);
            console.log(`✅ Created Testimonial for: ${t.clientName}`);
        }

        console.log('Testimonial Seeding Complete.');
        process.exit();

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

seedTestimonials();
