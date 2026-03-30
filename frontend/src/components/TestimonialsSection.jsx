import React, { useEffect, useState } from 'react';
import API from '../api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await API.get('/api/testimonials');
        console.log('Testimonials Received:', data);
        setTestimonials(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading || testimonials.length === 0) return null;

  return (
    <section className="testimonials-section-v2">
      <div className="testimonials-overlay-v2"></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="centered-quote-icon">
          <i className="fas fa-quote-left"></i>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          className="testimonials-slider-v2"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t._id}>
              <div className="testimonial-item-v2 animated fadeInUp">
                <p className="testimonial-text-v2">"{t.content}"</p>
                <div className="testimonial-author-v2">{t.clientName}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
