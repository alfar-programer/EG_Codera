import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Play, Layout, Zap, Box, Bot, Cpu, Plus, Mail, Share2, GitBranch, MessageSquare, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const sections = gsap.utils.toArray('.fade-up, .member-row');
      sections.forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Hero specific animations
      gsap.from('.hero-h1', { opacity: 0, y: 30, duration: 1, delay: 0.2 });
      gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 1, delay: 0.4 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-container" ref={containerRef}>
      
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="hero-wireframe">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ color: 'white' }}>
            <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <path d="M50 10 L50 90 M10 30 L90 70 M90 30 L10 70" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="50" cy="10" r="1" fill="currentColor"/><circle cx="90" cy="30" r="1" fill="currentColor"/>
            <circle cx="90" cy="70" r="1" fill="currentColor"/><circle cx="50" cy="90" r="1" fill="currentColor"/>
            <circle cx="10" cy="70" r="1" fill="currentColor"/><circle cx="10" cy="30" r="1" fill="currentColor"/>
          </svg>
        </div>

        <div className="hero-inner">
          <div className="hero-top">
            <div>
              <h1 className="hero-h1">
                We Build<br />
                <span style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <span className="line-decoration"></span>
                  <span className="italic-brand">Brands</span>&nbsp;that
                </span>
                Stand Out
              </h1>

              <div className="hero-sub">
                <div className="hero-sub-space">
                  <p className="hero-desc">
                    Easily connect your SEO-optimized content to your WordPress effortless publishing —
                    <span className="accent-text"> Helping you stay Consistent</span>, save time, and grow faster.
                  </p>
                  <div>
                    <button className="btn-primary">
                      <span>Let's Talk</span>
                      <div className="arrow-circle">
                        <ArrowUpRight size={20} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Robot spacer — FloatingRobot (global) overlays this area */}
            <div className="hero-robot-wrapper" aria-hidden="true" />
          </div>

          <div className="portfolio-grid">
            <PortfolioCard delay="0s" className="port-1" img="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400&h=800" />
            <PortfolioCard delay=".1s" className="port-2" img="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=600" />
            <div className="port-card port-3 fade-up" style={{ transitionDelay: '.2s' }}>
              <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800&h=600" alt="Tablet" />
              <div className="port-3-overlay">
                <span className="port-3-num">022</span>
                <div className="port-3-btn">
                  <ArrowUpRight size={24} />
                  <span className="port-3-btn-label">View Details</span>
                </div>
              </div>
            </div>
            <div className="port-card port-4 fade-up" style={{ transitionDelay: '.3s' }}>
              <img src="https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400&h=500" alt="Books" />
              <div className="port-4-num">009</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats">
        <div className="max-w px-6">
          <div className="stats-header">
            <h2 className="stats-h2">The Numbers Behind Success</h2>
            <div className="stats-sub">
              <p>Strategy, creativity, and growth - the engine for every bold idea.</p>
              <button className="btn-accent">
                Get Started
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>

          <div className="stats-cards">
            <StatCard color="yellow" num="500k" unit="Users" desc="We offer flexible, custom-fit plans designed to meet the unique needs and budget of your team" />
            <StatCard color="white" num="98" unit="%" desc="Our commitment to quality shines through near 98.05%" />
            <StatCard color="dark" num="23" unit="K" desc="Organic growth brings in twenty-three thousand signup" />
          </div>

          <div className="tags-cloud">
            <div className="tag-pill tag-white">Strategic Agency</div>
            <div className="tag-pill tag-yellow tag-rot-neg">Results-driven</div>
            <div className="tag-pill tag-orange tag-rot-pos">Influential</div>
            <div className="tag-pill tag-white">Innovation Driven</div>
            <div className="tag-pill tag-gray tag-rot-n3">Multidimensional</div>
            <div className="tag-pill tag-yellow tag-rot-p6">Strategic - minded</div>
            <div className="tag-pill tag-indigo">Result oriented</div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="leadership">
        <div className="leadership-spiral">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ color: 'white' }}>
            <path d="M100,100 C150,50 180,100 100,150 C20,200 50,50 100,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M100,100 C120,80 140,100 100,120 C60,140 80,80 100,100" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w px-6">
          <div className="leadership-grid">
            <div className="leadership-sidebar">
              <div className="section-eyebrow">
                <div className="eyebrow-dot"></div>
                Leadership
              </div>
              <h2 className="section-h2">
                Meet the<br />
                <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className="h2-line"></span>Leadership
                </span>
              </h2>
            </div>

            <div className="members-list">
              <MemberRow name="Alex Showrab" role="Project Manager" desc="Alex is a creator with a cause: making finance simple and accessible for all. A Brit with a European take on how to shake up the finance system." img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400" />
              <MemberRow name="Alex Showrab" role="Project Manager" desc="Alex is a creator with a cause: making finance simple and accessible for all. A Brit with a European take on how to shake up the finance system." img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400" hasBadge />
              <MemberRow name="Alex Showrab" role="Project Manager" desc="Alex is a creator with a cause: making finance simple and accessible for all. A Brit with a European take on how to shake up the finance system." img="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features">
        <div className="features-inner">
          <div className="features-eyebrow">
            <Zap size={16} />
            What You'll Get
          </div>
          <h2 className="features-h2">We resolve problems associated with creative procedures.</h2>

          <div className="feat-cards-3">
            <FeatureCard title="Cost effective solution" desc="Get high-quality design work at a fraction of the cost.">
              <ChartPreview />
            </FeatureCard>
            <FeatureCard title="Tailor-made design" desc="We've got the expertise to make your vision a reality.">
              <CardPreview />
            </FeatureCard>
            <FeatureCard title="Scalable as you grow" desc="We're ready to meet your evolving needs.">
                <LinePreview />
            </FeatureCard>
          </div>

          <div className="feat-cards-2">
            <div className="feat-card feat-card-wide">
              <div className="feat-text">
                <h3>Workflow integration</h3>
                <p>Seamlessly connect all your existing apps.</p>
              </div>
              <div className="integrations-grid">
                <div className="int-icon"><Layers size={20} /></div>
                <div className="int-icon"><MessageSquare size={20} /></div>
                <div className="int-icon"><GitBranch size={20} /></div>
                <div className="int-icon"><Share2 size={20} /></div>
                <div className="int-icon"><Mail size={20} /></div>
                <div className="int-icon"><Plus size={20} /></div>
              </div>
            </div>

            <div className="feat-card feat-card-wide">
              <div className="feat-text">
                <h3>Collaborate real-time</h3>
                <p>Seamlessly connect all your existing apps.</p>
              </div>
              <div className="avatars">
                <div className="avatar"><img src="https://i.pravatar.cc/100?u=11" alt="User" /></div>
                <div className="avatar"><img src="https://i.pravatar.cc/100?u=12" alt="User" /></div>
                <div className="avatar"><img src="https://i.pravatar.cc/100?u=13" alt="User" /></div>
                <div className="avatar-plus">+5</div>
              </div>
            </div>
          </div>

          <div className="feat-tags">
            <FeatureTag text="Design workshops" />
            <FeatureTag text="Workshops" />
            <FeatureTag text="Trend reports" />
            <FeatureTag text="Asset library" />
            <FeatureTag text="Rollover hours" />
            <FeatureTag text="Premium designers" />
            <FeatureTag text="Multilingual support" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-box">
          <div className="cta-gradient"></div>
          <h2 className="cta-h2">Elevate the way you source design</h2>
          <p className="cta-sub">Get ready to start producing stunning, efficient design work without the hassles of hiring. Soon available.</p>
          <div className="cta-form">
            <input type="email" placeholder="johndoe@email.com" />
            <button className="btn-notify">Get notified</button>
          </div>
        </div>
      </section>

    </div>
  );
};

