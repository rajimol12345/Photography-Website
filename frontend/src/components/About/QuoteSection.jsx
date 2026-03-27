import React from 'react';

const QuoteSection = () => {
    return (
        <section className="section-padding">
            <div className="container text-center">
                <blockquote style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    fontStyle: 'italic',
                    maxWidth: '800px',
                    margin: '0 auto',
                    lineHeight: '1.4'
                }}>
                    "Photography is the story I fail to put into words."
                </blockquote>
                <cite style={{
                    display: 'block',
                    marginTop: '20px',
                    fontSize: '1rem',
                    color: 'var(--color-grey-medium)',
                    fontStyle: 'normal',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}>
                    Destin Sparks
                </cite>
            </div>
        </section>
    );
};

export default QuoteSection;
