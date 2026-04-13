import React, { Suspense, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import RobotMockup from "../../../../components/3d/RobotMockup";
import "./Hero.css";

const cards = [
  {
    id: 1,
    image: "https://picsum.photos/seed/agency1/600/800",
    title: "m*",
    subtitle: "brds+ mclp",
    type: "signage",
    span: "md:col-span-1",
    offset: "md:-translate-y-16",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/agency2/600/800",
    title: "App",
    subtitle: "Mobile Experience",
    type: "mockup",
    span: "md:col-span-1",
    offset: "md:translate-y-12",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/agency3/1200/800",
    title: "022",
    subtitle: "Tablet Interface",
    type: "tablet",
    span: "md:col-span-2",
    showDetails: true,
    offset: "md:-translate-y-12",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/agency4/600/800",
    title: "009",
    subtitle: "Brand Identity",
    type: "book",
    span: "md:col-span-1",
    offset: "md:translate-y-20",
  },
];

/* ── Speech bubble that tracks Tobe's messages ── */
const RobotSpeechBubble = () => {
  const [msg, setMsg] = useState("🤖 Welcome to EG Codera!");
  const [visible, setVisible] = useState(true);
  const timer = useRef(null);

  useEffect(() => {
    const handleSpeak = (e) => {
      const clean = (e.detail || "").replace(/\*\*/g, "");
      setVisible(false);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setMsg(clean);
        setVisible(true);
      }, 180);
    };

    // Fallback message after 4s
    const fallback = setTimeout(() => {
      setMsg("🤖 Click me to chat!");
    }, 4000);

    window.addEventListener("tobe-speaks", handleSpeak);
    return () => {
      window.removeEventListener("tobe-speaks", handleSpeak);
      clearTimeout(timer.current);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div className={`hero-robot-bubble${visible ? " hero-robot-bubble--visible" : ""}`}>
      <span>{msg}</span>
      {/* Downward tail toward robot */}
      <span className="hero-robot-bubble__tail" />
    </div>
  );
};

const Hero = () => {
  return (
    <section className="hero-section selection:bg-brand-lime selection:text-brand-dark">
      {/* Premium Glow Effect */}
      <div className="fixed inset-0 glow-bg pointer-events-none opacity-50" />

      <div className="main-container">
        {/* ── Top row: headline left, robot right (BIG) ── */}
        <div className="hero-top-row">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-headline-col"
          >
            <h1 className="text-6xl md:text-[96px] font-bold leading-[0.9] tracking-tighter">
              We Build <br />
              <span className="flex items-center gap-4">
                <span className="text-white">—</span>
                <span className="font-serif italic font-normal text-brand-lime">Brands</span>
                <span className="text-white">that</span>
              </span>
              <span className="block">Stand Out</span>
            </h1>
          </motion.div>

          {/* ── BIG Robot – centred in its column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="hero-robot-col"
          >
            {/* Speech bubble sits ABOVE the robot canvas */}
            <RobotSpeechBubble />

            {/* 3D Robot canvas */}
            <div
              className="right-dev hero-robot-canvas"
              title="Chat with Tobe 🤖"
              onClick={() => window.dispatchEvent(new CustomEvent("open-tobe-chat"))}
            >
              <Canvas
                style={{ width: "100%", height: "100%" }}
                dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
              >
                {/* Camera pulled back slightly to fit smaller column */}
                <PerspectiveCamera makeDefault position={[0, 0.2, 7]} fov={48} />
                <Suspense fallback={null}>
                  <Environment preset="city" />
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[10, 10, 5]}    intensity={1.4} color="#D9FF00" />
                  <directionalLight position={[-10, -10, -5]} intensity={1.0} color="#ffffff" />
                  <RobotMockup scrollProgress={0} dragDelta={{ x: 0, y: 0 }} showChat={false} />
                  <ContactShadows
                    position={[0, -2.2, 0]}
                    opacity={0.35}
                    scale={8}
                    blur={2}
                    far={4}
                    color="#D9FF00"
                  />
                </Suspense>
              </Canvas>
            </div>

            <p className="hero-robot-label">Click Tobe to chat ✨</p>
          </motion.div>
        </div>

        {/* Description & CTA */}
        <div className="hero-description-col flex flex-col md:flex-row justify-end items-center mb-40 gap-8 max-w-full">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:text-right"
          >
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
              Easily connect your SEO-optimized content to your WordPress effortless publishing —{" "}
              <span className="text-brand-lime font-medium">Helping you stay Consistent</span>, save time, and grow faster.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero-cta-btn flex items-center gap-2 bg-brand-lime text-brand-dark px-6 py-3 rounded-full font-bold text-xs tracking-tight group shrink-0"
          >
            Let's Talk
            <div className="bg-brand-dark text-brand-lime p-1 rounded-full group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight size={14} />
            </div>
          </motion.button>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className={`${card.span} ${card.offset} relative group overflow-hidden rounded-[2.5rem] aspect-[4/5] md:aspect-auto md:h-[380px] bg-[#111111]`}
            >
              <img
                src={card.image}
                alt={card.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  {card.subtitle && (
                    <span className="text-[10px] uppercase tracking-widest text-white/60">
                      {card.subtitle}
                    </span>
                  )}
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus size={14} className="text-white" />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center flex-grow">
                  <h3 className="text-5xl font-bold tracking-tighter text-white drop-shadow-2xl">
                    {card.title}
                  </h3>
                  {card.showDetails && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="mt-6 bg-brand-lime text-brand-dark w-20 h-20 rounded-full flex flex-col items-center justify-center gap-1 shadow-2xl"
                    >
                      <ArrowUpRight size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-tight">View Details</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
