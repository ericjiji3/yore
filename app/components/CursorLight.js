'use client';

import { useEffect, useState } from 'react';

export default function CursorLight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth > 768) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleClick = () => {
      if (window.innerWidth > 768) {
        setIsActive(prev => !prev);
      }
    };

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPosition({ x: 0, y: 0 });
        setIsActive(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      className={`cursor-light ${isActive ? 'active' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
} 