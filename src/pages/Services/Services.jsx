import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Zap, Box, Layers, Sparkles, ArrowRight, Code2, Globe, Cpu, Play } from 'lucide-react';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────────────────────── */
const services = [
  {
    id: 'ai-agents',
    icon: Bot,
    accent: '#00f0ff',
    accentRgb: '0,240,255',
    tag: 'Core Service',
    title: 'AI-Powered Agents',
    headline: 'Websites that Think, Adapt & Act',
    description:
      'We embed intelligent agents directly into your product — from smart chat assistants and recommendation engines to autonomous workflow automation. Your website stops being a static brochure and becomes a living, learning system.',
    bullets: ['Custom LLM integrations (OpenAI, Gemini, Claude)', 'Autonomous task & workflow agents', 'Retrieval-Augmented Generation (RAG) pipelines', 'Real-time user personalisation'],
    visual: 'ai',
  },
  {
    id: 'gsap-animation',
    icon: Zap,
    accent: '#8a2be2',
    accentRgb: '138,43,226',
    tag: 'Motion Design',
    title: 'GSAP Animation',
    headline: 'Motion that Tells Your Story',
    description:
      'Using the GreenSock Animation Platform we choreograph every pixel — scroll-driven timelines, physics-based micro-interactions, SVG morphs and cinematic page transitions that reward curiosity and guide users effortlessly.',
    bullets: ['Scroll-triggered storytelling (ScrollTrigger)', 'Fluid page & route transitions', 'Physics-based micro-interactions', 'SVG / path morphing & drawing'],
    visual: 'gsap',
  },
  {
    id: '3d-models',
    icon: Box,
    accent: '#00ffcc',
    accentRgb: '0,255,204',
    tag: 'Immersive 3D',
    title: '3D Web Experiences',
    headline: 'Step Inside the Interface',
    description:
      'We bring fully interactive 3D scenes into the browser using React Three Fiber and WebGL — product showcases, character rigs, environmental worlds and animated backgrounds that set your brand apart from any template.',
    bullets: ['React Three Fiber / Three.js scenes', 'GLTF model loading & animation rigs', 'Real-time lighting & PBR materials', '3D scroll parallax & camera paths'],
    visual: '3d',
  },
];

const stats = [
  { value: '100%', label: 'Pixel Perfect', icon: Layers },
  { value: '3×', label: 'Faster Delivery with AI', icon: Cpu },
  { value: '60fps', label: 'Butter-Smooth Animation', icon: Play },
  { value: '∞', label: 'Creative Potential', icon: Sparkles },
];

/* ─── Visual Blobs per service ─────────────────────────────────────────── */
const AiVisual = () => (
  <div className="svc-visual ai-visual" aria-hidden="true">
    <div className="ai-grid">
      {[...Array(16)].map((_, i) => (
        <div key={i} className="ai-node" style={{ animationDelay: `${i * 0.18}s` }}>
          <div className="ai-node-inner" />
        </div>
      ))}
    </div>
    <div className="ai-center-ring">
      <Bot size={48} strokeWidth={1.2} />
    </div>
    {[...Array(4)].map((_, i) => (
      <div key={i} className={`ai-orbit orbit-${i}`} />
    ))}
  </div>
);

const GsapVisual = () => (
  <div className="svc-visual gsap-visual" aria-hidden="true">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="gsap-bar" style={{ '--i': i }} />
    ))}
    <div className="gsap-cursor">
      <div className="gsap-cursor-dot" />
      <div className="gsap-cursor-trail" />
    </div>
    <Zap className="gsap-bolt" size={64} strokeWidth={1} />
  </div>
);

const ThreeDVisual = () => (
  <div className="svc-visual threed-visual" aria-hidden="true">
    <div className="cube-wrapper">
      <div className="cube">
        {['front', 'back', 'left', 'right', 'top', 'bottom'].map((f) => (
          <div key={f} className={`face ${f}`} />
        ))}
      </div>
    </div>
    <div className="threed-rings">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="threed-ring" style={{ '--i': i }} />
      ))}
    </div>
  </div>
);

const visualMap = { ai: AiVisual, gsap: GsapVisual, '3d': ThreeDVisual };

