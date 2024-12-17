import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useStateStore from "@/stores/stateStore";
import useNavLinksStore from "@/stores/navLinksStore";
import { useLenis } from "../App";

export function ExplodingCompound(props) {
  const group = useRef();
  const animationsCompleted = useRef(0);

  const { nodes, materials, animations } = useGLTF(
    "/models/ExplodingCompund.glb"
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
    <group ref={group} scale={[4.8, 4.8, 4.8]} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Compound_cell"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.201, 0.026, -0.158]}
        />
        <mesh
          name="Compound_cell001"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell001.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.181, 0.022, -0.125]}
        />
        <mesh
          name="Compound_cell002"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell002.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.104, -0.039, -0.187]}
        />
        <mesh
          name="Compound_cell003"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell003.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.001, 0.302, 0.01]}
        />
        <mesh
          name="Compound_cell004"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell004.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.162, 0.171, 0.038]}
        />
        <mesh
          name="Compound_cell005"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell005.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.169, -0.139, -0.134]}
        />
        <mesh
          name="Compound_cell006"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell006.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.006, -0.194, -0.149]}
        />
        <mesh
          name="Compound_cell007"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell007.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.067, -0.157, 0.018]}
        />
        <mesh
          name="Compound_cell008"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell008.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.032, -0.172, -0.094]}
        />
        <mesh
          name="Compound_cell009"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell009.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.188, 0.018, 0.153]}
        />
        <mesh
          name="Compound_cell010"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell010.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.159, -0.156, 0.171]}
        />
        <mesh
          name="Compound_cell011"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell011.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.131, 0.044, -0.16]}
        />
        <mesh
          name="Compound_cell012"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell012.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.297, -0.003, 0.003]}
        />
        <mesh
          name="Compound_cell014"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell014.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.248, 0.06, -0.061]}
        />
        <mesh
          name="Compound_cell015"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell015.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.076, -0.1, -0.118]}
        />
        <mesh
          name="Compound_cell016"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell016.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.172, -0.157, 0.001]}
        />
        <mesh
          name="Compound_cell017"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell017.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.317, 0.008, -0.007]}
        />
        <mesh
          name="Compound_cell018"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell018.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.017, -0.02, 0.274]}
        />
        <mesh
          name="Compound_cell019"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell019.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.218, 0.063, -0.095]}
        />
        <mesh
          name="Compound_cell020"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell020.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.143, 0.094, -0.153]}
        />
        <mesh
          name="Compound_cell021"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell021.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.13, -0.156, -0.127]}
        />
        <mesh
          name="Compound_cell022"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell022.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.203, -0.035, -0.1]}
        />
        <mesh
          name="Compound_cell023"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell023.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.169, -0.156, -0.009]}
        />
        <mesh
          name="Compound_cell024"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell024.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.015, -0.175, 0.156]}
        />
        <mesh
          name="Compound_cell025"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell025.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.147, -0.112, 0.067]}
        />
        <mesh
          name="Compound_cell027"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell027.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.006, -0.074, -0.244]}
        />
        <mesh
          name="Compound_cell028"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell028.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.169, -0.017, -0.197]}
        />
        <mesh
          name="Compound_cell029"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell029.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.159, -0.148, 0.146]}
        />
        <mesh
          name="Compound_cell030"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell030.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.132, -0.027, -0.198]}
        />
        <mesh
          name="Compound_cell031"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell031.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.163, 0.029, 0.131]}
        />
        <mesh
          name="Compound_cell032"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell032.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.028, 0.114, 0.202]}
        />
        <mesh
          name="Compound_cell033"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell033.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.089, -0.046, 0.141]}
        />
        <mesh
          name="Compound_cell034"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell034.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.12, 0.219, -0.049]}
        />
        <mesh
          name="Compound_cell035"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell035.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.104, -0.222, -0.035]}
        />
        <mesh
          name="Compound_cell036"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell036.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.167, 0.159, 0.16]}
        />
        <mesh
          name="Compound_cell037"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell037.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.159, 0.145, 0.013]}
        />
        <mesh
          name="Compound_cell038"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell038.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.02, 0.037, 0.292]}
        />
        <mesh
          name="Compound_cell039"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell039.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.194, -0.004, -0.174]}
        />
        <mesh
          name="Compound_cell040"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell040.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.168, 0.013, -0.194]}
        />
        <mesh
          name="Compound_cell041"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell041.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.092, -0.012, 0.198]}
        />
        <mesh
          name="Compound_cell042"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell042.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.005, -0.299, -0.001]}
        />
        <mesh
          name="Compound_cell043"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell043.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.075, 0.162, -0.099]}
        />
        <mesh
          name="Compound_cell044"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell044.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.024, 0.165, 0.132]}
        />
        <mesh
          name="Compound_cell045"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell045.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.154, 0.173, -0.145]}
        />
        <mesh
          name="Compound_cell046"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell046.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.016, 0.15, -0.172]}
        />
        <mesh
          name="Compound_cell047"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell047.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.009, -0.119, 0.24]}
        />
        <mesh
          name="Compound_cell049"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell049.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.016, 0, 0.337]}
        />
        <mesh
          name="Compound_cell013"
          castShadow
          receiveShadow
          geometry={nodes.Compound_cell013.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.186, 0.138, -0.136]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/ExplodingCompund.glb");
