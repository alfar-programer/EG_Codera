import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Code2, Cpu, Box, Bot, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Scene from '../../components/3d/Scene';
import CanvasClub from '../../components/ui/CanvasClub/CanvasClub';
import SunBackground from '../../components/ui/SunBackground/SunBackground';
import CompanySection from '../../components/ui/CompanySection/CompanySection';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef        = useRef(null);
  const canvasWrapperRef    = useRef(null);
  const heroContentRef      = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Hero entrance reveal
      gsap.from(heroContentRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      });

      // 2. Track scroll progress (0 → 1) to drive 3D spin + zoom
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => setScrollProgress(self.progress),
      });

      // 3. Canvas wrapper lateral slide (robot moves across sections)
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          }
        });

        // 1. Move to Services section (left)
        tl.fromTo(canvasWrapperRef.current, 
          { x: '22vw', y: '0vh' }, 
          { x: '-22vw', y: '0vh', ease: 'none', duration: 1 }
        );

        // 2. Move to Company section (bottom right)
        tl.to(canvasWrapperRef.current, {
          x: '35vw',
          y: '30vh',
          ease: 'none',
          duration: 1
        });
      });

      // 4. Original sun-services section entrance
      gsap.from('.services-title', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-section', start: 'top 70%' },
      });
      gsap.from('.service-item', {
        x: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-section', start: 'top 60%' },
      });

      // 5. New services showcase entrance
      gsap.from('.showcase-header > *', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.home-showcase-section', start: 'top 70%' },
      });
      gsap.from('.showcase-card', {
        y: 60, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: '.showcase-grid', start: 'top 75%' },
      });
      gsap.from('.showcase-cta', {
        y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.showcase-cta', start: 'top 90%' },
      });

      // 6. Global Light Mode (Good Mode) transition
      ScrollTrigger.create({
        trigger: '.services-section',
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => document.body.classList.add('light-mode'),
        onLeave: () => document.body.classList.remove('light-mode'),
        onEnterBack: () => document.body.classList.add('light-mode'),
        onLeaveBack: () => document.body.classList.remove('light-mode'),
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-container" ref={containerRef}>

      {/* 3D Canvas — fixed, behind HTML layers */}
      <div className="canvas-wrapper" ref={canvasWrapperRef}>
        <Scene scrollProgress={scrollProgress} />
      </div>

      {/* ── HERO ── */}
      <section className="section hero-section">
        <div className="hero-content" ref={heroContentRef}>
          <div className="glow-badge">
            <span className="glow-dot"></span> Futuristic Digital Agency
          </div>
          <h1 className="hero-title">
            We Craft <span className="text-gradient">Digital Experiences</span> That Move
          </h1>
          <div className="hero-subtext-container">
            <div className="vertical-line"></div>
            <p className="hero-subtext">
              Merging GSAP motion, cutting-edge 3D visuals, and AI-driven logic to build
              web applications that leave a lasting impression.
            </p>
          </div>
          <div className="btn-group">
            <button className="btn-primary">
              <span className="btn-text">Start Project</span>
              <div className="btn-shine"></div>
            </button>
            <button className="btn-secondary"><Play size={18} /> View Work</button>
          </div>
        </div>
        <div className="hero-robot-bg">
          <CanvasClub />
        </div>
      </section>

      {/* ── SUN SERVICES (original, untouched) ── */}
      <section className="section services-section">
        <SunBackground />
        <div className="services-content">
          <h2 className="services-title">Pioneering the Web</h2>

          <div className="service-item">
            <div className="service-icon"><Box size={24} /></div>
            <div className="service-info">
              <h3>Immersive 3D</h3>
              <p>We use React Three Fiber and WebGL to create environments where users don't just scroll, they explore.</p>
            </div>
          </div>

          <div className="service-item">
            <div className="service-icon"><Code2 size={24} /></div>
            <div className="service-info">
              <h3>GSAP Motion</h3>
              <p>Fluid, physics-based storytelling animations that guide your users seamlessly down the page.</p>
            </div>
          </div>

          <div className="service-item">
            <div className="service-icon"><Cpu size={24} /></div>
            <div className="service-info">
              <h3>AI Solutions</h3>
              <p>Integrating the latest generative AI paradigms natively into functional, lightning-fast frontend tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW SERVICES SHOWCASE (separate section) ── */}
      <section className="section home-showcase-section">
        <div className="services-showcase">

          {/* Header */}
          <div className="showcase-header">
            <div className="showcase-label">
              <span className="showcase-dot" />
              What We Build
            </div>
            <h2 className="showcase-title">Our Core Services</h2>
            <p className="showcase-sub">
              Three disciplines fused together — AI agents, fluid animation
              and immersive 3D — to create digital products that feel alive.
            </p>
          </div>

          {/* Cards */}
          <div className="showcase-grid">

            <div className="showcase-card" id="home-svc-ai" style={{'--card-accent':'#00f0ff','--card-rgb':'0,240,255'}}>
              <div className="sc-icon-wrap"><Bot size={28} className="sc-icon" /></div>
              <h3 className="sc-title">AI-Powered Agents</h3>
              <p className="sc-desc">
                Intelligent agents embedded in your product — smart assistants,
                recommendations and autonomous workflow automation.
              </p>
              <ul className="sc-bullets">
                <li><span className="sc-dot" />LLM integrations (OpenAI, Gemini)</li>
                <li><span className="sc-dot" />RAG pipelines</li>
                <li><span className="sc-dot" />Real-time personalisation</li>
              </ul>
              <div className="sc-footer">
                <Link to="/services#service-ai-agents" className="sc-link">Learn more <ArrowRight size={14}/></Link>
              </div>
            </div>

            <div className="showcase-card showcase-card--mid" id="home-svc-gsap" style={{'--card-accent':'#8a2be2','--card-rgb':'138,43,226'}}>
              <div className="sc-icon-wrap"><Zap size={28} className="sc-icon" /></div>
              <h3 className="sc-title">GSAP Animation</h3>
              <p className="sc-desc">
                Scroll-triggered timelines, physics micro-interactions and
                cinematic page transitions that reward curiosity.
              </p>
              <ul className="sc-bullets">
                <li><span className="sc-dot" />ScrollTrigger storytelling</li>
                <li><span className="sc-dot" />SVG path morphing</li>
                <li><span className="sc-dot" />Route transitions</li>
              </ul>
              <div className="sc-footer">
                <Link to="/services#service-gsap-animation" className="sc-link">Learn more <ArrowRight size={14}/></Link>
              </div>
            </div>

            <div className="showcase-card" id="home-svc-3d" style={{'--card-accent':'#00ffcc','--card-rgb':'0,255,204'}}>
              <div className="sc-icon-wrap"><Box size={28} className="sc-icon" /></div>
              <h3 className="sc-title">3D Web Experiences</h3>
              <p className="sc-desc">
                Interactive 3D scenes in the browser — product showcases,
                character rigs and animated environments.
              </p>
              <ul className="sc-bullets">
                <li><span className="sc-dot" />React Three Fiber / WebGL</li>
                <li><span className="sc-dot" />GLTF model rigs</li>
                <li><span className="sc-dot" />3D scroll parallax</li>
              </ul>
              <div className="sc-footer">
                <Link to="/services#service-3d-models" className="sc-link">Learn more <ArrowRight size={14}/></Link>
              </div>
            </div>

          </div>

          {/* CTA */}
          <div className="showcase-cta">
            <Link to="/services" className="showcase-cta-btn" id="home-explore-services">
              Explore All Services <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </section>

      {/* ── COMPANY ── */}
      <CompanySection />

    </div>
  );
};

export default Home;
