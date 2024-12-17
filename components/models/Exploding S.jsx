import React, { useEffect, useRef, useState, useMemo } from "react";
import { useGLTF, useAnimations, Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, MeshCollider, Physics, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import useStateStore from "@/stores/stateStore";
import useNavLinksStore from "@/stores/navLinksStore";
import { useLenis } from "../App";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

// Memoize initial positions to prevent recalculation
const initPosition = useMemo(() => [
  new THREE.Vector3(-0.163, 0.216, 0.232),
  // ... rest of the positions
], []);

export function ExplodeS({ ...props }) {
  const { lenis } = useLenis();
  const group = useRef();
  const { step, setStep } = useStateStore();
  const { nodes, materials } = useGLTF("/models/Exploding S.glb");

  const [isTransitioning, setIsTransitioning] = useState(false);
  const stepRef = useRef(step);

  // Memoize materials to prevent unnecessary recreations
  const optimizedMaterials = useMemo(() => {
    const glassMaterial = materials["Website Glass Material"].clone();
    glassMaterial.roughness = 0.2; // Optimize for performance
    glassMaterial.envMapIntensity = 0.8;
    
    // Create a shared material map for all clip materials
    const clipMaterials = {};
    Object.entries(materials).forEach(([key, material]) => {
      if (key.includes('Clip')) {
        const optimizedMaterial = material.clone();
        optimizedMaterial.roughness = 0.4;
        optimizedMaterial.envMapIntensity = 0.6;
        clipMaterials[key] = optimizedMaterial;
      }
    });

    return { glassMaterial, clipMaterials };
  }, [materials]);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  // Optimize scroll trigger
  useGSAP(
    () => {
      const trigger = new ScrollTrigger({
        trigger: "#s-model-space",
        start: "top top",
        end: "bottom top",
        onEnter: () => {
          if (stepRef.current === 2) {
            window.scrollTo({
              top: document.querySelector("#s-model-space").offsetTop + 1,
            });
            lenis.stop();
            setIsTransitioning(true);
            setStep(3);
          }
        },
        onLeaveBack: () => {
          if (stepRef.current === 3) {
            lenis.stop();
            setIsTransitioning(true);
          }
        },
      });

      return () => trigger.kill();
    },
    { dependencies: [], revertOnUpdate: true }
  );

  // Only enable physics when needed
  const physicsProps = useMemo(() => ({
    gravity: step === 2 ? [0, 0, 0] : [0, -9.81, 0],
    timeStep: step === 2 ? "vary" : "fixed",
  }), [step]);

  return (
    <Physics {...physicsProps}>
      <group
        scale={4}
        ref={group}
        {...props}
        dispose={null}
        rotation={[0, Math.PI, 0]}
        position={new THREE.Vector3(0, 0, 0)}
      >
        {step === 2 && <Pointer />}
        <Instances>
          {Array.from({ length: 26 }).map((_, index) => (
            <Connector
              key={index}
              index={index}
              isTransitioning={isTransitioning}
              setIsTransitioning={index === 24 ? setIsTransitioning : undefined}
              materials={optimizedMaterials}
              nodes={nodes}
              step={step}
            />
          ))}
        </Instances>
      </group>
    </Physics>
  );
}

const Connector = React.memo(({
  index,
  materials,
  nodes,
  vec = new THREE.Vector3(),
  isTransitioning,
  setIsTransitioning,
  step,
  ...props
}) => {
  const piece = useRef();
  const { lenis } = useLenis();
  const [pieceInitPosition] = useState(initPosition[index]);
  const { setStep, direction } = useStateStore();
  const { setPosition } = useNavLinksStore();
  
  const targetPosition = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const targetRotation = useMemo(() => new THREE.Euler(0, Math.PI, 0), []);

  const scrollIsStarted = useRef(false);

  useFrame((state, delta) => {
    if (!piece.current) return;
    
    delta = Math.min(0.1, delta);

    if (step === 3) {
      const currentPos = new THREE.Vector3().copy(piece.current.translation());
      const currentRot = new THREE.Quaternion().copy(piece.current.rotation());
      const targetQuat = new THREE.Quaternion().setFromEuler(targetRotation);

      if (isTransitioning) {
        if (direction === 1) {
          handleForwardTransition(currentPos, currentRot, targetQuat, delta);
        } else {
          handleBackwardTransition(currentPos, delta);
        }
      }
    } else if (step === 2) {
      // Only apply physics impulse in step 2
      piece.current.applyImpulse(
        vec.copy(piece.current.translation()).negate().multiplyScalar(0.01)
      );
    }
  });

  const handleForwardTransition = (currentPos, currentRot, targetQuat, delta) => {
    const newPos = currentPos.lerp(targetPosition, delta * 2);
    const newRot = currentRot.slerp(targetQuat, delta * 2);
    
    piece.current.setTranslation(newPos, true);
    piece.current.setRotation(newRot, true);

    if (
      index === 24 &&
      !scrollIsStarted.current &&
      newPos.distanceTo(targetPosition) < 0.001 &&
      newRot.angleTo(targetQuat) < 0.001
    ) {
      completeForwardTransition();
    }
  };

  const handleBackwardTransition = (currentPos, delta) => {
    const newPos = currentPos.lerp(pieceInitPosition, delta);
    piece.current.setTranslation(newPos, true);

    if (index === 24 && newPos.distanceTo(pieceInitPosition) < 0.1) {
      completeBackwardTransition();
    }
  };

  const completeForwardTransition = () => {
    scrollIsStarted.current = true;
    setIsTransitioning(false);
    window.scrollTo({
      top: document.querySelector("#s-model-space").offsetTop + 1,
    });

    setTimeout(() => {
      scrollIsStarted.current = false;
      lenis.start();
      setPosition(3);
    }, 500);
  };

  const completeBackwardTransition = () => {
    setIsTransitioning(false);
    window.scrollBy(0, -1);
    setStep(2);
    setPosition(2);
    window.scrollTo({
      top: document.querySelector("#s-model-space").offsetTop - 80,
    });

    setTimeout(() => {
      lenis.start();
    }, 100);
  };

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={initPosition[index]}
      ref={piece}
      colliders={false}
      enabledRotations={[false, step === 2, false]} // Only enable Y-axis rotation in step 2
    >
      {step === 2 ? (
        <MeshCollider type="ball">
          <Instance />
        </MeshCollider>
      ) : (
        <Instance />
      )}
    </RigidBody>
  );
});

const Pointer = React.memo(({ vec = new THREE.Vector3() }) => {
  const ref = useRef();
  
  useFrame(({ pointer, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      )
    );
  });

  return (
    <RigidBody
      type="kinematicPosition"
      colliders={false}
      ref={ref}
      userData={{ type: "pointer" }}
    >
      <CuboidCollider args={[0.1, 0.1, 10]} />
    </RigidBody>
  );
});

// Preload model with low priority
useGLTF.preload("/models/Exploding S.glb", true);
