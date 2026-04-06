import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

// Import Modular Sections
import Hero from './components/Hero/Hero';
import Stats from './components/Stats/Stats';
import Leadership from './components/Leadership/Leadership';
import Features from './components/Features/Features';
import CTA from './components/CTA/CTA';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Global Entrance Animations
      const animatable = gsap.utils.toArray('.fade-up, .member-row');
      animatable.forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Hero specific entrance context
      gsap.from('.hero-h1', { opacity: 0, y: 30, duration: 1, delay: 0.2 });
      gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 1, delay: 0.4 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-container" ref={containerRef}>
      <Hero />
      <Stats />
      <Leadership />
      <Features />
      <CTA />
    </div>
  );
};

export default Home;
