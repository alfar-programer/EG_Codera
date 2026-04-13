import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Zap, Target, LineChart, Code2, Cpu, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutUs.css';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const EXPERTISE = [
  {
    title: 'Software Development',
    desc: 'From custom web applications to robust enterprise platforms, we architect scalable, high-performance software tailored to your business logic.',
    icon: <Code2 size={28} />,
  },
  {
    title: 'Brand Strategy',
    desc: 'We craft distinctive visual identities and user interfaces that resonate with your target audience and differentiate your market position.',
    icon: <Target size={28} />,
  },
  {
    title: 'Digital Marketing',
    desc: 'Data-driven campaigns and search engine optimization strategies that guarantee visibility, drive qualified traffic, and accelerate growth.',
    icon: <LineChart size={28} />,
  },
  {
    title: 'Data & Analytics',
    desc: 'Strategic guidance on digital transformation, tech stack selection, and infrastructure to future-proof your business operations.',
    icon: <Cpu size={28} />,
  },
  {
    title: 'Global Optimization',
    desc: 'Building multi-regional, fast-loading, and highly available systems designed for international audiences and diverse markets.',
    icon: <Globe size={28} />,
  },
  {
    title: 'Conversion Design',
    desc: 'Every pixel and line of code is optimized for one ultimate purpose: turning your users into long-term, loyal customers.',
    icon: <Zap size={28} />,
  },
];

const TEAM = [
  { name: 'Ahmed Gamal',  role: 'Founder & CEO',        img: 'https://picsum.photos/seed/ceo1/600/800' },
  { name: 'Sara Nour',    role: 'Creative Director',    img: 'https://picsum.photos/seed/creative2/600/800' },
  { name: 'Omar Khalil',  role: 'Head of Engineering',  img: 'https://picsum.photos/seed/tech3/600/800' },
  { name: 'Laila Hassan', role: 'Lead Strategist',      img: 'https://picsum.photos/seed/strat4/600/800' },
];

