"use client";
import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import useStateStore from "@/stores/stateStore";
import useCaseStudyStore from "@/stores/caseStudyStore";
import useModelStore from "@/stores/modelStore";
import GradientAnimation from "./GradientAnimation";
import { Loader, AdaptiveDpr, AdaptiveEvents, BakeShadows } from "@react-three/drei";
import LandingPage from "./sections/LandingPage";
import HomeSection from "./sections/HomeSection";
import Marquee from "./sections/Marquee";
import SelectedWorkSection from "./sections/SelectedWorkSection";
import CaseStudyPopup from "./ui/CaseStudyPopup";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Bloom, EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { KernelSize, BlendFunction } from "postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import ExplosionModelContainer from "@/components/models/ExplosionModelContainer";
import SModelContainer from "@/components/models/SModelContainer";
import { useGSAP } from "@gsap/react";
import LastSection from "./sections/LastSection";
import { Perf } from "r3f-perf";

gsap.registerPlugin(ScrollTrigger);

// Performance configuration based on device capabilities
const getDeviceConfig = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isLowPerfDevice = navigator.hardwareConcurrency <= 4;

  return {
    powerPreference: "high-performance",
    antialias: !isMobile,
    dpr: isMobile ? [0.5, 1] : [1, 2],
    performance: {
      min: 0.5,
      max: 1,
      debounce: 200,
    },
    shadows: !isLowPerfDevice,
    bloomIntensity: isMobile ? 1.0 : 2.0,
    fluidQuality: isMobile ? 512 : 1024,
  };
};

const Main = () => {
  const { step, introDone } = useStateStore();
  const { currentModel, setCurrentModel } = useModelStore();
  const { activePopup } = useCaseStudyStore();

  const modalWrapper1 = useRef(null);
  const modalWrapper2 = useRef(null);
  const explosionRef = useRef(null);
  
  const [activeCanvas, setActiveCanvas] = useState(1);
  const [deviceConfig] = useState(getDeviceConfig);

  // Memoize light setup
  const lightSetup = useMemo(() => ({
    ambient: { color: "#ff0000", intensity: 1.5 },
    directional: { color: "#ffddaa", position: [10, 10, 5], intensity: 1.5 },
    point: { color: "#aabbff", position: [-10, -10, -10], intensity: 1 }
  }), []);

  const handleResize = () => {
    if (!introDone || !modalWrapper1.current || !modalWrapper2.current) {
      modalWrapper1.current && (modalWrapper1.current.style.height = 'unset');
      return;
    }

    const section1 = document.getElementById("home");
    const section2 = document.getElementById("marquee");
    const section3 = document.getElementById("selected-work");

    if (!section1 || !section2 || !section3) return;

    const height1 = section1.getBoundingClientRect().height + 
                   section2.getBoundingClientRect().height;

    modalWrapper1.current.style.height = `${height1}px`;
    modalWrapper2.current.style.top = `${height1 + section3.getBoundingClientRect().height}px`;
  };

  useEffect(() => {
    handleResize();
    const debouncedResize = debounce(handleResize, 100);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, [introDone]);

  useEffect(() => {
    if (step === 1 && explosionRef.current) {
      explosionRef.current.currentTime = 0;
      explosionRef.current.play();
    }
  }, [step]);

  useGSAP(
    () => {
      if (introDone) {
        new ScrollTrigger({
          trigger: modalWrapper1.current,
          start: "top top",
          end: "bottom top",
          onLeave: () => setActiveCanvas(2),
          onEnterBack: () => setActiveCanvas(1),
        });
      } else {
        setActiveCanvas(1);
      }
    },
    { dependencies: [introDone], revertOnUpdate: true }
  );

  // Memoize Canvas configuration
  const canvasConfig = useMemo(() => ({
    gl: {
      powerPreference: deviceConfig.powerPreference,
      antialias: deviceConfig.antialias,
      stencil: false,
      depth: true,
      alpha: false,
    },
    dpr: deviceConfig.dpr,
    performance: deviceConfig.performance,
    camera: { fov: 45, near: 0.1, far: 200 },
  }), [deviceConfig]);

  const CanvasWrapper = ({ children, ...props }) => (
    <Canvas {...canvasConfig} {...props}>
      <Suspense fallback={null}>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        {deviceConfig.shadows && <BakeShadows />}
        {children}
      </Suspense>
    </Canvas>
  );

  return (
    <>
      <Loader />
      <LandingPage />
      <GradientAnimation />

      <div>
        <video
          className="fixed top-0 left-0 w-full h-[100vh] -z-10 object-cover"
          src="/videos/bg2.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <video
          ref={explosionRef}
          preload="auto"
          playsInline
          muted
          disablePictureInPicture
          src="/videos/EXPLOSION_ELEMENT.mp4"
          className={`fixed top-0 left-0 min-w-[100%] h-[100vh] hover:cursor-pointer bg-transparent object-cover mix-blend-screen z-40 pointer-events-none ${
            step === 1 ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div ref={modalWrapper1} className="absolute top-0 left-0 w-full">
        <div
          className="sticky top-0 w-full h-[100dvh] z-30"
          onClick={() => step === 0 && setCurrentModel((currentModel + 1) % 4)}
        >
          <CanvasWrapper>
            <ambientLight {...lightSetup.ambient} />
            <directionalLight {...lightSetup.directional} castShadow={deviceConfig.shadows} />
            <pointLight {...lightSetup.point} />
            
            <EffectComposer multisampling={deviceConfig.antialias ? 4 : 0}>
              <Fluid 
                showBackground={false} 
                rainbow={true}
                resolution={deviceConfig.fluidQuality}
              />
              <Bloom 
                intensity={deviceConfig.bloomIntensity}
                luminanceThreshold={0.9}
                luminanceSmoothing={0.025}
                kernelSize={KernelSize.LARGE}
                blendFunction={BlendFunction.SCREEN}
              />
              <DepthOfField
                focusDistance={0}
                focalLength={0.02}
                bokehScale={2}
                height={480}
              />
            </EffectComposer>
            
            <Environment preset="warehouse" environmentIntensity={0.5} />
            <ExplosionModelContainer canvasIsActive={activeCanvas === 1} />
          </CanvasWrapper>
        </div>
      </div>

      {introDone && (
        <>
          <HomeSection />
          <Marquee />
          <SelectedWorkSection />

          <div
            ref={modalWrapper2}
            className="absolute left-0 w-full h-[calc(1000vh+240px+240px)]"
          >
            <div className="sticky top-0 w-full h-[100dvh]">
              <CanvasWrapper>
                <EffectComposer multisampling={deviceConfig.antialias ? 4 : 0}>
                  <Fluid 
                    showBackground={false} 
                    rainbow={true}
                    resolution={deviceConfig.fluidQuality}
                  />
                </EffectComposer>
                <Environment preset="warehouse" environmentIntensity={0.5} />
                <SModelContainer canvasIsActive={activeCanvas === 2} />
              </CanvasWrapper>
            </div>
          </div>

          <div id="s-model-pieces-space" className="h-[240px]" />
          <div id="s-model-space" className="h-[240px]" />

          <div id="s-spread-model-space" className="h-[1000vh] flex items-center">
            {activePopup !== null && <CaseStudyPopup />}
          </div>

          <LastSection />
        </>
      )}
    </>
  );
};

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default Main;
