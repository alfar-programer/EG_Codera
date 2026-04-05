import React, { Suspense, useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import RobotMockup from '../../components/3d/RobotMockup';
import ChatBox from '../../components/ui/ChatBox/ChatBox';
import './ContactUs.css';

const ContactUs = () => {
  // Drag logic for the robot
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const isDragging = useRef(false);
  const isActualDrag = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const accumulated = useRef({ x: 0, y: 0 });

  const triggerChat = useCallback(() => {
    if (isActualDrag.current) return;
    setShowChat(true);
  }, []);

  const onPointerDown = useCallback((e) => {
    isDragging.current = true;
    isActualDrag.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    lastPos.current = { x: e.clientX, y: e.clientY };
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
    <div className="contact-page">
      {/* Animated glowing orbs in background */}
      <div className="contact-bg-glow" />
      <div className="contact-bg-glow-2" />

      <div className="contact-container">
        
        {/* Left Side: Form and Info */}
        <div className="contact-content">
          <div className="contact-header">
            <h1>Let's work<br />together</h1>
            <p>Ready to take your digital presence to the next level? Connect with our team of AI and 3D web experts today.</p>
          </div>

          <div className="contact-info-grid">
            <div className="info-card">
              <div className="info-icon">
                <svg fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <h3>Email Us</h3>
                <a href="mailto:hello@egcodera.com">hello@egcodera.com</a>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <svg fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <div>
                <h3>Call Us</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input type="text" className="form-input" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" className="form-input" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea className="form-input" placeholder="How can we help you?" required></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Message
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </form>
        </div>

        {/* Right Side: 3D Robot Canvas */}
        <div 
          className="contact-3d-wrapper"
          style={{ cursor: isGrabbing ? 'grabbing' : 'grab' }}
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
              <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f0ff" />
              <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#8a2be2" />

              {/* scrollProgress=0 ensures it is large and faces forward */}
              <RobotMockup
                scrollProgress={0}
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

          {!showChat && (
            <div className="robot-hint">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
              Interact with Tobe
            </div>
          )}
        </div>

      </div>

      {/* Chat App Modal */}
      {showChat && <ChatBox onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default ContactUs;
