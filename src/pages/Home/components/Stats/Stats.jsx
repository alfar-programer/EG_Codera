import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import './Stats.css';

/* ── Animated counter hook ── */
function useCountUp(target, inView, duration = 1.8) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;

    // Detect if target is a number or has K/% suffix
    const raw = parseFloat(target.replace(/[^0-9.]/g, ''));
    const suffix = target.replace(/[0-9.]/g, '');

    const controls = animate(0, raw, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const formatted = v >= 100
          ? Math.round(v).toLocaleString()
          : v >= 1
            ? v.toFixed(raw % 1 !== 0 ? 1 : 0)
            : v.toFixed(2);
        setDisplay(formatted + suffix);
      },
    });
    return controls.stop;
  }, [inView, target, duration]);

  return display;
}

/* ── Single stat card ── */
const StatCard = ({ color, num, unit, desc, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useCountUp(num, inView);

  return (
    <motion.div
      ref={ref}
      className={`stat-card ${color}`}
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.28 } }}
    >
      <div className="stat-top">
        <span className="stat-num">{count}</span>
        <span className="stat-unit">{unit}</span>
      </div>
      <p className="stat-desc">{desc}</p>
    </motion.div>
  );
};

/* ── Background orb ── */
const Orb = ({ style, color, duration = 14 }) => (
  <motion.div
    className="stats-orb"
    style={{ ...style, background: color }}
    animate={{
      scale: [1, 1.18, 1],
      opacity: [0.18, 0.32, 0.18],
      x: [0, 30, -20, 0],
      y: [0, -20, 30, 0],
    }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
  />
);

/* ── Tag pill ── */
const TagPill = ({ children, className, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={`tag-pill ${className}`}
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.12, rotate: 0, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
};

/* ── Section ── */
const Stats = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section className="stats" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Floating background orbs */}
      <Orb color="var(--accent)" duration={14} style={{ width: 520, height: 520, top: '-180px', left: '-160px' }} />
      <Orb color="#6366f1"        duration={17} style={{ width: 380, height: 380, bottom: '60px', right: '-120px' }} />
      <Orb color="#f97316"        duration={11} style={{ width: 260, height: 260, top: '45%', left: '50%' }} />

      <div className="max-w px-6" style={{ position: 'relative' }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="stats-header"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="stats-h2">The Numbers Behind Success</h2>
          <div className="stats-sub">
            <p>Strategy, creativity, and growth — the engine for every bold idea.</p>
            <motion.button
              className="btn-accent"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              Get Started
              <ArrowUpRight size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Stat cards */}
        <div className="stats-cards">
          <StatCard index={0} color="yellow" num="500k" unit="Users" desc="Flexible, custom-fit plans designed to meet the unique needs and budget of your team." />
          <StatCard index={1} color="white"  num="98%"  unit=""      desc="Our commitment to quality shines through near 98.05% client satisfaction." />
          <StatCard index={2} color="dark"   num="23K"  unit=""      desc="Organic growth brings in twenty-three thousand signups and counting." />
        </div>

        {/* Tags cloud */}
        <div className="tags-cloud">
          {[
            { label: 'Strategic Agency',   cls: 'tag-white' },
            { label: 'Results-driven',     cls: 'tag-yellow tag-rot-neg' },
            { label: 'Influential',        cls: 'tag-orange tag-rot-pos' },
            { label: 'Innovation Driven',  cls: 'tag-white' },
            { label: 'Multidimensional',   cls: 'tag-gray tag-rot-n3' },
            { label: 'Strategic-minded',   cls: 'tag-yellow tag-rot-p6' },
            { label: 'Result oriented',    cls: 'tag-indigo' },
          ].map(({ label, cls }, i) => (
            <TagPill key={label} className={cls} index={i}>{label}</TagPill>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
