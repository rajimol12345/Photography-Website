import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';

// Import Layout Component (to be created)
import Layout from './components/Layout'; // Assuming a Layout component

// Import Pages (to be created)
// Tilia Pages
import Home from './pages/Home1';
import About from './pages/AboutUs';
import PortfolioGridV1 from './pages/PortfolioGridV1';
import GalleryPage from './pages/GalleryPage';
import Blog from './pages/Blog';
import BlogSingle from './pages/BlogSingle';
import Contact from './pages/Contact';
import BookingPage from './pages/BookingPage';
import AdminLayout from './components/AdminLayout'; // Import AdminLayout
import AdminDashboard from './pages/AdminDashboard'; // Import AdminDashboard
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import LoginPage from './pages/LoginPage'; // Import LoginPage
import RegisterPage from './pages/RegisterPage'; // Import RegisterPage
import BlogListScreen from './pages/admin/BlogListScreen'; // Import BlogListScreen
import BlogCreateScreen from './pages/admin/BlogCreateScreen'; // Import BlogCreateScreen
import BlogEditScreen from './pages/admin/BlogEditScreen'; // Import BlogEditScreen
import PortfolioListScreen from './pages/admin/PortfolioListScreen'; // Import PortfolioListScreen
import PortfolioCreateScreen from './pages/admin/PortfolioCreateScreen'; // Import PortfolioCreateScreen
import PortfolioEditScreen from './pages/admin/PortfolioEditScreen'; // Import PortfolioEditScreen
import GalleryListScreen from './pages/admin/GalleryListScreen'; // Import GalleryListScreen
import GalleryCreateScreen from './pages/admin/GalleryCreateScreen'; // Import GalleryCreateScreen
import GalleryEditScreen from './pages/admin/GalleryEditScreen'; // Import GalleryEditScreen
import BookingListScreen from './pages/admin/BookingListScreen'; // Import BookingListScreen
import BookingDetailsScreen from './pages/admin/BookingDetailsScreen'; // Import BookingDetailsScreen
import BookingEditScreen from './pages/admin/BookingEditScreen'; // Import BookingEditScreen
import ContactEnquiryListScreen from './pages/admin/ContactEnquiryListScreen'; // Import ContactEnquiryListScreen
import ContactEnquiryDetailsScreen from './pages/admin/ContactEnquiryDetailsScreen'; // Import ContactEnquiryDetailsScreen
import TestimonialListScreen from './pages/admin/TestimonialListScreen'; // Import TestimonialListScreen
import HeroSlideListScreen from './pages/admin/HeroSlideListScreen'; // Import HeroSlideListScreen
import HeroSlideCreateScreen from './pages/admin/HeroSlideCreateScreen'; // Import HeroSlideCreateScreen
import HeroSlideEditScreen from './pages/admin/HeroSlideEditScreen'; // Import HeroSlideEditScreen
import ServicePackageListScreen from './pages/admin/ServicePackageListScreen'; // Import ServicePackageListScreen
import ServicePackageCreateScreen from './pages/admin/ServicePackageCreateScreen'; // Import ServicePackageCreateScreen
import ServicePackageEditScreen from './pages/admin/ServicePackageEditScreen'; // Import ServicePackageEditScreen
import TeamMemberListScreen from './pages/admin/TeamMemberListScreen'; // Import TeamMemberListScreen
import TeamMemberCreateScreen from './pages/admin/TeamMemberCreateScreen'; // Import TeamMemberCreateScreen
import TeamMemberEditScreen from './pages/admin/TeamMemberEditScreen'; // Import TeamMemberEditScreen
import TestimonialCreateScreen from './pages/admin/TestimonialCreateScreen'; // Import TestimonialCreateScreen
import TestimonialEditScreen from './pages/admin/TestimonialEditScreen'; // Import TestimonialEditScreen
import UserListScreen from './pages/admin/UserListScreen'; // Import UserListScreen
import UserDetailsScreen from './pages/admin/UserDetailsScreen'; // Import UserDetailsScreen

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CustomCursor />
      <Routes>
        {/* Tilia Pages (Self-contained Headers) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<PortfolioGridV1 />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogSingle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<BookingPage />} />
        </Route>


        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="blogs" element={<BlogListScreen />} />
            <Route path="blogs/create" element={<BlogCreateScreen />} />
            <Route path="blogs/:id/edit" element={<BlogEditScreen />} />
            <Route path="portfolio" element={<PortfolioListScreen />} />
            <Route path="portfolio/create" element={<PortfolioCreateScreen />} />
            <Route path="portfolio/:id/edit" element={<PortfolioEditScreen />} />
            <Route path="galleries" element={<GalleryListScreen />} />
            <Route path="galleries/create" element={<GalleryCreateScreen />} />
            <Route path="galleries/:id/edit" element={<GalleryEditScreen />} />
            <Route path="bookings" element={<BookingListScreen />} />
            <Route path="bookings/:id" element={<BookingDetailsScreen />} />
            <Route path="bookings/:id/edit" element={<BookingEditScreen />} />
            <Route path="contact-enquiries" element={<ContactEnquiryListScreen />} />
            <Route path="contact-enquiries/:id" element={<ContactEnquiryDetailsScreen />} />
            <Route path="testimonials" element={<TestimonialListScreen />} />
            <Route path="testimonials/create" element={<TestimonialCreateScreen />} />
            <Route path="testimonials/:id/edit" element={<TestimonialEditScreen />} />
            <Route path="hero-slides" element={<HeroSlideListScreen />} />
            <Route path="hero-slides/create" element={<HeroSlideCreateScreen />} />
            <Route path="hero-slides/:id/edit" element={<HeroSlideEditScreen />} />
            <Route path="service-packages" element={<ServicePackageListScreen />} />
            <Route path="service-packages/create" element={<ServicePackageCreateScreen />} />
            <Route path="service-packages/:id/edit" element={<ServicePackageEditScreen />} />
            <Route path="team" element={<TeamMemberListScreen />} />
            <Route path="team/create" element={<TeamMemberCreateScreen />} />
            <Route path="team/create" element={<TeamMemberCreateScreen />} />
            <Route path="team/:id/edit" element={<TeamMemberEditScreen />} />
            <Route path="team/:id/edit" element={<TeamMemberEditScreen />} />
            <Route path="users" element={<UserListScreen />} />
            <Route path="users/:id" element={<UserDetailsScreen />} />
          </Route>
        </Route>

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>);
}

export default App;
