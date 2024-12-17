"use client";
import { useEffect, useRef, useMemo } from "react";
import useStateStore from "@/stores/stateStore";
import { useThree } from "@react-three/fiber";
import { ExplodeS } from "./Exploding S";
import { LastSModel } from "./LastSModel";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "../App";
import { ScrollTrigger } from "gsap/all";

const SModelContainer = ({ canvasIsActive }) => {
  let camera = useThree((state) => state.camera);
  const cameraRef = useRef(camera);
  const { lenis } = useLenis();

  const { step, setStep } = useStateStore();

  // Memoize camera settings to prevent unnecessary calculations
  const getCameraSettings = useMemo(() => {
    return {
      mobile: { fov: 20, position: [0, 0, 20] },
      desktop: { 
        fov: (1400 * 18) / window.innerWidth,
        position: [0, 0, 20]
      }
    };
  }, []);

  const handleResize = () => {
    const isMedium = window.innerWidth < 1280;
    const settings = isMedium ? getCameraSettings.mobile : getCameraSettings.desktop;

    camera.fov = settings.fov;
    camera.position.set(...settings.position);
    camera.updateProjectionMatrix();
  };

  useEffect(() => {
    handleResize();
    
    // Debounce resize handler for better performance
    let resizeTimeout;
    const debouncedResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  const handleStopDuring = () => {
    lenis.stop();
    setTimeout(() => {
      lenis.start();
    }, 200);
  };

  const stepRef = useRef(step);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  // Memoize scroll trigger settings
  const sectionTriggerSettings = useMemo(() => ({
    trigger: "#s-spread-model-space",
    onEnter: handleStopDuring,
    onLeaveBack: handleStopDuring,
  }), [handleStopDuring]);

  useGSAP(
    () => {
      const spreadModelTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: "#s-model-space",
          start: "bottom top",
          endTrigger: "#s-spread-model-space",
          end: "bottom bottom",
          scrub: true,
          onEnter: () => {
            if (stepRef.current === 3) {
              window.scrollTo({
                top: document.querySelector("#s-spread-model-space").offsetTop + 1,
              });
              lenis.stop();
              setStep(4);
            }
          },
          onLeaveBack: () => {
            if (stepRef.current === 5) {
              lenis.stop();
              setStep(4);
            }
          },
        },
      });

      // Create scroll triggers with memoized settings
      new ScrollTrigger({
        ...sectionTriggerSettings,
        start: () =>
          `${
            (((6 / 865) * (window.innerHeight - 944) + 9) / 2840) *
              (window.innerWidth - 1920) +
            48
          }% bottom`,
      });

      new ScrollTrigger({
        ...sectionTriggerSettings,
        start: () =>
          `${
            (((9 / 371) * (window.innerHeight - 944) + 31) / 14200) *
              (window.innerWidth - 1920) +
            82.5
          }% bottom`,
      });

      // Optimize animation timeline by batching similar animations
      const batchedAnimations = {
        key1: { x: 4, y: -5, z: 7, rotY: -0.5 * Math.PI },
        key2: { x: 8, y: -10, z: 3, rotY: -1 * Math.PI },
        key3: { x: 12, y: -15, z: 7, rotY: -1.5 * Math.PI },
        key4: { x: 8, y: -18, z: 12, rotY: -1.8 * Math.PI },
        key5: { x: 4, y: -25, z: 7, rotY: -2.5 * Math.PI },
        key6: { x: 12, y: -30, z: 3, rotY: -3 * Math.PI },
        key06: { x: 12, y: -34, z: 7, rotY: -3.4 * Math.PI },
        key7: { x: 8, y: -40, z: 11, rotY: -4 * Math.PI },
        key8: { x: 4, y: -46, z: 11, rotY: -4.6 * Math.PI }
      };

      spreadModelTl
        .to(camera.position, { y: 0, z: 20 })
        .to(
          cameraRef.current,
          {
            fov: 45,
            duration: 0.5,
            onUpdate: () => cameraRef.current.updateProjectionMatrix(),
          },
          "key1"
        );

      // Batch similar animations together
      Object.entries(batchedAnimations).forEach(([key, values]) => {
        spreadModelTl
          .to(camera.position, { x: values.x, y: values.y, z: values.z }, key)
          .to(camera.rotation, { y: values.rotY }, key);
      });
    },
    { dependencies: [], revertOnUpdate: true }
  );

  // Only render components when needed
  const shouldRenderExplodeS = canvasIsActive;
  const shouldRenderLastSModel = canvasIsActive && [4, 5].includes(step);

  return (
    <>
      {shouldRenderExplodeS && <ExplodeS />}
      {shouldRenderLastSModel && <LastSModel />}
    </>
  );
};

export default SModelContainer;
