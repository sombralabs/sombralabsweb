import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useStateStore from "@/stores/stateStore";
import useNavLinksStore from "@/stores/navLinksStore";
import { useLenis } from "../App";

export function ExplodingAbstract(props) {
  const group = useRef();
  const animationsCompleted = useRef(0);

  const { nodes, materials, animations } = useGLTF(
    "/models/ExplosionAbstract.glb"
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
          name="Abstract_cell"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.164, -0.206, -0.249]}
          scale={0.418}
        />
        <mesh
          name="Abstract_cell001"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell001.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.244, 0.362, -0.22]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell002"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell002.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.139, -0.06, -0.077]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell003"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell003.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.019, 0.157, 0.007]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell006"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell006.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.128, -0.378, -0.026]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell007"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell007.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.132, -0.138, -0.215]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell009"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell009.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.191, -0.144, 0.018]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell010"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell010.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.229, 0.334, -0.214]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell012"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell012.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.023, -0.41, 0.004]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell013"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell013.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.181, 0.25, -0.201]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell014"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell014.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.028, -0.198, 0.163]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell016"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell016.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.12, -0.341, 0.067]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell017"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell017.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.082, -0.183, 0.123]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell018"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell018.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.005, -0.216, -0.132]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell020"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell020.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.153, -0.244, -0.077]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell022"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell022.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.075, -0.349, -0.074]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell023"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell023.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.095, 0.141, -0.058]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell024"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell024.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.238, -0.086, -0.027]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell025"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell025.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.055, 0.133, -0.289]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell026"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell026.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.165, -0.219, -0.166]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell027"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell027.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.08, 0.119, -0.258]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell028"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell028.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.177, -0.09, -0.099]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell029"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell029.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.018, 0.251, -0.001]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell030"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell030.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.176, -0.209, -0.24]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell031"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell031.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.212, -0.381, 0.015]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell032"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell032.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.005, -0.139, 0.273]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell033"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell033.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.035, -0.084, 0.157]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell034"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell034.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.139, 0.147, -0.245]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell035"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell035.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.241, -0.089, -0.011]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell036"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell036.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.123, -0.137, -0.245]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell038"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell038.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.095, -0.297, 0.019]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell039"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell039.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.009, 0.166, -0.217]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell040"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell040.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.149, -0.405, -0.009]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell041"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell041.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.068, 0.048, -0.216]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell042"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell042.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.081, 0.032, -0.259]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell043"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell043.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.218, 0.173, -0.215]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell045"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell045.geometry}
          material={materials["Website  Glass Material"]}
          position={[0.243, 0.318, -0.191]}
          scale={0.416}
        />
        <mesh
          name="Abstract_cell048"
          castShadow
          receiveShadow
          geometry={nodes.Abstract_cell048.geometry}
          material={materials["Website  Glass Material"]}
          position={[-0.121, -0.032, -0.022]}
          scale={0.416}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/ExplosionAbstract.glb");