/* ─── Component ─────────────────────────────────────────────────────────── */
const Services = () => {
  const pageRef   = useRef(null);
  const heroRef   = useRef(null);
  const cardsRef  = useRef(null);
  const statsRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero entrance ──────────────────────────────────────────────
      const heroEls = heroRef.current.querySelectorAll('.anim');
      gsap.from(heroEls, {
        y: 60, opacity: 0, duration: 1, stagger: 0.14,
        ease: 'power3.out', delay: 0.1,
      });

      // ── Service cards – side-in per card ──────────────────────────
      const cards = cardsRef.current.querySelectorAll('.svc-card');
      cards.forEach((card, i) => {
        const dir = i % 2 === 0 ? -80 : 80;
        gsap.from(card, {
          x: dir, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 78%', toggleActions: 'play none none reverse' },
        });

        // Stagger bullets inside card
        gsap.from(card.querySelectorAll('.svc-bullet'), {
          x: -20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 65%' },
        });
      });

      // ── Stats ──────────────────────────────────────────────────────
      gsap.from(statsRef.current.querySelectorAll('.stat-item'), {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 75%' },
      });

      // ── Floating orbs parallax ─────────────────────────────────────
      gsap.to('.orb-1', { y: -80, ease: 'none', scrollTrigger: { trigger: pageRef.current, start: 'top top', end: 'bottom bottom', scrub: 2 } });
      gsap.to('.orb-2', { y: 120, ease: 'none', scrollTrigger: { trigger: pageRef.current, start: 'top top', end: 'bottom bottom', scrub: 3 } });
      gsap.to('.orb-3', { y: -60, ease: 'none', scrollTrigger: { trigger: pageRef.current, start: 'top top', end: 'bottom bottom', scrub: 1.5 } });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="svc-page" ref={pageRef}>

      {/* ── Background orbs ─────────────────────────────────────────── */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <header className="svc-hero" ref={heroRef}>
        <div className="svc-hero-inner">
          <div className="svc-tag anim">
            <Globe size={14} />
            <span>Our Services</span>
          </div>

          <h1 className="svc-hero-title anim">
            What We{' '}
            <span className="svc-gradient-text">Build</span>
            <br />
            For You
          </h1>

          <p className="svc-hero-sub anim">
            A focused studio at the intersection of <strong>AI</strong>, <strong>motion design</strong> and{' '}
            <strong>immersive 3D</strong> — building websites that go far beyond what templates can offer.
          </p>

          <div className="svc-hero-cta anim">
            <button className="svc-btn-primary" id="svc-start-project">
              Start a Project
              <ArrowRight size={18} />
            </button>
            <button className="svc-btn-ghost" id="svc-view-work">
              <Code2 size={16} /> View Our Work
            </button>
          </div>
        </div>

        {/* Hero decorative grid */}
        <div className="hero-deco" aria-hidden="true">
          <div className="hero-deco-grid">
            {[...Array(20)].map((_, i) => <div key={i} className="hero-deco-cell" />)}
          </div>
          <div className="hero-deco-ring r1" />
          <div className="hero-deco-ring r2" />
        </div>
      </header>

      {/* ── STATS STRIP ─────────────────────────────────────────────── */}
      <div className="svc-stats" ref={statsRef}>
        {stats.map(({ value, label, icon: Icon }) => (
          <div className="stat-item" key={label}>
            <Icon size={20} className="stat-icon" />
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>

      {/* ── SERVICE CARDS ────────────────────────────────────────────── */}
      <section className="svc-cards" ref={cardsRef} aria-label="Our services">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          const Visual = visualMap[svc.visual];
          const isEven = i % 2 === 0;

          return (
            <article
              key={svc.id}
              id={`service-${svc.id}`}
              className={`svc-card ${isEven ? 'svc-card--normal' : 'svc-card--reverse'}`}
              style={{ '--accent': svc.accent, '--accent-rgb': svc.accentRgb }}
            >
              {/* Text side */}
              <div className="svc-card-text">
                <div className="svc-card-tag">
                  <Icon size={14} />
                  <span>{svc.tag}</span>
                </div>
                <h2 className="svc-card-title">{svc.title}</h2>
                <p className="svc-card-headline">{svc.headline}</p>
                <p className="svc-card-desc">{svc.description}</p>
                <ul className="svc-bullets">
                  {svc.bullets.map((b) => (
                    <li key={b} className="svc-bullet">
                      <span className="svc-bullet-dot" />
                      {b}
                    </li>
                  ))}
                </ul>
                <button className="svc-learn-btn" id={`learn-${svc.id}`}>
                  Learn More <ArrowRight size={16} />
                </button>
              </div>

              {/* Visual side */}
              <div className="svc-card-visual-wrap">
                <Visual />
              </div>
            </article>
          );
        })}
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────── */}
      <section className="svc-cta-section" aria-label="Contact us">
        <div className="svc-cta-glow" />
        <div className="svc-cta-content">
          <Sparkles className="svc-cta-icon" size={36} />
          <h2 className="svc-cta-title">Ready to build something extraordinary?</h2>
          <p className="svc-cta-sub">
            Let's talk about how AI agents, motion design and 3D can elevate your next project.
          </p>
          <button className="svc-btn-primary svc-cta-btn" id="svc-contact-us">
            Get In Touch <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;
