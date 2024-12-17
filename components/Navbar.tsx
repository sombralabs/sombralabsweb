"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import useStateStore from "@/stores/stateStore";
import useNavLinksStore from "@/stores/navLinksStore";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/components/svg/Logo";
import Lenis from "@studio-freight/lenis/types";

interface NavbarProps {
  lenis: Lenis;
}

const Navbar = ({ lenis }: NavbarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { introDone, setIntroDone, toggleFlash, setStep, setDirection } =
    useStateStore();

  const { position, setPosition, isMovingUser, setIsMovingUser } =
    useNavLinksStore();

  const positionRef = useRef(position);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const navigationHandler = (end: number): Promise<void> => {
    if (!introDone) setStep(0);

    setIsMovingUser(true);
    toggleFlash(false);
    setIntroDone(true);

    setTimeout(() => setIsMovingUser(false), 8000);

    return new Promise((resolve) => {
      const start = position; // 2 -> 1

      const direction = Math.sign(end - start);
      setDirection(direction);

      const generateStageScroll = (id: string): Promise<void> => {
        return new Promise((resolve) => {
          const startPosition = positionRef.current;

          const section = document.getElementById(id);

          if (section)
            window.scrollTo({
              top: section.offsetTop + direction,
              behavior: "smooth",
            });

          const checkCompletion = () => {
            if (positionRef.current !== startPosition) {
              resolve();
            } else requestAnimationFrame(checkCompletion);
          };

          checkCompletion();
        });
      };

      const handleFirstStage = (): Promise<void> => {
        return new Promise((resolve) => {
          const checkCompletion = () => {
            if (positionRef.current !== 0) {
              resolve();
            } else requestAnimationFrame(checkCompletion);
          };

          checkCompletion();
        });
      };

      const stageScrolls = {
        1: () => handleFirstStage(),
        2: () => generateStageScroll("marquee"),
        3: () => generateStageScroll("s-model-space"),
        4: () => generateStageScroll("s-spread-model-space"),
      };

      type Stage = 1 | 2 | 3 | 4;

      const length = Math.abs(end - start);
      const step = start < end ? 1 : -1;
      const pendingStages: Stage[] = Array.from(
        { length },
        (_, i) => start + step * (i + 1)
      );

      // 1 -> 2 [2] => 2
      // 3 -> 2 [2] => 3

      if (pendingStages.length === 0) {
        setIsMovingUser(false);
        resolve();
      }

      async function processStages() {
        for (const stage of pendingStages) {
          const fromStage = (stage - direction) as Stage;

          if (direction === 1) await stageScrolls[stage]();
          else if (direction === -1) await stageScrolls[fromStage]();
        }

        setIsMovingUser(false);
        resolve();
      }

      processStages();
    });
  };

  const navLinks = [
    {
      name: "BEYOND",
      position: 0,
      onClick: function () {
        setScrollPosition(0);
        window.scrollTo(0, 0);
        setIntroDone(false);
        toggleFlash(true);
        setPosition(0);
        setDirection(1);
      },
    },
    {
      name: "HOME",
      position: 1,
      onClick: function () {
        if (introDone) {
          navigationHandler(this.position).then(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
        } else {
          setStep(0);
          setIntroDone(true);
          toggleFlash(false);
        }
      },
    },
    {
      name: "SANDBOX",
      position: 2,
      onClick: function () {
        navigationHandler(this.position).then(() => {
          window.scrollTo({
            top: document.getElementById("s-model-pieces-space")?.offsetTop,
            behavior: "smooth",
          });
        });
      },
    },
    {
      name: "STUDIES",
      position: 4,
      onClick: function () {
        navigationHandler(this.position).then(() => {
          const spreadModelSpace = document.getElementById(
            "s-spread-model-space"
          )!;
          window.scrollTo({
            top:
              spreadModelSpace.offsetTop +
              spreadModelSpace.scrollHeight *
                (((((6 / 865) * (window.innerHeight - 944) + 9) / 2840) *
                  (window.innerWidth - 1920) +
                  48) /
                  100) -
              window.innerHeight,
            behavior: "smooth",
          });
        });
      },
    },
    {
      name: "ABOUT",
      position: 4,
      onClick: function () {
        navigationHandler(this.position).then(() => {
          const spreadModelSpace = document.getElementById(
            "s-spread-model-space"
          )!;
          window.scrollTo({
            top:
              spreadModelSpace.offsetTop +
              spreadModelSpace.scrollHeight *
                (((((9 / 371) * (window.innerHeight - 944) + 31) / 14200) *
                  (window.innerWidth - 1920) +
                  82.5) /
                  100) -
              window.innerHeight,
            behavior: "smooth",
          });
        });
      },
    },
    {
      name: "TALK TO US",
      position: 4,
      onClick: function () {
        navigationHandler(this.position).then(() => {
          window.scrollTo({
            top: document.getElementById("footer")?.offsetTop,
            behavior: "smooth",
          });
        });
      },
    },
  ];

  const menuRef = useRef(null);

  const [isShowingScrollbar, setIsShowingScrollbar] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [breakpoints, setBreakpoints] = useState([0, 0, 0, 0, 0, 0]);

  const timeout = useRef<any>();
  const scrollbar = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollbar.current && thumb.current) {
      if (timeout.current) clearTimeout(timeout.current);

      setIsShowingScrollbar(true);
      timeout.current = setTimeout(() => {
        setIsShowingScrollbar(true);
        timeout.current = null;
      }, 500);

      const height = document.body.scrollHeight;
      const viewportHeight = window.innerHeight;
      const thumbHeight = 300 * (viewportHeight / height);

      thumb.current.style.height = `${thumbHeight}px`;

      const scroll = window.scrollY;
      const maxScroll = height - viewportHeight;
      const thumbPosition = (scroll / maxScroll) * (300 - thumbHeight);

      thumb.current.style.transform = `translateY(${thumbPosition}px`;
    }

    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    if (introDone) {
      const thirdBP = document.getElementById("s-model-pieces-space")
        ?.offsetTop as number;

      const spreadModelSpace = document.getElementById("s-spread-model-space")!;
      const fourthBP =
        spreadModelSpace.offsetTop +
        spreadModelSpace.scrollHeight *
          (((((6 / 865) * (window.innerHeight - 944) + 9) / 2840) *
            (window.innerWidth - 1920) +
            48) /
            100) -
        window.innerHeight;

      const fifthBP =
        spreadModelSpace.offsetTop +
        spreadModelSpace.scrollHeight *
          (((((9 / 371) * (window.innerHeight - 944) + 31) / 14200) *
            (window.innerWidth - 1920) +
            82.5) /
            100) -
        window.innerHeight;

      const sixthBP = document.getElementById("footer")?.offsetTop as number;
      setBreakpoints([0, 0, thirdBP, fourthBP, fifthBP, sixthBP]);
    }
  }, [introDone]);

  useEffect(() => {
    if (introDone && thumb.current && scrollbar.current) {
      const height = document.body.scrollHeight;
      const viewportHeight = window.innerHeight;
      const thumbHeight = 300 * (viewportHeight / height);

      thumb.current.style.height = `${thumbHeight}px`;

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [introDone, thumb.current, scrollbar.current]);

  const socialLinks = useRef<HTMLDivElement>(null);
  const scrollText = useRef<HTMLDivElement>(null);
  const illuminateText = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const talkToUsBtn = useRef<HTMLButtonElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const purpleLine = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (!introDone) return;

      const tobeHiddenElems = [
        socialLinks.current,
        scrollText.current,
        purpleLine.current,
      ];
      const changeColorElems = [logo.current, illuminateText.current];
      const buttonElems = [talkToUsBtn.current, menuBtn.current];

      const createTrigger = (
        elem: HTMLDivElement | HTMLButtonElement | HTMLImageElement
      ) => ({
        trigger: "#footer",
        scrub: 0.3,
        start: () => `top ${elem.offsetTop + elem.offsetHeight}`,
        end: () => `+=${elem.offsetHeight}`,
      });

      tobeHiddenElems.forEach((elem) => {
        gsap.to(elem, { opacity: 0, scrollTrigger: createTrigger(elem!) });
      });

      changeColorElems.forEach((elem) => {
        gsap.to(elem, { color: "white", scrollTrigger: createTrigger(elem!) });
      });

      buttonElems.forEach((elem) => {
        gsap.to(elem, {
          color: "#BC02E0",
          backgroundColor: "white",
          scrollTrigger: createTrigger(elem!),
        });
      });
    },
    { dependencies: [introDone], revertOnUpdate: true }
  );

  return (
    <>
      <div
        className={`fixed z-[60] flex items-center justify-center inset-0 transition-opacity ${
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute bg-black/60 inset-0"
          onClick={() => setIsExpanded(false)}
        ></div>

        <div
          ref={menuRef}
          className={`aspect-[2872/3484] max-h-[90vh] w-[95%] max-w-[calc(90vh*2872/3484)] absolute isolate transition-opacity duration-200`}
          style={{
            maskImage: "url('/images/menu-mask.png')",
            maskSize: "contain",
            maskPosition: "center",
            maskRepeat: "no-repeat",
          }}
        >
          <Image
            src="/images/menu-mask.png"
            alt="menu"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[90vh] w-auto object-contain object-center -z-10"
            unoptimized
            width={2872}
            height={3484}
          />

          <video
            src="/videos/menu-bg-gr.mp4"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            className="absolute w-full h-full object-cover -z-10"
          ></video>

          <button
            className="absolute top-6 right-6 text-white text-4xl z-20"
            onClick={() => setIsExpanded(false)}
          >
            X
          </button>

          <div className="absolute h-full w-full flex flex-col z-10 items-center justify-center top-0 left-0">
            <div className="text-[min(10vw,8.2vh)] font-turret leading-[1.2] xl:leading-[1.3] flex flex-col items-start justify-center flex-grow font-medium">
              {navLinks.map((link, index) => (
                <button
                  className="menu-link relative border-4 border-transparent text-[#CBCBCB] hover:text-[#DB00FF] hover:border-[#DB00FF] hover:bg-white px-3 lg:px-4 xl:px-6 rounded-[24px] transition-colors group cursor-pointer"
                  key={index}
                  onPointerDown={() => {
                    setIsExpanded(false);
                  }}
                  onMouseEnter={() => {
                    if (!lenis.isStopped && !isMovingUser) link.onClick();
                  }}
                >
                  <span className="inline-block translate-y-[0.05em]">
                    {link.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed top-0 w-full h-[100dvh] left-0 z-[52] text-4xl font-bold leading-8 pointer-events-none">
        <div className="relative w-full h-full text-black">
          {introDone && (
            <div
              ref={scrollbar}
              className={`absolute left-0 lg:left-6 xl:left-10 top-1/2 -translate-y-1/2 w-[7px] sm:w-[10px] h-[300px] bg-[#00000046] lg:bg-[#0000001a] rounded-full transition-opacity duration-200 ${
                isShowingScrollbar ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                ref={thumb}
                className="w-full bg-[#DB00FF] rounded-full"
              ></div>
            </div>
          )}

          <div
            ref={logo}
            className="absolute top-4 sm:top-6 xl:top-10 left-4 sm:left-6 xl:left-10 font-sans w-[120px] sm:w-[150px] xl:w-[180px] text-black"
          >
            <Logo className="w-full h-full" />
          </div>

          {introDone && (
            <div
              ref={illuminateText}
              style={{ writingMode: "vertical-rl" }}
              className="uppercase text-base sm:text-lg absolute bottom-2 sm:bottom-8s xl:bottom-10 left-4 sm:left-6 xl:left-10 rotate-180 leading-[1] max-h-[10em]"
            >
              ACTUALIZING THE BEYOND
            </div>
          )}

          {introDone && (
            <img
              ref={purpleLine}
              src="/images/purple-line.png"
              alt=""
              className="absolute bottom-0 left-0 hidden sm:block"
            />
          )}

          {introDone && (
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-6 xl:bottom-10 flex items-center gap-3 sm:gap-3.5"
              ref={scrollText}
            >
              <div className="size-[9px] sm:size-2.5 border border-black rotate-45" />
              <span className="text-sm sm:text-base">SCROLL</span>
              <div className="size-[9px] sm:size-2.5 border border-black rotate-45" />
            </div>
          )}

          <div className="flex flex-col-reverse xs:flex-row absolute right-4 sm:right-6 xl:right-10 top-4 sm:top-6 xl:top-10 gap-1.5 sm:gap-2 xl:gap-3">
            {introDone && (
              <button
                ref={talkToUsBtn}
                onClick={() => {
                  if (!lenis.isStopped && !isMovingUser)
                    navLinks
                      .find(({ name }) => name === "TALK TO US")
                      ?.onClick();
                }}
                className="bg-[#BC02E0] text-white text-sm sm:text-base py-[14px] sm:py-[16px] px-3 sm:px-4 rounded-xl leading-[1] pointer-events-auto"
              >
                TALK TO US
              </button>
            )}
            <button
              ref={menuBtn}
              onClick={() => setIsExpanded(true)}
              className="bg-[#BC02E0] text-white text-sm sm:text-base py-[14px] sm:py-[16px] px-3 sm:px-4 rounded-xl leading-[1] pointer-events-auto flex items-center gap-2 group"
            >
              MENU
              <div className="flex gap-1 group-hover:rotate-90 transition-transform">
                <div className="size-1.5 sm:size-2 bg-current rotate-45" />
                <div className="size-1.5 sm:size-2 bg-current rotate-45" />
                <div className="size-1.5 sm:size-2 bg-current rotate-45" />
              </div>
            </button>
          </div>

          <div className="flex absolute right-3 sm:right-6 xl:right-10 top-0 h-[100vh] items-center">
            <div className="flex flex-col gap-3">
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!lenis.isStopped && !isMovingUser) link.onClick();
                  }}
                >
                  <Image
                    className="hover:cursor-pointer z-10 pointer-events-auto"
                    src={
                      introDone
                        ? scrollPosition >= breakpoints[index]
                          ? "/icons/activeIcon.svg"
                          : "/icons/deactiveIcon.svg"
                        : index === 0
                        ? "/icons/activeIcon.svg"
                        : "/icons/deactiveIcon.svg"
                    }
                    width={16}
                    height={60}
                    alt={`checkbox ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {introDone && (
            <div
              ref={socialLinks}
              className="flex flex-col sm:flex-row items-end -space-y-1.5 sm:space-y-0 absolute bottom-1 sm:bottom-3 right-4 sm:right-6 xl:right-10 text-base sm:text-xl sm:items-center justify-center pointer-events-auto "
            >
              <a
                href="https://x.com/sombralabs"
                target="_blank"
                className="flex items-center social-link-hover"
              >
                <div className="size-[30px] flex items-center justify-center">
                  <Image
                    src={"/icons/white-social.png"}
                    width={30}
                    height={30}
                    alt="checkbox"
                    unoptimized
                  />
                </div>
                <span className="font-normal">X</span>
              </a>
              <a
                href="https://www.linkedin.com/company/sombralabs/?viewAsMember=true"
                target="_blank"
                className="flex items-center social-link-hover"
              >
                <div className="size-[30px] flex items-center justify-center">
                  <Image
                    src={"/icons/white-social.png"}
                    width={30}
                    height={30}
                    alt="checkbox"
                    unoptimized
                  />
                </div>
                <span className="font-normal">LINKEDIN</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
