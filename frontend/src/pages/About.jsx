import PageHeader from '../components/PageHeader';
import AboutServices from '../components/AboutServices';
import OurStory from '../components/OurStory';
import TeamSection from '../components/TeamSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BookingSection from '../components/BookingSection';

const About = () => {
  return (
    <div className="about-page">
      <PageHeader title="About Us" bgImage="/assets/contact-page.jpg" />
      <AboutServices />
      <OurStory />
      <TeamSection />
      <TestimonialsSection />
      <BookingSection />
    </div>
  );
};

export default About;
