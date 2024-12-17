"use client";
import { useEffect, useRef, useState } from "react";
import useStateStore from "@/stores/stateStore";
import useNavLinksStore from "@/stores/navLinksStore";
import useModelStore from "@/stores/modelStore";
import { useFrame, useThree } from "@react-three/fiber";
import { DiamondModel } from "@/components/models/Diamond";
import { CompoundModel } from "@/components/models/Compound";
import { AbstractModel } from "@/components/models/Abstract";
import { PentagonalModel } from "@/components/models/PentagonalTrapezium";
import { ExplodingPentTrap } from "@/components/models/ExplodingPentTrap";
import { ExplodingCompound } from "@/components/models/ExplodingCompound";
import { ExplodingDiamond } from "@/components/models/ExplodingDiamond";
import { ExplodingAbstract } from "@/components/models/ExplodingAbstract";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useLenis } from "../App";

const ExplosionModelContainer = ({ canvasIsActive, ...props }) => {
  let targetX;
  let targetY;
  let camera = useThree((state) => state.camera);

  const targetXRotation = 0.2;
  const targetYRotation = 1.0;
  const sensitivity = 2.0;

  const group = useRef(null);
  const { currentModel } = useModelStore();

  const { setPosition } = useNavLinksStore();
  const { introDone, step, setStep, direction } = useStateStore();

  const [isAdjustingRotation, setIsAdjustingRotation] = useState(false);

  const handleResize = () => {
    const isMedium = window.innerWidth < 1280;
    const isSmall = window.innerWidth < 980;
    const isExtraSmall = window.innerWidth < 510;

    let k;
    let fov;
    let x;

    if (isExtraSmall) {
      x = -12;
      fov = 25;
    } else if (isSmall) {
      x = -12;
      fov = 20;
    } else if (isMedium) {
      k = 0.15;
      x = -3 - 3 * (1 - Math.exp((-k * (1920 - window.innerWidth)) / 1920));
      fov = 20;
    } else {
      k = 1.5;
      x = -3 - 3 * (1 - Math.exp((-k * (1920 - window.innerWidth)) / 1920));
      fov = (1400 * 18) / window.innerWidth;
    }

    console.log(fov);

    camera.position.set(x, 0, 30);
    camera.fov = fov;

    camera.updateProjectionMatrix();
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { lenis } = useLenis();

  const stepRef = useRef(step);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useGSAP(
    () => {
      if (!introDone) return;

      // moves the modal from the right to the center of the screen
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 20,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          endTrigger: "#marquee",
          end: "center bottom",
          scrub: true,
        },
      });

      new ScrollTrigger({
        trigger: "#marquee",
        start: "center bottom", // must equal the end of the previous scrollTrigger
        end: "center center",
        scrub: true,
        onLeave: () => {
          if (stepRef.current === 0) {
            lenis.stop();
            setIsAdjustingRotation(true);
          }
        },
        onEnterBack: () => {
          if (stepRef.current === 2) {
            lenis.stop();
            setStep(1);
          }
        },
      });
    },
    { dependencies: [introDone], revertOnUpdate: true }
  );

  useFrame(({ pointer }) => {
    if (group.current && canvasIsActive) {
      if (!isAdjustingRotation) {
        targetY = -pointer.y * sensitivity;
        targetX = pointer.x * sensitivity;

        group.current.rotation.y += 0.05 * (targetX - group.current.rotation.y);
        group.current.rotation.x += 0.05 * (targetY - group.current.rotation.x);
      }

      if (isAdjustingRotation) {
        const modelXRotation = group.current.rotation.x;
        const modelYRotation = group.current.rotation.y;

        if (
          Math.abs(modelXRotation - targetXRotation) > 0.01 ||
          Math.abs(modelYRotation - targetYRotation) > 0.01
        ) {
          if (direction === -1) {
            setStep(0);
            const marqueeSection = document.getElementById("marquee");
            window.scrollTo({ top: marqueeSection?.offsetTop - 1 });
            setPosition(1);
            lenis.start();
          }
          group.current.rotation.x += 0.2 * (targetXRotation - modelXRotation);
          group.current.rotation.y += 0.2 * (targetYRotation - modelYRotation);
        } else {
          setIsAdjustingRotation(false);
          if (direction === 1) setStep(1); // Move to the next step after adjustment
        }
      }
    }
  });

  return (
    <>
      {canvasIsActive && step === 0 ? (
        <group {...props} ref={group} rotation={[0.2, 1, 0]}>
          {currentModel === 0 && <PentagonalModel />}
          {currentModel === 1 && <CompoundModel />}
          {currentModel === 2 && <AbstractModel />}
          {currentModel === 3 && <DiamondModel />}
        </group>
      ) : (
        <>
          {currentModel === 0 && <ExplodingPentTrap />}
          {currentModel === 1 && <ExplodingCompound />}
          {currentModel === 2 && <ExplodingAbstract />}
          {currentModel === 3 && <ExplodingDiamond />}
        </>
      )}
    </>
  );
};

export default ExplosionModelContainer;
