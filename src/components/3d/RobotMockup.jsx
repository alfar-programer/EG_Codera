import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Float } from "@react-three/drei";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import * as THREE from "three";

/**
 * RobotMockup – pure 3D mesh, no Html overlay.
 * Speech bubble is rendered by the parent as a plain DOM element.
 *
 * IMPORTANT: We clone the GLTF scene via SkeletonUtils.clone() so that
 * each Canvas instance gets its own independent Three.js object tree.
 * Without cloning, multiple Canvases fight over the same shared scene
 * object (a Three.js node can only have one parent), causing one canvas
 * to render black.
 */
const RobotMockup = ({
  scrollProgress = 0,
  dragDelta = { x: 0, y: 0 },
  onRobotClick,
  showChat = false,
}) => {
  const group = useRef();
  const { scene: gltfScene, animations } = useGLTF("/3Dmodels/robot/scene.gltf");

  // Clone the GLTF scene so each Canvas instance owns its own Three.js
  // object tree. SkeletonUtils.clone handles skinned meshes + bones correctly.
  const scene = useMemo(() => SkeletonUtils.clone(gltfScene), [gltfScene]);

  const { actions } = useAnimations(animations, group);

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

  useFrame((state) => {
    if (!group.current) return;

    // 1. Mouse-look
    const targetY = state.mouse.x * (Math.PI / 4);
    const targetX = -state.mouse.y * (Math.PI / 6);
    const dragY   = dragDelta.x * 0.006;
    const dragX   = dragDelta.y * 0.006;

    smoothRotY.current = THREE.MathUtils.lerp(smoothRotY.current, targetY + dragY, 0.07);
    smoothRotX.current = THREE.MathUtils.lerp(smoothRotX.current, targetX + dragX, 0.07);

    // 2. Scroll-driven spin
    const targetSpin = scrollProgress * Math.PI * 8;
    smoothSpinY.current = THREE.MathUtils.lerp(smoothSpinY.current, targetSpin, 0.05);

    group.current.rotation.y = smoothRotY.current + smoothSpinY.current;
    group.current.rotation.x = smoothRotX.current;

    // 3. Scroll-driven scale
    let targetScale = 1;
    if (scrollProgress <= 0.25) {
      const factor = scrollProgress / 0.25;
      targetScale  = 1.6 - factor * 0.9;
    } else {
      const factor = (scrollProgress - 0.25) / 0.75;
      targetScale  = 0.7 - factor * 0.1;
    }
    smoothScale.current = THREE.MathUtils.lerp(smoothScale.current, targetScale, 0.06);
    group.current.scale.setScalar(smoothScale.current);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
      <group
        ref={group}
        dispose={null}
        onClick={(e) => {
          e.stopPropagation();
          onRobotClick && onRobotClick();
        }}
      >
        <primitive object={scene} scale={2.5} position={[0, -1, 0]} />
        <pointLight position={[0, 0, 2]}  intensity={2}   color="#D9FF00" />
        <pointLight position={[-2, 2, -2]} intensity={1.5} color="#ffffff" />
      </group>
    </Float>
  );
};

useGLTF.preload("/3Dmodels/robot/scene.gltf");

export default RobotMockup;
