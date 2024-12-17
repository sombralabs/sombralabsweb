import React, { useRef, useState, useEffect, useMemo } from "react";
import { useGLTF, useAnimations, Html, Instance, Instances } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useStateStore from "@/stores/stateStore";
import useNavLinksStore from "@/stores/navLinksStore";
import { useLenis } from "../App";
import CaseStudiesSection from "../sections/CaseStudiesSection";
import AboutUs from "../sections/AboutUs";

// Memoize static transformations
const MODEL_SCALE = 2.3;
const MODEL_POSITION = new THREE.Vector3(-0.7, -1.9, 0);
const MODEL_ROTATION = [0, Math.PI, 0];

export function LastSModel(props) {
  const group = useRef();
  const { lenis } = useLenis();
  const animationsCompleted = useRef(0);
  const { nodes, materials, animations } = useGLTF("/models/LastSModel.glb");
  const { actions, mixer } = useAnimations(animations, group);
  const { step, setStep, direction } = useStateStore();
  const { setPosition } = useNavLinksStore();

  const [animationState, setAnimationState] = useState("idle");

  // Optimize materials
  const optimizedMaterials = useMemo(() => {
    const glassMaterial = materials["Website  Glass Material"].clone();
    glassMaterial.roughness = 0.2;
    glassMaterial.envMapIntensity = 0.8;
    // Disable shadow updates when not needed
    glassMaterial.shadowSide = THREE.FrontSide;
    return { glassMaterial };
  }, [materials]);

  // Memoize mesh data for instancing
  const meshData = useMemo(() => {
    const logoMeshes = ['Logo_3D007', 'Logo_3D008', 'Logo_3D009', 'Logo_3D010', 'Logo_3D011', 'Logo_3D012'].map(name => ({
      geometry: nodes[name].geometry,
      position: nodes[name].position,
      rotation: nodes[name].rotation,
      scale: nodes[name].scale,
    }));
    return { logoMeshes };
  }, [nodes]);

  const handleAnimationEnd = () => {
    if (step !== 4) return;

    if (direction === -1) {
      window.scrollTo({
        top: document.querySelector("#s-spread-model-space").offsetTop - 50,
      });
      setStep(3);
      setPosition(3);
    } else {
      setStep(5);
      setPosition(4);
    }

    lenis.start();
  };

  // Optimize animation setup
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) {
      console.log("No actions available or actions are empty.");
      return;
    }

    const setupAnimations = () => {
      if (step > 4) {
        Object.values(actions).forEach(action => {
          action.time = direction === 1 ? action.getClip().duration : 0;
          action.paused = true;
          action.clampWhenFinished = true;
        });
        mixer.update(0);
        return;
      }

      setAnimationState("playing");
      Object.values(actions).forEach(action => {
        action.setLoop(THREE.LoopOnce);
        action.timeScale = direction;
        action.time = direction === -1 ? action.getClip().duration : 0;
        action.play();
        action.clampWhenFinished = true;
      });
    };

    setupAnimations();

    // Cleanup function
    return () => {
      Object.values(actions).forEach(action => action?.stop());
      mixer.stopAllAction();
    };
  }, [step, actions, direction, mixer]);

  // Optimize animation frame updates
  useFrame(() => {
    if (step !== 4 || !group.current || !actions || animationState !== "playing") return;

    const actionCount = Object.keys(actions).length;
    if (animationsCompleted.current < actionCount) {
      Object.values(actions).forEach(action => {
        const isComplete = direction === 1 
          ? action.time >= action.getClip().duration
          : action.time <= 0;
          
        if (isComplete) animationsCompleted.current++;
      });
    } else {
      animationsCompleted.current = 0;
      setAnimationState("idle");
      handleAnimationEnd();
    }
  });

  // Memoize HTML components to prevent unnecessary rerenders
  const htmlComponents = useMemo(() => ({
    caseStudies: <Html position={[2, -3, -7.824]}><CaseStudiesSection /></Html>,
    aboutUs: <Html position={[7, -3.5, -7.824]}><AboutUs /></Html>
  }), []);

  return (
    <group
      rotation={MODEL_ROTATION}
      ref={group}
      {...props}
      dispose={null}
      scale={MODEL_SCALE}
      position={MODEL_POSITION}
    >
      <group name="Scene">
        {htmlComponents.caseStudies}

        <mesh
          name="Cube0S_Array_02_1x1"
          castShadow
          receiveShadow
          geometry={nodes.Cube0S_Array_02_1x1.geometry}
          material={optimizedMaterials.glassMaterial}
          position={[11.919, -5.304, -7.824]}
          rotation={[-3.008, 1.303, 2.999]}
          scale={1.017}
        >
          {htmlComponents.aboutUs}
        </mesh>

        {/* Use instancing for repeated logo meshes */}
        <Instances>
          {meshData.logoMeshes.map((mesh, index) => (
            <Instance
              key={index}
              geometry={mesh.geometry}
              position={mesh.position}
              rotation={mesh.rotation}
              scale={mesh.scale}
            />
          ))}
        </Instances>

        {/* Special handling for mesh with morphTargets */}
        <mesh
          name="Logo_3D_005001"
          castShadow
          receiveShadow
          geometry={nodes.Logo_3D_005001.geometry}
          material={optimizedMaterials.glassMaterial}
          morphTargetDictionary={nodes.Logo_3D_005001.morphTargetDictionary}
          morphTargetInfluences={nodes.Logo_3D_005001.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

// Preload with low priority to not block other resources
useGLTF.preload("/models/LastSModel.glb", true);