/* ─── MINI COMPONENTS ─── */

const BadgePetals = () => {
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    return (
        <div className="badge-petals">
            {angles.map(angle => (
                <div 
                    key={angle} 
                    className="badge-petal" 
                    style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-40%)` }}
                />
            ))}
        </div>
    );
};

const FlowerPetals = () => {
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    return (
        <div className="flower-petals-bg">
            {angles.map(angle => (
                <div 
                    key={angle} 
                    className="flower-petal-item" 
                    style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-40%)`, transformOrigin: '0 0' }}
                />
            ))}
            <div className="flower-center-circle"></div>
        </div>
    );
};

const PortfolioCard = ({ delay, className, img }) => (
    <div className={`port-card ${className} fade-up`} style={{ transitionDelay: delay }}>
        <img src={img} alt="Work" />
    </div>
);

const StatCard = ({ color, num, unit, desc }) => (
    <div className={`stat-card ${color}`}>
        <div className="stat-top">
            <span className="stat-num">{num}</span>
            <span className="stat-unit">{unit}</span>
        </div>
        <p className="stat-desc">{desc}</p>
    </div>
);

const MemberRow = ({ name, role, desc, img, hasBadge }) => (
    <div className="member-row fade-up">
        <div>
            <div className="member-name">{name}</div>
            <div className="member-role">{role}</div>
            <p className="member-desc">{desc}</p>
        </div>
        <div className="flower-portrait">
            <FlowerPetals />
            <div className="flower-img-wrap">
                <img src={img} alt={name} />
            </div>
            {hasBadge && (
                <div className="flower-badge">
                    <ArrowUpRight size={20} />
                    <span className="flower-badge-label">Let's Talk</span>
                </div>
            )}
        </div>
    </div>
);

const FeatureCard = ({ title, desc, children }) => (
    <div className="feat-card">
        {children}
        <div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    </div>
);

const ChartPreview = () => (
    <div className="chart-preview">
        <span className="chart-label">Growth</span>
        {[40, 70, 50, 90, 60, 80, 45, 75, 55].map((h, i) => (
            <div key={i} className="chart-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
        ))}
    </div>
);

const CardPreview = () => (
    <div className="card-preview">
        <div className="mini-card">
            <div className="mini-card-top">
                <div className="mini-dot"><Zap size={8} color="#000" /></div>
                <div className="mini-bar" style={{ width: '3rem', flex: 1 }}></div>
            </div>
            <div>
                <div className="mini-bar" style={{ width: '100%', marginBottom: '.25rem' }}></div>
                <div className="mini-bar-sm" style={{ height: '.375rem', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '9999px', width: '66%' }}></div>
            </div>
        </div>
        <div className="card-reviewed">
            <div className="tiny-dot"></div> Reviewed
        </div>
    </div>
);

const LinePreview = () => (
    <div className="line-preview">
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <path className="draw-path" d="M0 80 Q 50 80, 100 50 T 200 20" fill="none" stroke="#D9FF00" strokeWidth="3" strokeDasharray="400" />
            <circle cx="100" cy="50" r="4" fill="#D9FF00" />
        </svg>
    </div>
);

const FeatureTag = ({ text }) => (
    <div className="feat-tag">
        <div className="feat-tag-icon"><Plus size={10} color="#000" /></div>
        {text}
    </div>
);

export default Home;
