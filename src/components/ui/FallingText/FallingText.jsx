import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';
import './FallingText.css';

/**
 * FallingText — physics-based falling words / pills.
 *
 * Props:
 *  text            – plain string; words are split by spaces (used when `items` not provided)
 *  items           – array of { label, cls } objects for individually-styled pills
 *  highlightWords  – array of word prefixes to highlight (only used with `text`)
 *  highlightClass  – CSS class applied to highlighted words
 *  trigger         – 'auto' | 'scroll' | 'click' | 'hover'
 *  delay           – ms to wait (show static) before physics starts (default 0)
 *  backgroundColor – canvas background
 *  wireframes      – show physics wireframes
 *  gravity         – vertical gravity (default 1)
 *  mouseConstraintStiffness
 *  fontSize
 */
const FallingText = ({
  className = '',
  text = '',
  items = null,
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'auto',
  delay = 0,
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem'
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const [effectStarted, setEffectStarted] = useState(false);

  /* ── Render words / pills into the DOM ── */
  useEffect(() => {
    if (!textRef.current) return;

    if (items && items.length > 0) {
      // Custom items with individual classes
      const newHTML = items
        .map(({ label, cls = '' }) =>
          `<span class="word ${cls}">${label}</span>`
        )
        .join(' ');
      textRef.current.innerHTML = newHTML;
    } else {
      // Plain text split into words
      const words = text.split(' ');
      const newHTML = words
        .map(word => {
          const isHighlighted = highlightWords.some(hw => word.startsWith(hw));
          return `<span class="word ${isHighlighted ? highlightClass : ''}">${word}</span>`;
        })
        .join(' ');
      textRef.current.innerHTML = newHTML;
    }
  }, [text, items, highlightWords, highlightClass]);

  /* ── Trigger + delay logic ── */
  useEffect(() => {
    if (trigger === 'auto') {
      const timer = setTimeout(() => setEffectStarted(true), delay);
      return () => clearTimeout(timer);
    }

    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const timer = setTimeout(() => setEffectStarted(true), delay);
            observer.disconnect();
            return () => clearTimeout(timer);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger, delay]);

  /* ── Physics engine ── */
  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: { width, height, background: backgroundColor, wireframes }
    });

    const boundaryOptions = { isStatic: true, render: { fillStyle: 'transparent' } };
    const floor    = Bodies.rectangle(width / 2,  height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25,         height / 2,  50, height, boundaryOptions);
    const rightWall= Bodies.rectangle(width + 25,  height / 2,  50, height, boundaryOptions);
    const ceiling  = Bodies.rectangle(width / 2,  -25,          width, 50, boundaryOptions);

    const wordSpans = textRef.current.querySelectorAll('.word');
    const wordBodies = [...wordSpans].map(elem => {
      const rect = elem.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top  - containerRect.top  + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.6,
        frictionAir: 0.02,
        friction: 0.3
      });

      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: 0 });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);
      return { elem, body };
    });

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute';
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
      elem.style.top  = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
      elem.style.transform = 'none';
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: mouseConstraintStiffness, render: { visible: false } }
    });
    render.mouse = mouse;

    World.add(engine.world, [
      floor, leftWall, rightWall, ceiling,
      mouseConstraint,
      ...wordBodies.map(wb => wb.body)
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let animFrameId;
    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left      = `${x}px`;
        elem.style.top       = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      Matter.Engine.update(engine);
      animFrameId = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      cancelAnimationFrame(animFrameId);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      const timer = setTimeout(() => setEffectStarted(true), delay);
      return () => clearTimeout(timer);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{ fontSize, lineHeight: 1.4 }}
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;
