import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useStateStore from "@/stores/stateStore";
import useNavLinksStore from "@/stores/navLinksStore";
import { useLenis } from "../App";

export function ExplodingPentTrap(props) {
  const group = useRef();
  const animationsCompleted = useRef(0);

  const { nodes, materials, animations } = useGLTF(
    "/models/ExplodingPentTrap.glb"
  );
  const { actions, mixer } = useAnimations(animations, group);
  const { step, setStep, direction } = useStateStore();
  const { setPosition } = useNavLinksStore();
  const [animationState, setAnimationState] = useState("idle");

  const { lenis } = useLenis();

  const handleAnimationEnd = () => {
    if (step !== 1) return;

    if (direction === -1) {
      setStep(0);
      const marqueeSection = document.getElementById("marquee");

      window.scrollTo({ top: marqueeSection?.offsetTop - 1 });
      setPosition(1);
      lenis.start();
    } else {
      setStep(2);
      const selectedWorksSection = document.getElementById("selected-work");
      window.scrollTo({
        top: selectedWorksSection?.offsetTop,
        behavior: "smooth",
      });

      setTimeout(() => {
        setPosition(2);
        lenis.start();
      }, 700);
    }
  };

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      if (step > 1) {
        Object.entries(actions).forEach(([name, action]) => {
          action.time = direction === 1 ? action.getClip().duration : 0;
          mixer.update(0);
          action.paused = true;
          action.clampWhenFinished = true;
        });
      }

      setAnimationState("playing");
      Object.entries(actions).forEach(([name, action]) => {
        action.setLoop(THREE.LoopOnce);
        action.timeScale = direction;
        if (direction === -1) {
          action.time = action.getClip().duration;
        }
        action.play();
        action.clampWhenFinished = true;
      });

      return () => {
        Object.entries(actions).forEach(([name, action]) => {
          if (action) {
            action.stop();
          }
        });
      };
    } else {
      console.log("No actions available or actions are empty.");
    }
  }, [actions, direction, step]);

  useFrame(() => {
    if (actions) {
      Object.entries(actions).forEach(([name, action]) => {
        if (animationState === "playing") {
          if (animationsCompleted.current < Object.keys(actions).length) {
            if (direction === 1 && action.time >= action.getClip().duration) {
              animationsCompleted.current += 1;
            } else if (direction === -1 && action.time <= 0) {
              animationsCompleted.current += 1;
            }
          } else {
            animationsCompleted.current = 0;
            setAnimationState("idle");
            handleAnimationEnd();
          }
        }
      });
    }
  });

  return (
    <group
      scale={[4.8, 4.8, 4.8]}
      rotation={[0, Math.PI / 6, 0]}
      ref={group}
      {...props}
      dispose={null}
    >
      <group name="Scene">
        <group name="Empty002" position={[-0.529, -0.223, 0.277]}>
          <mesh
            name="Pentagonal_Trap_cell"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.46, 0.196, -0.143]}
          />
          <mesh
            name="Pentagonal_Trap_cell001"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell001.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.526, 0.475, -0.121]}
          />
          <mesh
            name="Pentagonal_Trap_cell002"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell002.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.432, 0.242, -0.161]}
          />
          <mesh
            name="Pentagonal_Trap_cell003"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell003.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.538, 0.104, -0.172]}
          />
          <mesh
            name="Pentagonal_Trap_cell004"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell004.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.523, 0.147, -0.429]}
          />
          <mesh
            name="Pentagonal_Trap_cell005"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell005.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.44, 0.168, -0.206]}
          />
          <mesh
            name="Pentagonal_Trap_cell006"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell006.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.521, 0.39, -0.337]}
          />
          <mesh
            name="Pentagonal_Trap_cell007"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell007.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.646, 0.341, -0.265]}
          />
          <mesh
            name="Pentagonal_Trap_cell008"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell008.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.402, 0.322, -0.304]}
          />
          <mesh
            name="Pentagonal_Trap_cell009"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell009.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.527, 0.071, -0.262]}
          />
          <mesh
            name="Pentagonal_Trap_cell010"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell010.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.53, -0.095, -0.451]}
          />
          <mesh
            name="Pentagonal_Trap_cell011"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell011.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.585, 0.252, -0.389]}
          />
          <mesh
            name="Pentagonal_Trap_cell012"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell012.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.61, 0.327, -0.373]}
          />
          <mesh
            name="Pentagonal_Trap_cell013"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell013.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.613, 0.181, -0.137]}
          />
          <mesh
            name="Pentagonal_Trap_cell014"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell014.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.429, 0.177, -0.395]}
          />
          <mesh
            name="Pentagonal_Trap_cell015"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell015.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.52, -0.093, -0.419]}
          />
          <mesh
            name="Pentagonal_Trap_cell016"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell016.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.667, 0.157, -0.261]}
          />
          <mesh
            name="Pentagonal_Trap_cell017"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell017.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.627, 0.13, -0.383]}
          />
          <group
            name="Pentagonal_Trap_cell018"
            position={[0.522, -0.118, -0.442]}
          />
          <mesh
            name="Pentagonal_Trap_cell019"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell019.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.564, 0.187, -0.15]}
          />
          <mesh
            name="Pentagonal_Trap_cell020"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell020.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.49, 0.001, -0.397]}
          />
          <mesh
            name="Pentagonal_Trap_cell021"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell021.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.56, -0.053, -0.427]}
          />
          <mesh
            name="Pentagonal_Trap_cell022"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell022.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.443, 0.276, -0.415]}
          />
          <mesh
            name="Pentagonal_Trap_cell023"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell023.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.632, 0.172, -0.165]}
          />
          <mesh
            name="Pentagonal_Trap_cell024"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell024.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.458, 0.313, -0.179]}
          />
          <mesh
            name="Pentagonal_Trap_cell025"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell025.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.543, -0.038, -0.343]}
          />
          <mesh
            name="Pentagonal_Trap_cell026"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell026.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.531, 0.571, -0.128]}
          />
          <mesh
            name="Pentagonal_Trap_cell027"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell027.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.49, 0.492, -0.189]}
          />
          <mesh
            name="Pentagonal_Trap_cell028"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell028.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.39, 0.236, -0.285]}
          />
          <mesh
            name="Pentagonal_Trap_cell029"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell029.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.537, 0.525, -0.146]}
          />
          <mesh
            name="Pentagonal_Trap_cell030"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell030.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.535, 0.411, -0.167]}
          />
          <mesh
            name="Pentagonal_Trap_cell031"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell031.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.381, 0.255, -0.36]}
          />
          <mesh
            name="Pentagonal_Trap_cell032"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell032.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.545, -0.072, -0.39]}
          />
          <mesh
            name="Pentagonal_Trap_cell033"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell033.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.586, 0.026, -0.417]}
          />
          <mesh
            name="Pentagonal_Trap_cell034"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell034.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.693, 0.241, -0.316]}
          />
          <mesh
            name="Pentagonal_Trap_cell035"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell035.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.392, 0.145, -0.255]}
          />
          <mesh
            name="Pentagonal_Trap_cell036"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell036.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.636, 0.246, -0.175]}
          />
          <mesh
            name="Pentagonal_Trap_cell037"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell037.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.593, 0.034, -0.329]}
          />
          <mesh
            name="Pentagonal_Trap_cell038"
            castShadow
            receiveShadow
            geometry={nodes.Pentagonal_Trap_cell038.geometry}
            material={materials["Website  Glass Material"]}
            position={[0.61, 0.286, -0.422]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/ExplodingPentTrap.glb");
