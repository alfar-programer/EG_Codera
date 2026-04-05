import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * RobotMockup
 *
 * Props:
 *   scrollProgress {number}  0 → 1
 *   dragDelta      {object}  { x, y } pixel offset from drag
 *   onRobotClick   {fn}      called when user clicks the robot (not a drag)
 */
const RobotMockup = ({ scrollProgress = 0, dragDelta = { x: 0, y: 0 }, onRobotClick, showChat = false }) => {
  const group        = useRef();
  const { scene, animations } = useGLTF('/3Dmodels/robot/scene.gltf');
  const { actions }  = useAnimations(animations, group);
  const [isHovered, setIsHovered] = useState(false);
  const [message, setMessage] = useState("🤖 Welcome to EG_codera");

  // Smoothed internal state
  const smoothRotY  = useRef(0);
  const smoothRotX  = useRef(0);
  const smoothSpinY = useRef(0);
  const smoothScale = useRef(1);

  useEffect(() => {
    if (actions && animations.length > 0) {
      const first = actions[animations[0].name];
      if (first) first.play();
    }
  }, [actions, animations]);

  useEffect(() => {
    // Change the message after 4 seconds instead of hiding it
    const timer = setTimeout(() => {
      setMessage("🤖 My name is Tobe, click me for any help!");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state) => {
    if (!group.current) return;

    // ─── 1. Mouse-look (robot tracks the cursor) ────────────────────────────
    const targetY = state.mouse.x * (Math.PI / 4);   // ±45°
    const targetX = -state.mouse.y * (Math.PI / 6);  // ±30°

    const dragY = dragDelta.x * 0.006;
    const dragX = dragDelta.y * 0.006;

    smoothRotY.current = THREE.MathUtils.lerp(smoothRotY.current, targetY + dragY, 0.07);
    smoothRotX.current = THREE.MathUtils.lerp(smoothRotX.current, targetX + dragX, 0.07);

    // ─── 2. Scroll-driven full spin (section transition) ────────────────────
    // Over the entire scroll (0 to 1), do 2 full 360-degree spins (Math.PI * 4)
    // This perfectly aligns it to face front at sections 1 (0%), 2 (50%), and 3 (100%).
    const targetSpin = scrollProgress * Math.PI * 4;
    smoothSpinY.current = THREE.MathUtils.lerp(smoothSpinY.current, targetSpin, 0.05);

    group.current.rotation.y = smoothRotY.current + smoothSpinY.current;
    group.current.rotation.x = smoothRotX.current;

    // ─── 3. Scroll-driven zoom ───────────────────────────────────────────────
    let targetScale = 1;
    if (scrollProgress <= 0.5) {
      // Zoom in at Services section (0.5)
      const zoomCurve = 1 - Math.abs(scrollProgress - 0.5) * 2;
      targetScale = 1 + Math.max(0, zoomCurve) * 0.35; // peaks at 1.35
    } else {
      // Shrink drastically for Company section (1.0) making it a clickable widget
      const shrinkFactor = (scrollProgress - 0.5) * 2; // maps 0.5->1.0 to 0->1
      targetScale = 1.35 - (shrinkFactor * 0.75); // shrinks from 1.35 down to 0.6
    }
    
    smoothScale.current = THREE.MathUtils.lerp(smoothScale.current, targetScale, 0.06);
    group.current.scale.setScalar(smoothScale.current);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
      <group
        ref={group}
        dispose={null}
        onPointerEnter={(e) => { e.stopPropagation(); setIsHovered(true);  }}
        onPointerLeave={(e) => { e.stopPropagation(); setIsHovered(false); }}
        onClick={(e)        => { e.stopPropagation(); onRobotClick && onRobotClick(); }}
      >
        <primitive object={scene} scale={2.5} position={[0, -1, 0]} />
        <pointLight position={[0, 0, 2]}   intensity={2}   color="#00f0ff" />
        <pointLight position={[-2, 2, -2]} intensity={1.5} color="#8a2be2" />

        {/* ── Speech bubble — positioned at the robot's face/mouth level ── */}
        {!showChat && (
          <Html
            position={[0.8, 1.8, 0.4]}
            center
          distanceFactor={5}
          zIndexRange={[100, 0]}
        >
          <div style={{
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(0, 10, 25, 0.92) 0%, rgba(0, 30, 50, 0.88) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid rgba(0, 240, 255, 0.6)',
            borderRadius: '24px',
            padding: '20px 32px',
            color: '#e0faff',
            fontSize: '18px',
            fontWeight: '800',
            whiteSpace: 'nowrap',
            fontFamily: "'Inter', sans-serif",
            pointerEvents: 'none',
            userSelect: 'none',
            boxShadow: `
              0 0 40px rgba(0, 240, 255, 0.45),
              0 0 80px rgba(0, 240, 255, 0.2),
              inset 0 0 15px rgba(0,240,255,0.1)
            `,
            animation: 'robotSpeechIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            letterSpacing: '0.05em',
            textShadow: '0 0 12px rgba(0,240,255,0.8)',
          }}>
            {/* The dynamic message */}
            <span>{message}</span>

            {/* Speech-bubble tail pointing down-left toward robot mouth */}
            <span style={{
              position: 'absolute',
              bottom: '-14px',
              left: '22px',
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '14px solid rgba(0, 240, 255, 0.55)',
              filter: 'drop-shadow(0 2px 6px rgba(0,240,255,0.4))',
            }} />
            {/* Tail inner fill */}
            <span style={{
              position: 'absolute',
              bottom: '-12px',
              left: '23px',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '11px solid transparent',
              borderTop: '13px solid rgba(0, 10, 25, 0.92)',
            }} />
          </div>
        </Html>
        )}
      </group>
    </Float>
  );
};

useGLTF.preload('/3Dmodels/robot/scene.gltf');

export default RobotMockup;
