import React, {
  useEffect, useRef, useState, useCallback, Suspense,
} from 'react';
import { createPortal } from 'react-dom';
import { Canvas } from '@react-three/fiber';
import {
  Environment, PerspectiveCamera, ContactShadows,
} from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import RobotMockup from '../../3d/RobotMockup';
import ChatBox from '../ChatBox/ChatBox';
import './FloatingRobot.css';

/* ─── Tiny robot silhouette shown while the GLTF loads ─────────────────── */
const RobotLoader = () => (
  <div className="robot-loader">
    <div className="robot-loader-icon">🤖</div>
  </div>
);

/* ─── Speech bubble rendered in plain DOM (never clipped by canvas) ──────── */
const SpeechBubble = ({ message, visible }) => (
  <div className={`robot-speech-bubble${visible ? ' visible' : ''}`}>
    <span>{message}</span>
    <span className="robot-speech-tail" />
  </div>
);

const INITIAL_MSG   = '🤖 Welcome to EG Codera';
const FALLBACK_MSG  = '🤖 My name is Tobe, click me for help!';

const FloatingRobot = () => {
  const location = useLocation();

  const [mode,             setMode]             = useState('widget');
  const [showChat,         setShowChat]         = useState(false);
  const [scrollProgress,   setScrollProgress]   = useState(0);
  const [dragDelta,        setDragDelta]        = useState({ x: 0, y: 0 });
  const [isGrabbing,       setIsGrabbing]       = useState(false);
  const [heroRobotVisible, setHeroRobotVisible] = useState(false);
  const [robotLoaded,      setRobotLoaded]      = useState(false);
  const [bubbleMsg,        setBubbleMsg]        = useState(INITIAL_MSG);
  const [bubbleVisible,    setBubbleVisible]    = useState(true);

  const isDragging   = useRef(false);
  const isActualDrag = useRef(false);
  const dragStart    = useRef({ x: 0, y: 0 });
  const lastPos      = useRef({ x: 0, y: 0 });
  const accumulated  = useRef({ x: 0, y: 0 });
  const bubbleTimer  = useRef(null);

  const isHome = location.pathname === '/';

  /* ── Listen for Tobe speaks events ── */
  useEffect(() => {
    const handleSpeak = (e) => {
      const clean = (e.detail || '').replace(/\*\*/g, '');
      updateBubble(clean);
    };
    window.addEventListener('tobe-speaks', handleSpeak);

    // Fallback message after 5s if welcome hasn't changed
    const t = setTimeout(() => {
      setBubbleMsg(prev =>
        prev === INITIAL_MSG ? FALLBACK_MSG : prev
      );
    }, 5000);

    return () => {
      window.removeEventListener('tobe-speaks', handleSpeak);
      clearTimeout(t);
    };
  }, []);

  const updateBubble = useCallback((msg) => {
    setBubbleVisible(false);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => {
      setBubbleMsg(msg);
      setBubbleVisible(true);
    }, 180); // tiny fade-out → fade-in
  }, []);

  /* ── Mark robot as loaded once canvas mounts ──
     Reset whenever `mode` changes because the Canvas remounts
     (key changes), so we need a fresh load cycle each time.    ── */
  useEffect(() => {
    setRobotLoaded(false);
    // Small grace period so the 🤖 loader doesn't flash on fast loads
    const t = setTimeout(() => setRobotLoaded(true), 700);
    return () => clearTimeout(t);
  }, [mode]);

  /* ── Scroll & IntersectionObserver ── */
  useEffect(() => {
    setShowChat(false);

    const openChat = () => setShowChat(true);
    window.addEventListener('open-tobe-chat', openChat);

    if (!isHome) {
      setMode('widget');
      setScrollProgress(0);
      setHeroRobotVisible(false);
      return () => window.removeEventListener('open-tobe-chat', openChat);
    }

    const handleScroll = () => {
      const hero = document.querySelector('.hero');
      if (!hero) { setMode('widget'); return; }

      const isMobile = window.innerWidth < 768;
      if (isMobile) { setMode('widget'); return; }

      const heroBottom = hero.getBoundingClientRect().bottom;
      const vh = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - vh;
      const progress = Math.min(1, Math.max(0, window.scrollY / (docHeight || 1)));
      setScrollProgress(progress);

      setMode(heroBottom > vh * 0.55 ? 'hero' : 'widget');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Hide widget while hero's own robot (.right-dev) is visible
    const heroRobotEl = document.querySelector('.right-dev');
    let observer;
    if (heroRobotEl) {
      observer = new IntersectionObserver(
        ([entry]) => setHeroRobotVisible(entry.isIntersecting),
        { threshold: 0.1 }
      );
      observer.observe(heroRobotEl);
    }

    return () => {
      window.removeEventListener('scroll',  handleScroll);
      window.removeEventListener('resize',  handleScroll);
      window.removeEventListener('open-tobe-chat', openChat);
      observer?.disconnect();
    };
  }, [isHome, location.pathname]);

  /* ── Chat toggle ── */
  const handleRobotClick = useCallback(() => {
    if (isActualDrag.current) return;
    setShowChat(prev => !prev);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showChat ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showChat]);

  /* ── Drag (hero mode only) ── */
  const onPointerDown = useCallback((e) => {
    isDragging.current   = true;
    isActualDrag.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    lastPos.current   = { x: e.clientX, y: e.clientY };
    setIsGrabbing(true);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.sqrt(dx * dx + dy * dy) > 6) isActualDrag.current = true;
    const mdx = e.clientX - lastPos.current.x;
    const mdy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    accumulated.current = {
      x: accumulated.current.x + mdx,
      y: accumulated.current.y + mdy,
    };
    setDragDelta({ ...accumulated.current });
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    setIsGrabbing(false);
  }, []);

  const isWidget    = mode === 'widget';
  const currentMode = showChat ? 'chatting' : mode;
  const renderScrollProgress = (isWidget || showChat) ? 0 : scrollProgress;

  // Widget: zoom the camera way in so the robot fills the small circle.
  // Other modes: keep the wider field of view.
  const useWidgetCamera = isWidget && !showChat;
  const camZ   = useWidgetCamera ? 3.5 : (showChat ? 9 : 8);
  const camFov = useWidgetCamera ? 42  : 50;
  const camY   = useWidgetCamera ? 0.6 : (showChat ? -0.2 : 0);   // Keep near 0 for middle alignment and pull Z back to make it small

  // ── Canvas key: force a fresh WebGL context when switching between
  //    widget ↔ hero/chatting modes so the camera always initialises
  //    with the correct position/fov instead of reusing stale state.
  const canvasKey = useWidgetCamera ? 'widget' : 'scene';

  // In hero mode: the Hero.jsx robot is the big robot. Hide the FloatingRobot
  // so there's no duplicate. Only show FloatingRobot in widget or chatting modes.
  const isHidden = !showChat && (isWidget ? heroRobotVisible : mode === 'hero');

  // Show speech bubble in widget mode, or whenever chatting
  const showBubble = showChat || (isWidget && !isHidden);

  return (
    <>
      <div
        className={`floating-robot-wrap ${currentMode}${isHidden ? ' robot-hidden' : ''}`}
        style={{
          cursor: isWidget && !showChat
            ? 'pointer'
            : isGrabbing ? 'grabbing' : showChat ? 'default' : 'grab',
        }}
        onClick={isWidget && !showChat ? handleRobotClick : undefined}
        onPointerDown={(!isWidget && !showChat) ? onPointerDown : undefined}
        onPointerMove={(!isWidget && !showChat) ? onPointerMove : undefined}
        onPointerUp={(!isWidget && !showChat) ? onPointerUp : undefined}
        onPointerLeave={(!isWidget && !showChat) ? onPointerUp : undefined}
        title={isWidget && !showChat ? 'Chat with Tobe 🤖' : undefined}
      >
        {/* Loading skeleton while GLTF streams in */}
        {!robotLoaded && <RobotLoader />}

        <Canvas
          key={canvasKey}
          style={{ width: '100%', height: '100%', borderRadius: isWidget ? '50%' : '0', overflow: 'hidden' }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            // Ensure the renderer fills the container after mount
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          }}
        >
          <PerspectiveCamera makeDefault position={[0, camY, camZ]} fov={camFov} />
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]}    intensity={1.2} color="#D9FF00" />
            <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#ffffff" />

            <RobotMockup
              scrollProgress={renderScrollProgress}
              dragDelta={showChat ? { x: 0, y: 0 } : dragDelta}
              onRobotClick={showChat ? undefined : handleRobotClick}
              showChat={showChat}
            />

            {(!isWidget && !showChat) && (
              <ContactShadows
                position={[0, -2.5, 0]}
                opacity={0.35}
                scale={10}
                blur={2.5}
                far={4}
                color="#D9FF00"
              />
            )}
          </Suspense>
        </Canvas>

        {/* ── Speech bubble — plain DOM, never clipped ── */}
        {showBubble && (
          <SpeechBubble message={bubbleMsg} visible={bubbleVisible} />
        )}

        {/* Tooltip on widget hover */}
        {isWidget && !showChat && (
          <div className="robot-widget-tooltip">Chat with Tobe 🤖</div>
        )}
      </div>

      {/* ChatBox portal at body level */}
      {showChat && createPortal(
        <ChatBox onClose={() => setShowChat(false)} />,
        document.body
      )}

      <style>{`
        @keyframes robotSpeechIn {
          from { opacity: 0; transform: translateY(8px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes robotLoaderPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.95); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }
      `}</style>
    </>
  );
};

export default FloatingRobot;
