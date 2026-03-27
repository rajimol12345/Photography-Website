const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Load models
const Blog = require('./models/Blog');
const Category = require('./models/Category');
const User = require('./models/User');
const HeroSlide = require('./models/HeroSlide');
const PortfolioItem = require('./models/PortfolioItem');
const Gallery = require('./models/Gallery');
const TeamMember = require('./models/TeamMember');
const ServicePackage = require('./models/ServicePackage');
const Testimonial = require('./models/Testimonial');
const Booking = require('./models/Booking');
const ContactEnquiry = require('./models/ContactEnquiry');

// Connect to DB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected for Seeder: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    // Clear existing data
    await Blog.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();
    await HeroSlide.deleteMany();
    await PortfolioItem.deleteMany();
    await Gallery.deleteMany();
    await TeamMember.deleteMany();
    await ServicePackage.deleteMany();

    // Create users - Manually hash password since insertMany bypasses pre-save hook
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const createdUsers = await User.insertMany([
      {
        name: 'April Ryan',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'Admin',
      },
    ]);
    const adminUser = createdUsers[0];
    console.log('Users Created...');

    // Create categories
    const createdCategories = await Category.insertMany([
      { name: 'Fashion', slug: 'fashion' },
      { name: 'Wedding', slug: 'wedding' },
      { name: 'Lifestyle', slug: 'lifestyle' },
      { name: 'Travel', slug: 'travel' },
    ]);
    const fashionCat = createdCategories[0];
    const weddingCat = createdCategories[1];
    const lifestyleCat = createdCategories[2];
    const travelCat = createdCategories[3];
    console.log('Categories Created...');

    // Create Hero Slides
    await HeroSlide.insertMany([
      {
        title: 'Wedding Photography',
        subtitle: 'Elegant, Timeless Moments Captured',
        imageUrl: '/assets/slider-1.webp',
        buttonText: 'Find More',
        buttonLink: '/portfolio',
        order: 1
      },
      {
        title: 'Couple Portraits',
        subtitle: 'Celebrate Your Love Story',
        imageUrl: '/assets/slider-2.jpg',
        buttonText: 'Find More',
        buttonLink: '/portfolio',
        order: 2
      },
      {
        title: 'Fashion Sessions',
        subtitle: 'High-End Editorial Photography',
        imageUrl: '/assets/slider-3.jpg',
        buttonText: 'Find More',
        buttonLink: '/portfolio',
        order: 3
      }
    ]);
    console.log('Hero Slides Created...');

    // Create Portfolio Items (Matching Tilia Demo 'Selected Work')
    await PortfolioItem.insertMany([
      { title: 'Tracy & Aaron', category: 'Wedding', imageUrl: '/assets/gal-1-grid.jpg', isFeatured: true, isPublic: true },
      { title: 'Jane & Paul', category: 'Wedding', imageUrl: '/assets/gal-2-grid.jpg', isFeatured: true, isPublic: true },
      { title: 'Angela & Zach', category: 'Wedding', imageUrl: '/assets/gal-3-grid.jpg', isFeatured: true, isPublic: true },
      { title: 'Diana & Max', category: 'Wedding', imageUrl: '/assets/gal-4-grid.jpg', isFeatured: true, isPublic: true },
      { title: 'Tina & Robi', category: 'Lifestyle', imageUrl: '/assets/gal-5-grid.jpg', isFeatured: true, isPublic: true },
      { title: 'Clara & Andrew', category: 'Lifestyle', imageUrl: '/assets/gal-6-grid.jpg', isFeatured: true, isPublic: true },
      { title: 'Street People', category: 'Portrait', imageUrl: '/assets/gal-7-grid.jpg', isFeatured: true, isPublic: true },
      { title: 'Ballet Dancers', category: 'Lifestyle', imageUrl: '/assets/gal-8-grid.jpg', isFeatured: true, isPublic: true },
    ]);
    console.log('Portfolio Items Created...');

    // Create Team Members
    await TeamMember.insertMany([
      { name: 'April Ryan', role: 'Main Photographer', imageUrl: '/assets/img-aboutus.jpg', bio: 'Passionate about capturing emotions.' },
      { name: 'John Doe', role: 'Editor', imageUrl: '/assets/img-aboutus.jpg', bio: 'Loves the details.' }
    ]);
    console.log('Team Members Created...');

    // Create Service Packages
    await ServicePackage.insertMany([
      { name: 'Standard Wedding', category: 'Wedding', price: 1200, description: 'Basic wedding coverage.', features: ['4 Hours', '200 Photos', 'Digital Gallery'], isAvailable: true },
      { name: 'Premium Wedding', category: 'Wedding', price: 2500, description: 'Full day wedding coverage.', features: ['8 Hours', '500 Photos', 'Wedding Album', 'Digital Gallery'], isAvailable: true }
    ]);
    console.log('Service Packages Created...');

    // Create Testimonials
    const Testimonial = require('./models/Testimonial');
    const ContactEnquiry = require('./models/ContactEnquiry');
    const Booking = require('./models/Booking');

    // ... (rest of imports are top level, but for new models we might need require if not top level)
    // Actually best to ensure all models are required at top, but I'll add them here inside if I can't edit top easily or just rely on existing structure.
    // Wait, let's verify top imports.
    // I can't easily edit top and bottom in one go with replace_file_content unless I replace widely.
    // I see the pattern is creating arrays and inserting.

    // Helper to pick random item
    const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    // --- Generate 20+ Portfolio Items ---
    const portfolioImages = ['/assets/gal-1-grid.jpg', '/assets/gal-2-grid.jpg', '/assets/gal-3-grid.jpg', '/assets/gal-4-grid.jpg', '/assets/gal-5-grid.jpg', '/assets/gal-6-grid.jpg', '/assets/gal-7-grid.jpg', '/assets/gal-8-grid.jpg'];
    const portfolioTitles = ['Summer Love', 'Urban Vibes', 'Mountain Wedding', 'Classic Portrait', 'Studio Session', 'Beach Day', 'Vintage Style', 'Modern Art'];
    const catNames = ['Wedding', 'Fashion', 'Lifestyle', 'Travel'];

    let stats = [];

    const extraPortfolios = [];
    for (let i = 0; i < 20; i++) {
      extraPortfolios.push({
        title: `${randomItem(portfolioTitles)} ${i + 1}`,
        category: randomItem(catNames),
        imageUrl: randomItem(portfolioImages),
        isFeatured: Math.random() > 0.7,
        isPublic: true
      });
    }
    await PortfolioItem.insertMany(extraPortfolios);
    console.log('Portfolio Items (20+) Created...');

    // --- Generate 20+ Blogs ---
    const blogImages = ['/assets/insta-1.jpg', '/assets/insta-2.jpg', '/assets/insta-3.jpg', '/assets/insta-4.jpg'];
    const extraBlogs = [];
    for (let i = 0; i < 20; i++) {
      extraBlogs.push({
        title: `Blog Post Title ${i + 1}: ${randomItem(['The Beauty of Nature', 'Wedding Tips', 'Photography Hacks', 'Travel Diario'])}`,
        slug: `blog-post-${i + 1}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
        content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
        imageUrl: randomItem(blogImages),
        author: adminUser._id,
        category: randomItem([fashionCat._id, weddingCat._id, lifestyleCat._id, travelCat._id]),
        tags: ['Photography', 'Life', 'Art'],
      });
    }
    await Blog.insertMany(extraBlogs);
    console.log('Blogs (20+) Created...');

    // --- Generate 20 Galleries ---
    const extraGalleries = [];
    for (let i = 0; i < 20; i++) {
      extraGalleries.push({
        name: `Gallery Collection ${i + 1}`,
        category: randomItem(createdCategories).name, // Must be String name, not ID
        description: 'A beautiful collection of memories.',
        isPublic: true,
        items: [
          { imageUrl: randomItem(portfolioImages) },
          { imageUrl: randomItem(portfolioImages) },
          { imageUrl: randomItem(portfolioImages) }
        ]
      });
    }
    await Gallery.insertMany(extraGalleries);
    console.log('Galleries (20+) Created...');

    // --- Generate 20 Testimonials ---
    // Need to require Testimonial model if not loaded
    // But I see I can't easily add require to top. 
    // I'll assume I need to add them to top in a separate edit or just use require inline (bad practice but works) or rely on what I saw in file list.
    // Wait, I saw models folder has Testimonial.js.



    // --- Generate 20 Testimonials ---
    const extraTestimonials = [];
    for (let i = 0; i < 20; i++) {
      extraTestimonials.push({
        clientName: `Happy Client ${i + 1}`,
        role: randomItem(['Bride', 'Groom', 'Model', 'Event Planner']),
        content: 'Absolutely amazing application! The photography skills were top-notch and the team was super professional. Highly recommended!',
        rating: randomInt(4, 5),
        imageUrl: randomItem(portfolioImages),
        isFeatured: Math.random() > 0.5
      });
    }
    await Testimonial.insertMany(extraTestimonials);
    console.log('Testimonials (20+) Created...');

    // --- Generate 20 Bookings ---
    const extraBookings = [];
    for (let i = 0; i < 20; i++) {
      extraBookings.push({
        name: `Booking Client ${i + 1}`,
        email: `client${i + 1}@example.com`,
        phone: '123-456-7890',
        service: randomItem(['Wedding', 'Portrait', 'Fashion', 'Editorial']), // Matches enum
        eventDate: new Date(Date.now() + randomInt(86400000, 31536000000)), // Matches field name
        numberOfPeople: randomInt(1, 100), // Required
        message: 'Looking forward to this session.'
      });
    }
    await Booking.insertMany(extraBookings);
    console.log('Bookings (20+) Created...');

    // --- Generate 20 Contact Enquiries ---
    const extraEnquiries = [];
    for (let i = 0; i < 20; i++) {
      extraEnquiries.push({
        name: `Enquiry User ${i + 1}`,
        email: `enquiry${i + 1}@test.com`,
        subject: randomItem(['Availability', 'Pricing', 'Collaboration', 'General Question']),
        message: 'Hello, I would like to know more about your services.',
        read: Math.random() > 0.5
      });
    }
    await ContactEnquiry.insertMany(extraEnquiries);
    console.log('Contact Enquiries (20+) Created...');
    console.log('Blogs Created...');

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Blog.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();
    await HeroSlide.deleteMany();
    await PortfolioItem.deleteMany();
    await Gallery.deleteMany();
    await TeamMember.deleteMany();
    await ServicePackage.deleteMany();
    await Testimonial.deleteMany();
    await Booking.deleteMany();
    await ContactEnquiry.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  if (process.argv[2] === '-d') {
    await destroyData();
  } else {
    await importData();
  }
}

run();
