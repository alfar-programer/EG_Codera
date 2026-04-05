import React, { Suspense, useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import RobotMockup from './RobotMockup';
import ChatBox from '../ui/ChatBox/ChatBox';

/**
 * Scene
 * Props:
 *   scrollProgress {number} 0–1
 */
const Scene = ({ scrollProgress = 0 }) => {
  const [dragDelta,     setDragDelta]   = useState({ x: 0, y: 0 });
  const [isGrabbing,    setIsGrabbing]  = useState(false);
  const [showChat,      setShowChat]    = useState(false);
  const welcomeTimer = useRef(null);

  const isDragging   = useRef(false);
  const isActualDrag = useRef(false);   // true when the move exceeded the threshold
  const dragStart    = useRef({ x: 0, y: 0 });
  const lastPos      = useRef({ x: 0, y: 0 });
  const accumulated  = useRef({ x: 0, y: 0 });

  // ── Chat Box toggle ───────────────────────────────────────────────────────
  const triggerChat = useCallback(() => {
    // Don't fire if the user was dragging
    if (isActualDrag.current) return;
    setShowChat(true);
  }, []);

  useEffect(() => () => { if (welcomeTimer.current) clearTimeout(welcomeTimer.current); }, []);

  // ── Drag handlers ─────────────────────────────────────────────────────────
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

  return (
    <>
      {/* ── Canvas Area ─────────────────────────────────────────────────── */}
      <div
        style={{ width: '100%', height: '100%', cursor: isGrabbing ? 'grabbing' : 'grab' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
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
            <directionalLight position={[10, 10, 5]}    intensity={1.5} color="#00f0ff" />
            <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#8a2be2" />

            <RobotMockup
              scrollProgress={scrollProgress}
              dragDelta={dragDelta}
              onRobotClick={triggerChat}
              showChat={showChat}
            />

            <ContactShadows
              position={[0, -2.5, 0]}
              opacity={0.4}
              scale={10}
              blur={2.5}
              far={4}
              color="#00f0ff"
            />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Chat App ────────────────────────────────────────────────────── */}
      {showChat && createPortal(
        <ChatBox onClose={() => setShowChat(false)} />,
        document.body
      )}

      {/* ── Keyframe styles injected once ───────────────────────────────── */}
      <style>{`
        @keyframes robotTooltipIn {
          from { opacity: 0; transform: scale(0.7) translateY(8px); }
          to   { opacity: 1; transform: scale(1)   translateY(0); }
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

export default Scene;
