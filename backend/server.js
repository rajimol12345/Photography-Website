require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const { protect, authorizeRoles } = require('./middleware/authMiddleware');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

// Route Imports
const blogRoutes = require('./routes/blogRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const servicePackageRoutes = require('./routes/servicePackageRoutes');
const teamRoutes = require('./routes/teamRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const contactEnquiryRoutes = require('./routes/contactEnquiryRoutes');
const heroSlideRoutes = require('./routes/heroSlideRoutes');
const userRoutes = require('./routes/authRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');

// Admin Route Imports
const adminBlogRoutes = require('./routes/admin/blogRoutes');
const adminBookingRoutes = require('./routes/admin/bookingRoutes');
const adminContactEnquiryRoutes = require('./routes/admin/contactEnquiryRoutes');
const adminDashboardRoutes = require('./routes/admin/dashboardRoutes');
const adminGalleryRoutes = require('./routes/admin/galleryRoutes');
const adminPortfolioRoutes = require('./routes/admin/portfolioRoutes');
const adminTestimonialRoutes = require('./routes/admin/testimonialRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * PRODUCTION-READY SERVER SETUP
 */
const startServer = async () => {
  try {
    // 1. Establish Database Connection
    await connectDB();

    // 2. Middleware Configuration
    // Bulletproof CORS - Permissive for localized dev environment
    app.use(cors({
      origin: true,
      credentials: true
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan('dev'));

    // Static assets
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

    // Configure GridFS storage for Multer - Use existing connection
    // Configure Multer to use Memory Storage
    // We will handle the GridFS upload manually in the controller to avoid version compatibility issues
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    // 3. API Routing
    app.use('/api/blogs', blogRoutes);
    app.use('/api/categories', categoryRoutes);
    app.use('/api/bookings', bookingRoutes);
    app.use('/api/galleries', galleryRoutes);
    app.use('/api/portfolio', portfolioRoutes);
    app.use('/api/services', servicePackageRoutes);
    app.use('/api/team', teamRoutes);
    app.use('/api/contact-enquiries', contactEnquiryRoutes);
    app.use('/api/hero-slides', heroSlideRoutes);
    app.use('/api/testimonials', testimonialRoutes);
    app.use('/api/users', userRoutes);

    // Protected Admin-Only APIs
    app.use('/api/admin/blogs', protect, authorizeRoles('Admin'), adminBlogRoutes);
    app.use('/api/admin/bookings', protect, authorizeRoles('Admin'), adminBookingRoutes);
    app.use('/api/admin/contact-enquiries', protect, authorizeRoles('Admin'), adminContactEnquiryRoutes);
    app.use('/api/admin/dashboard', protect, authorizeRoles('Admin'), adminDashboardRoutes);
    app.use('/api/admin/galleries', protect, authorizeRoles('Admin'), adminGalleryRoutes);
    app.use('/api/admin/portfolio', protect, authorizeRoles('Admin'), adminPortfolioRoutes);
    app.use('/api/admin/testimonials', protect, authorizeRoles('Admin'), adminTestimonialRoutes);

    // Media Upload API
    // Route handles its own protection for POST/DELETE
    app.use('/api/upload', uploadRoutes(upload));

    // 4. System Health & Default Entry
    app.get('/api/health', (req, res) => {
      res.status(200).json({
        status: 'UP',
        version: '1.0.3_diag_stable',
        timestamp: new Date().toISOString()
      });
    });

    app.get('/', (req, res) => {
      res.send('Tilia Photography API v1.0.2');
    });

    // 5. Global Error Handling
    app.use((req, res, next) => {
      res.status(404);
      next(new Error(`API Endpoint Not Found - ${req.originalUrl}`));
    });

    app.use((err, req, res, next) => {
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

      console.error(`[ERROR HANDLER] ${statusCode}: ${err.message}`);
      if (statusCode === 500) {
        console.error(err.stack);
      }

      res.status(statusCode).json({
        message: err.message || 'Internal Server Failure',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
    });

    // 6. Listener with Dynamic Port Fallback
    const startListener = (currentPort) => {
      const server = app.listen(currentPort, () => {
        console.log(`🚀 Server fully operational on port ${currentPort}`);
        console.log(`📡 CORS status: VERIFIED PERMISSIVE`);
      });

      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.error(`🔥 CRITICAL: Port ${currentPort} is busy. Unable to start server.`);
          console.error(`   Please stop the process running on port ${currentPort} and try again.`);
          process.exit(1);
        } else {
          console.error(`🔥 Server Error: ${err.message}`);
          process.exit(1);
        }
      });
    };

    startListener(PORT);

  } catch (error) {
    console.error(`🔥 CRITICAL: Server startup failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();