/* ══════════════════════════════════════════
   MAGNETIC BUTTON CUSTOM HOOK
══════════════════════════════════════════ */
function useMagnetic(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      // Limit pull ratio
      xTo(x * 0.4);
      yTo(y * 0.4);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.parentElement.addEventListener("mousemove", handleMouseMove);
    el.parentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.parentElement.removeEventListener("mousemove", handleMouseMove);
      el.parentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
const AboutUs = () => {
  const containerRef = useRef(null);
  const magneticBtnRef = useRef(null);
  
  useMagnetic(magneticBtnRef);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      // 1. Hero Reveal Animation
      const heroTl = gsap.timeline();
      heroTl.to('.about-badge', { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.2)
            .to('.clip-text span', { y: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" }, 0.4)
            .fromTo('.about-hero-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 0.8)
            .fromTo('.about-hero', { '--hero-after-opacity': 0 }, { '--hero-after-opacity': 1, duration: 2 }, 0);

      // 2. Mission Section (Parallax & Fade In)
      gsap.to('.mission-image-inner', {
        yPercent: 20, // Moves down as you scroll down (creates parallax effect because wrapper is hidden)
        ease: "none",
        scrollTrigger: {
          trigger: '.about-mission',
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to('.mission-text-content p', {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.about-mission',
          start: "top 60%",
        }
      });
      
      gsap.to('.mission-founded-tag', {
        opacity: 1,
        y: -10,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.mission-image-wrapper',
          start: "top 70%",
        }
      });

      // 3. Horizontal Scroll for Expertise
      // We pin the wrapper and translate the container horizontally
      const pinWrap = document.querySelector('.expertise-pin-wrap');
      const scrollCont = document.querySelector('.expertise-scroll-container');
      
      if (window.innerWidth > 1024) {
        // Calculate how far to scroll container left
        let scrollDist = scrollCont.scrollWidth - window.innerWidth + 200; // adding extra buffer
        
        gsap.to(scrollCont, {
          x: -scrollDist,
          ease: "none",
          scrollTrigger: {
            trigger: '.expertise-section',
            pin: true,
            scrub: 1, // Smooth dragging
            start: "top top",
            end: () => `+=${scrollDist}`
          }
        });
      } else {
        // Mobile fallback animation: just fade them in
        gsap.fromTo('.expertise-card', 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, y: 0, stagger: 0.1, duration: 0.8, 
            scrollTrigger: { trigger: '.expertise-section', start: 'top 70%' }
          }
        );
      }

      // 4. Team Stagger Reveal
      gsap.to('.team-member', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.about-team',
          start: "top 50%",
        }
      });

      // 5. CTA Scroll In
      gsap.fromTo('.about-cta-box', 
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power2.out", 
          scrollTrigger: { trigger: '.about-cta-container', start: "top 80%" }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page" ref={containerRef}>
      
      {/* ── 1. HERO SECTION ── */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-badge">
            <span className="about-badge-dot"></span>
            EG Codera
          </div>
          
          <h1 className="about-hero-title">
            <span className="clip-text"><span>More than an agency.</span></span>
            <span className="clip-text"><span>Your <em>technology</em> partner.</span></span>
          </h1>
          
          <p className="about-hero-desc">
            We are a premier digital agency specializing in software architecture, 
            strategic branding, and aggressive digital growth. Our mission is to engineer 
            solutions that solve complex problems and scale businesses globally.
          </p>
        </div>
      </section>

      {/* ── 2. MISSION / IDENTITY ── */}
      <section className="about-mission">
        <div className="about-container">
          <div className="mission-grid">
            <div className="mission-text">
              <h2 className="mission-heading">
                <span className="clip-text"><span>Engineering Growth</span></span>
                <span className="clip-text"><span>Through <em style={{fontStyle:'italic', color:'#D9FF00', fontFamily:'Playfair Display, serif'}}>Innovation.</em></span></span>
              </h2>
              <div className="mission-text-content">
                <p>
                  At <strong>EG Codera</strong>, we believe that exceptional digital products require 
                  a seamless fusion of high-end design, flawless engineering, and robust marketing strategy.
                </p>
                <p>
                  For over 6 years, we have been explicitly focused on helping forward-thinking companies 
                  design, launch, and scale their most ambitious digital initiatives. We don't just execute 
                  tasks; we deeply embed ourselves in your business logic.
                </p>
                <p>
                  From maintaining pristine codebases to achieving top-tier SEO rankings, our rigorous standards 
                  ensure that your brand doesn't just participate in the market—it leads.
                </p>
              </div>
            </div>

            <div className="mission-image-wrapper">
              <div className="mission-image-inner">
                <img src="https://picsum.photos/seed/office/800/1000" alt="EG Codera Workspace" />
              </div>
              <div className="mission-image-gradient"></div>
              <div className="mission-founded-tag">
                <span>Established</span>
                <strong>2019</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HORIZONTAL SCROLL EXPERTISE ── */}
      <section className="expertise-section">
        <div className="expertise-pin-wrap">
          
          <div className="expertise-header">
            <span className="expertise-subtitle">Our Expertise</span>
            <h2 className="expertise-title">A Multidimensional Approach<br/>to Digital Success.</h2>
          </div>

          <div className="expertise-scroll-container">
            {EXPERTISE.map((item, index) => (
              <div key={index} className="expertise-card">
                <div className="expertise-icon">
                  {item.icon}
                </div>
                <h3 className="expertise-card-title">{item.title}</h3>
                <p className="expertise-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. TEAM SECTION ── */}
      <section className="about-team">
        <div className="about-container">
          <div className="team-header-wrapper">
            <span className="expertise-subtitle">Leadership</span>
            <h2 className="expertise-title">The Expertise Behind EG Codera.</h2>
          </div>

          <div className="team-grid">
            {TEAM.map((member, index) => (
              <div key={index} className="team-member">
                <img src={member.img} alt={member.name} loading="lazy" />
                <div className="team-member-info">
                  <div className="team-member-name">{member.name}</div>
                  <div className="team-member-role">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. MAGNETIC CTA ── */}
      <section className="about-cta-container">
        <div className="about-cta-box">
          <h2 className="about-cta-heading">Ready to scale your business?</h2>
          <p className="about-cta-desc">
            Whether you need a full digital transformation or targeted growth strategies, 
            our team is ready to build your competitive advantage.
          </p>
          
          <div className="magnetic-btn-wrap">
            <Link to="/contact" className="btn-primary" ref={magneticBtnRef}>
              Start a Conversation <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
