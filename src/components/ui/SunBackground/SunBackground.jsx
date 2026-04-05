import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SunBackground.css';

gsap.registerPlugin(ScrollTrigger);

const SunBackground = () => {
  const sunRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // Parallax effect: Sun rises and scales up as user scrolls through Services section
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [sunRef.current, glowRef.current],
        { yPercent: 60, scale: 0.5, opacity: 0 },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.services-section',
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="sun-container">
      <div className="sun-glow" ref={glowRef}></div>
      <div className="sun-core" ref={sunRef}></div>
    </div>
  );
};

export default SunBackground;
