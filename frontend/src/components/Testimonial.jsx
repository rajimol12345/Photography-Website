import React from 'react';
import '../styles/Testimonial.css';

const QuoteIcon = () => <span>"</span>;

const Testimonial = ({ backgroundImage, text, author, role }) => {
    const defaultTestimonials = [
        {
            id: 1,
            text: "Snap was amazing on our wedding day. They were so professional and made us feel so comfortable. The photos and video are absolutely stunning!",
            author: "Amanda & Steve",
            role: "Happy Couple"
        },
        {
            id: 2,
            text: "Professional, creative, and incredibly talented. They captured moments we didn't even know happened. Highly recommended!",
            author: "Sarah & Mike",
            role: "Newlyweds"
        },
        {
            id: 3,
            text: "The best investment we made for our wedding. The team was unobtrusive yet present for every important moment.",
            author: "Emily & James",
            role: "Happy Clients"
        }
    ];

    // If props are provided, use them as a single testimonial
    const testimonials = text ? [{ id: 1, text, author, role }] : defaultTestimonials;

    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
        if (testimonials.length <= 1) return;
        
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
                setIsAnimating(false);
            }, 500); // Wait for fade out
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const currentTestimonial = testimonials[activeIndex];

    return (
        <section
            className="testimonial-section"
            style={{ backgroundImage: `url(${backgroundImage || '/assets/test-bg.jpeg'})` }}
        >
            <div className="testimonial-overlay"></div>
            <div className="testimonial-content">
                <div className="quote-icon"><QuoteIcon /></div>

                <div className={`testimonial-slider ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                    <p className="testimonial-text">"{currentTestimonial.text}"</p>
                    <p className="testimonial-author">{currentTestimonial.author}</p>
                    <p className="author-role">{currentTestimonial.role}</p>
                </div>

                {testimonials.length > 1 && (
                    <div className="testimonial-dots">
                        {testimonials.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === activeIndex ? 'active' : ''}`}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonial;