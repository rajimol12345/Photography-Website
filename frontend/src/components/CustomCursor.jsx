import React, { useState, useEffect } from 'react';
import '../styles/CustomCursor.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const onMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            // Small delay for the main circle
            setTimeout(() => {
                setDotPosition({ x: e.clientX, y: e.clientY });
            }, 50);
            setIsVisible(true);
        };

        const onMouseEnter = () => setIsVisible(true);
        const onMouseLeave = () => setIsVisible(false);

        const onMouseOver = (e) => {
            const target = e.target;
            const isClickable = 
                target.tagName === 'A' || 
                target.tagName === 'BUTTON' || 
                target.closest('a') || 
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer';
            
            setIsHovering(isClickable);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseenter', onMouseEnter);
        window.addEventListener('mouseleave', onMouseLeave);
        window.addEventListener('mouseover', onMouseOver);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseenter', onMouseEnter);
            window.removeEventListener('mouseleave', onMouseLeave);
            window.removeEventListener('mouseover', onMouseOver);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <div 
                className={`cursor-dot ${isHovering ? 'hovering' : ''}`}
                style={{ 
                    left: `${dotPosition.x}px`, 
                    top: `${dotPosition.y}px` 
                }}
            />
            <div 
                className={`cursor-outline ${isHovering ? 'hovering' : ''}`}
                style={{ 
                    left: `${position.x}px`, 
                    top: `${position.y}px` 
                }}
            />
        </>
    );
};

export default CustomCursor;
