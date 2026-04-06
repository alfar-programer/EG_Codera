import React, { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import RobotMockup from '../../3d/RobotMockup';
import ChatBox from '../ChatBox/ChatBox';
import './FloatingRobot.css';

const FloatingRobot = () => {
  const location = useLocation();
  const [mode, setMode] = useState('widget'); // 'hero' | 'widget'
  const [showChat, setShowChat] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
  const [isGrabbing, setIsGrabbing] = useState(false);

  const isDragging   = useRef(false);
  const isActualDrag = useRef(false);
  const dragStart    = useRef({ x: 0, y: 0 });
  const lastPos      = useRef({ x: 0, y: 0 });
  const accumulated  = useRef({ x: 0, y: 0 });

  const isHome = location.pathname === '/';

  /* ── Scroll & IntersectionObserver ── */
  useEffect(() => {
    setShowChat(false); // close chat on page change

    if (!isHome) {
      setMode('widget');
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      const hero = document.querySelector('.hero');
      if (!hero) { setMode('widget'); return; }

      const isMobile = window.innerWidth < 768;
      if (isMobile) { setMode('widget'); return; }

      const heroBottom = hero.getBoundingClientRect().bottom;
      const vh = window.innerHeight;

      // Overall page scroll progress for robot animations
      const docHeight = document.documentElement.scrollHeight - vh;
      const progress = Math.min(1, Math.max(0, window.scrollY / (docHeight || 1)));
      setScrollProgress(progress);

      // Switch modes
      if (heroBottom > vh * 0.55) {
        setMode('hero');
      } else {
        setMode('widget');
      }
    };

    handleScroll();
    window.addEventListener('scroll',  handleScroll, { passive: true });
    window.addEventListener('resize',  handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll',  handleScroll);
      window.removeEventListener('resize',  handleScroll);
    };
  }, [isHome, location.pathname]);

  /* ── Chat toggle ── */
  const handleRobotClick = useCallback(() => {
    if (isActualDrag.current) return;
    setShowChat(true);
  }, []);

  /* ── Drag (only in hero mode) ── */
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

  const isWidget = mode === 'widget';

  return (
    <>
      <div
        className={`floating-robot-wrap ${mode}`}
        style={{ cursor: isWidget ? 'pointer' : (isGrabbing ? 'grabbing' : 'grab') }}
        onClick={isWidget ? handleRobotClick : undefined}
        onPointerDown={!isWidget ? onPointerDown : undefined}
        onPointerMove={!isWidget ? onPointerMove : undefined}
        onPointerUp={!isWidget ? onPointerUp : undefined}
        onPointerLeave={!isWidget ? onPointerUp : undefined}
      >
        <Canvas
          style={{ width: '100%', height: '100%' }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]}    intensity={1.5} color="#D9FF00" />
            <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#ffffff" />

            <RobotMockup
              scrollProgress={isWidget ? 0 : scrollProgress}
              dragDelta={dragDelta}
              onRobotClick={handleRobotClick}
              showChat={showChat || isWidget} // hide speech bubble in widget mode
            />

            {!isWidget && (
              <ContactShadows
                position={[0, -2.5, 0]}
                opacity={0.4}
                scale={10}
                blur={2.5}
                far={4}
                color="#D9FF00"
              />
            )}
          </Suspense>
        </Canvas>

        {/* Tooltip shown only in widget mode */}
        {isWidget && !showChat && (
          <div className="robot-widget-tooltip">Chat with Tobe 🤖</div>
        )}
      </div>

      {/* ChatBox portal */}
      {showChat && createPortal(
        <ChatBox onClose={() => setShowChat(false)} />,
        document.body
      )}

      <style>{`
        @keyframes robotSpeechIn {
          from { opacity: 0; transform: scale(0.7) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes welcomeIn {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
          70%  { opacity: 1; transform: translate(-50%, -50%) scale(1.04); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </>
  );
};

export default FloatingRobot;
